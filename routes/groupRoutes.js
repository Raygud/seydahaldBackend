// routes/groupRoutes.js
const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/', groupController.createGroup);
router.get('/:id', groupController.getGroup);
router.get('/user/:userId', groupController.getGroupByUserId);

module.exports = router;
