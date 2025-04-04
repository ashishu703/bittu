const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const priceRoutes = require('./routes/priceRoutes');

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/2coreflat.html', express.static(path.join(__dirname, 'public/2coreflat.html')));
app.use('/2coreround.html', express.static(path.join(__dirname, 'public/2coreround.html')));
app.use('/3coreround.html', express.static(path.join(__dirname, 'public/3coreround.html')));
app.use('/4coreround.html', express.static(path.join(__dirname, 'public/4coreround.html')));
app.use('/cable.html', express.static(path.join(__dirname, 'public/cable.html')));


const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/wirePrices', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/prices', priceRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
