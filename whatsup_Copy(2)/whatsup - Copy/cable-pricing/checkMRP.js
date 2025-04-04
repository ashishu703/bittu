const mongoose = require('mongoose');

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

// Fetch and log MRP prices
async function checkMRP() {
    try {
        const prices = await MRP.find({});
        console.log('Stored MRP Prices:', prices);
    } catch (error) {
        console.error('Error fetching MRP prices:', error);
    } finally {
        mongoose.connection.close();
    }
}

checkMRP();
