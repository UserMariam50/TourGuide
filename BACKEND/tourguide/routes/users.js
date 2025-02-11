var express = require('express');
var router = express.Router();
const usersController = require('../controller/userController');
const { authMiddleware } = require('../middlewares/authMiddleware'); // Importer le middleware

// Route non protégée
router.get('/message', usersController.message);

// Route protégée, en utilisant le middleware authMiddleware
router.get('/profile', authMiddleware, usersController.getProfile);

module.exports = router;
