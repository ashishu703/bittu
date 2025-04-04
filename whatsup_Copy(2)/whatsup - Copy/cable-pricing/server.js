const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cablePricing', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define MRP schema
const mrpSchema = new mongoose.Schema({
    size: String,
    mrp: Number
});

// Create MRP model
const MRP = mongoose.model('MRP', mrpSchema);

app.use(express.json()); // Middleware to parse JSON bodies

// API endpoint to get MRP prices
app.get('/api/getMRP', async (req, res) => {
    try {
        const sizes = ['1.0', '1.5', '2.5', '4.0', '6.0'];
        const prices = await MRP.find({ size: { $in: sizes } });
        console.log('Database prices:', prices);
        console.log('Price data types:', prices.map(p => ({
            size: typeof p.size,
            mrp: typeof p.mrp
        })));
        
        // Convert mrp values to strings
        const formattedPrices = prices.map(p => ({
            ...p._doc,
            mrp: p.mrp.toString()
        }));
        res.json(formattedPrices);


    } catch (error) {
        console.error('Error fetching MRP prices:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/saveMRP', async (req, res) => {
    const { size, mrp } = req.body;
    try {
        console.log(`Saving MRP: Size = ${size}, MRP = ${mrp}`);
        
        // First delete existing MRP for this size
        await MRP.deleteMany({ size });
        
        // Then save new MRP
        const newMRP = new MRP({ size, mrp });
        await newMRP.save();
        
        res.status(201).send('MRP saved successfully');
    } catch (error) {
        console.error('Error saving MRP:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Serve static files from the public directory
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Explicit route for summercableadmin.html
app.get('/summercableadmin.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'summercableadmin.html'));
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Connected to MongoDB');
});
