const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/checkRole');

// Seuls les guides peuvent créer, modifier ou supprimer des contacts
router.post('/contacts', authMiddleware, checkRole(['guide']), contactController.createContact);
router.put('/contacts/:id', authMiddleware, checkRole(['guide']), contactController.updateContact);
router.delete('/contacts/:id', authMiddleware, checkRole(['guide']), contactController.deleteContact);
router.get('/contact/name/:name', contactController.getContactByName);

// Tous les utilisateurs authentifiés peuvent voir les contacts
router.get('/contacts',authMiddleware,  contactController.getAllContacts);
router.get('/contacts/:id', authMiddleware, contactController.getContactById);


module.exports = router;
