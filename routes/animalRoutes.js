const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const { isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// GET all animals
router.get('/', animalController.getAnimals);

//CREATE new animal WITH photo
router.post('/', upload.single('photo'), animalController.createAnimal);

//PUT update animal
router.put('/:id', animalController.updateAnimal);

//GET animal by ID
router.get('/:id', animalController.getAnimalById);

//DELETE animal by ID
router.delete('/:id', animalController.deleteAnimal);


module.exports = router;