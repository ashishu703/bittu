require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');

const path = require('path'); // Add this line to require the path module
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/formDetails', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// MongoDB Schema (Storing PDF as Buffer)
const formSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone_no: String,
  position_applied: String,
  qualification: String,
  experience: String,
  cover_letter: String,
  resume: { data: Buffer, contentType: String }, // Store PDF as binary
});

const Form = mongoose.model('Form', formSchema);

// Multer setup for file uploads (resume)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

// Route to Handle Form Submission
app.post('/submit-form', upload.single('resume'), async (req, res) => {
  try {
    console.log('Received form data:', req.body);

    const formData = new Form({
      ...req.body,
      resume: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      }
    });

    await formData.save();
    console.log('Form data saved successfully');

    // Admin Notification Email
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'admin@example.com', // Change to admin email
      subject: 'New Job Application Submitted',
      text: `
        A new application has been submitted.
        Name: ${req.body.first_name} ${req.body.last_name}
        Email: ${req.body.email}
        Phone: ${req.body.phone_no}
        Position Applied: ${req.body.position_applied}
      `,
    };

    // Acknowledgment Email for Applicant
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Application Received',
      text: `Dear ${req.body.first_name},\n\nThank you for applying for the ${req.body.position_applied} position. We have received your application and will review it soon.\n\nBest Regards,\nHR Team`,
    };

    // Send Emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log('Emails sent successfully');
    res.status(200).send('Form submitted successfully!');
  } catch (err) {
    console.error('Error submitting form:', err);
    res.status(500).send(err.message);
  }
});

// Route to Fetch All Form Submissions (Admin)
app.get('/fetch-forms', async (req, res) => {
  try {
    const forms = await Form.find({}, '_id first_name last_name email phone_no position_applied qualification experience cover_letter');
    res.json(forms);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to Download Resume
app.get('/download-resume/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form || !form.resume) {
      return res.status(404).send('Resume not found');
    }

    res.set({
      'Content-Type': form.resume.contentType,
      'Content-Disposition': `attachment; filename="resume-${form._id}.pdf"`
    });

    res.send(form.resume.data);
  } catch (err) {
    console.error('Error fetching resume:', err);
    res.status(500).send('Error downloading resume');
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
