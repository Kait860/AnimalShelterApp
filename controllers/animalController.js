const db = require("../db/connection");

// Retrieve all animal records from the database.
exports.getAnimals = (req, res) => {
    const sql = "SELECT * FROM Animal";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        // Build a full photo URL so the frontend can display uploaded images.
        const animalsWithFullURL = results.map(animal => {
            return {
                ...animal,
                photoURL: animal.photoPath ? `${req.protocol}://${req.get('host')}/${animal.photoPath}` : null
            };
        });

        res.json(animalsWithFullURL);
    });
};

// Insert a new animal record into the database.
exports.createAnimal = (req, res) => {
    const {name, breed, age, temperament, medicalNeeds, adoptionStatus } = req.body;
    // Save the uploaded file path if a photo was included in the request.
    const photoPath = req.file ? req.file.path : null;
    const sql =
        'INSERT INTO Animal (name, breed, age, temperament, medicalNeeds, adoptionStatus, photoPath) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(
        sql,
        [name, breed, age, temperament, medicalNeeds, adoptionStatus, photoPath],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Animal added successfully' });
        }
    );
};

// Update the selected animal's basic information.
exports.updateAnimal = (req, res) => {
    const animalId = req.params.id;
    const { name, age, breed } = req.body;

    const sql = `
        UPDATE Animal
        SET name = ?, age = ?, breed = ?
        WHERE animalId = ?
    `;

    db.query(
        sql,
        [name, age, breed, animalId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Animal not found' });
            }

            res.json({ message: 'Animal updated successfully' });
        }
    );
};

// Retrieve one animal record by its ID.
exports.getAnimalById = (req, res) => {
    const{id} = req.params;
    const sql = 'SELECT * FROM Animal WHERE animalId = ?';

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.json(results[0]);
    });
};

// Delete an animal record from the database.
exports.deleteAnimal = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Animal WHERE animalId = ?";

    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Animal not found" });
        }
        res.json({ message: "Animal deleted successfully" });
    });
};

