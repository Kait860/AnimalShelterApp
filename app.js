const express = require('express');
require('dotenv').config();

const animalRoutes = require('./routes/animalRoutes');

// Create the Express application.
const app = express();

// Parse incoming JSON request bodies.
app.use(express.json());

// Route animal-related API requests to the animal router.
app.use('/animals', animalRoutes);

// Make uploaded images publicly accessible.
app.use('/uploads', express.static('uploads'));

// Basic test route to confirm the server is running.
app.get('/', (req, res) => {
    res.send("Animal Shelter API is running");
});

// Start the server on the configured port.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
