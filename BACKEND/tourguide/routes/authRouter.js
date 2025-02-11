const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Route de connexion
router.post('/login', authController.login);

module.exports = router;
