// routes/sheepRoutes.js
const express = require('express');
const router = express.Router();
const sheepController = require('../controllers/sheepController');

router.post('/', sheepController.createSheep);
router.get('/:id', sheepController.getSheep);

module.exports = router;
