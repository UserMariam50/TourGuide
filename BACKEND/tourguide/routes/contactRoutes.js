const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/checkRole');


// Créer un contact (accessible uniquement aux guides)
router.post('/createContact', authMiddleware, checkRole(['guide']), contactController.createContact);

// Mettre à jour un contact (accessible uniquement aux guides)
router.put('/updateContact/:id', authMiddleware, checkRole(['guide']), contactController.updateContact);

// Supprimer un contact (accessible uniquement aux guides)
router.delete('/deleteContact/:id', authMiddleware, checkRole(['guide']), contactController.deleteContact);

// Obtenir un contact par son nom (insensible à la casse)
router.get('/contact/name/:name', contactController.getContactByName);

// Obtenir tous les contacts (accessible uniquement aux utilisateurs authentifiés)
router.get('/contacts', authMiddleware, contactController.getAllContacts);

// Obtenir un contact spécifique par ID (accessible uniquement aux utilisateurs authentifiés)
router.get('/contacts/:id', authMiddleware, contactController.getContactById);

// Obtenir les contacts créés par un guide spécifique (basé sur l'utilisateur authentifié)
router.get('/contacts/guide', authMiddleware, contactController.getContactsByGuide);

// Obtenir des contacts selon un rôle spécifique
router.get('/contacts/role/:role', authMiddleware, contactController.getContactsByRole);



module.exports = router;
