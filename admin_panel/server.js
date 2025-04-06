const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3002;

// ✅ Enable CORS for your frontend domain
app.use(cors({
  origin: 'https://anocab.com',
  methods: ['GET', 'POST'],
  credentials: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));

// Serve index.html if needed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Price file path
const PRICES_FILE = path.join(__dirname, 'prices.json');

// Initialize prices file if not exists
if (!fs.existsSync(PRICES_FILE)) {
  fs.writeFileSync(PRICES_FILE, JSON.stringify({
    aluminum_ec: 275.50,
    aluminum_alloy: 283.00,
    copper: 912.02,
    pvc: 92.63,
    lldpe: 105.52
  }, null, 2));
}

// Get prices
app.get('/api/prices', (req, res) => {
  fs.readFile(PRICES_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading prices' });
    res.json(JSON.parse(data));
  });
});

// Update prices
app.post('/update-prices', express.json(), (req, res) => {
  const newPrices = {
    aluminum_ec: parseFloat(req.body.price_aluminum_ec),
    aluminum_alloy: parseFloat(req.body.price_aluminum_alloy),
    copper: parseFloat(req.body.price_copper),
    pvc: parseFloat(req.body.price_pvc),
    lldpe: parseFloat(req.body.price_lldpe)
  };

  fs.writeFile(PRICES_FILE, JSON.stringify(newPrices, null, 2), (err) => {
    if (err) return res.status(500).send('Error saving prices');
    res.json({ success: true, message: "Prices updated" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Admin Panel Server running at http://localhost:${PORT}`);
});
