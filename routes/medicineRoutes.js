// routes/medicineRoutes.js
const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

router.post('/', medicineController.createMedicine);
router.get('/:id', medicineController.getMedicine);

module.exports = router;
