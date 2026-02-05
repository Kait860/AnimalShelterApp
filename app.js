const express = require('express');
require('dotenv').config();

console.log('DB PASSWORD:', process.env.DB_PASSWORD ? 'Loaded' : 'Not Loaded');

const animalRoutes = require('./routes/animalRoutes');

const app = express();
app.use(express.json());

// API routes
app.use('/animals', animalRoutes);

// make images accessible
app.use('/uploads', express.static('uploads'));

// Test route
app.get('/', (req, res) => {
    res.send("Animal Shelter API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
