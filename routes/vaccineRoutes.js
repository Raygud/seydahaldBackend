// routes/vaccineRoutes.js
const express = require('express');
const router = express.Router();
const vaccineController = require('../controllers/vaccineController');

router.post('/', vaccineController.createVaccine);
router.get('/:id', vaccineController.getVaccine);

module.exports = router;
