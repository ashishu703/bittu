const express = require('express');
const Price = require('../models/PriceModel');

const router = express.Router();

// Create new price
router.post('/', async (req, res) => {
  try {
    const { size, price, coreType } = req.body;
    const newPrice = new Price({ size, price, coreType });
    await newPrice.save();
    res.status(201).json(newPrice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all prices
router.get('/', async (req, res) => {
  try {
    const prices = await Price.find().sort({ date: -1 });
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get prices by size
router.get('/:size', async (req, res) => {
  try {
    const prices = await Price.find({ size: req.params.size })
      .sort({ date: -1 })
      .limit(4);
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
