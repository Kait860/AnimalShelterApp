const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const { isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes allow anyone to view animal records.
router.get('/', animalController.getAnimals);
router.get('/:id', animalController.getAnimalById);

// Admin routes are used to create, update, and delete animal records.
router.post(
    '/',
    isAdmin,
    upload.single('photo'),
    animalController.createAnimal
);

router.put(
    '/:id',
    isAdmin,
    animalController.updateAnimal
);

router.delete(
    '/:id',
    isAdmin,
    animalController.deleteAnimal
);

module.exports = router;
