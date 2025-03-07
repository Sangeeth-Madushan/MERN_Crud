const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/namesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Schema and Model
const nameSchema = new mongoose.Schema({
  name: String,
});

const Name = mongoose.model('Name', nameSchema);

// Routes
app.get('/api/names', async (req, res) => {
  try {
    const names = await Name.find();
    res.json(names);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/names', async (req, res) => {
  const newName = new Name({
    name: req.body.name,
  });

  try {
    const savedName = await newName.save();
    res.status(201).json(savedName);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
