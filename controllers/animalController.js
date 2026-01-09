const db = require("../db/connection");

// GET all animals
exports.getAnimals = (req, res) => {
    const sql = "SELECT * FROM Animal";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        // Add full URL to each animal
        const animalsWithFullURL = results.map(animal => {
            return {
                ...animal,
                photoURL: animal.photoPath ? `${req.protocol}://${req.get('host')}/${animal.photoPath}` : null
            };
        });

        res.json(animalsWithFullURL);
    });
};

// CREATE new animal
exports.createAnimal = (req, res) => {
    const {name, breed, age, temperament, medicalNeeds, adoptionStatus } = req.body;
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

// UPDATE animal
exports.updateAnimal = (req, res) => {
    const { id } = req.params;
    const {name, breed, age, temperament, medicalNeeds, adoptionStatus } = req.body;

    const sql =
        'UPDATE Animal SET name = ?, breed = ?, age = ?, temperament = ?, medicalNeeds = ?, adoptionStatus = ? WHERE id = ?';

    db.query(
        sql,
        [name, breed, age, temperament, medicalNeeds, adoptionStatus, id],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Animal updated successfully' });
        }
    );
};

//GET animal by ID
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

// DELETE animal
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
