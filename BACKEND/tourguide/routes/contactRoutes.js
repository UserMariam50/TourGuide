const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/checkRole');


// Créer un contact (accessible uniquement aux guides)
router.post('/createContact', authMiddleware, checkRole(['Guide']), contactController.createContact);

// Mettre à jour un contact (accessible uniquement aux guides)
router.put('/updateContact/:id', authMiddleware, checkRole(['Tourist']), contactController.updateContact);

// Supprimer un contact (accessible uniquement aux guides)
router.delete('/deleteContact/:id', authMiddleware, checkRole(['guide']), contactController.deleteContact);

// Obtenir un contact par son nom (insensible à la casse)
router.get('/getContactByName/name/:name',authMiddleware, checkRole(['guide']), contactController.getContactByName);

// Obtenir tous les contacts (accessible uniquement aux utilisateurs authentifiés)
router.get('/getAllContacts', authMiddleware,  checkRole(['guide']),contactController.getAllContacts);

// Obtenir un contact spécifique par ID (accessible uniquement aux utilisateurs authentifiés)
router.get('/getContactById/:id', authMiddleware,  checkRole(['guide']),contactController.getContactById);

// Obtenir les contacts créés par un guide spécifique (basé sur l'utilisateur authentifié)
router.get('/getContactsByGuide/guide', authMiddleware,  checkRole(['guide']),contactController.getContactsByGuide);

// Obtenir des contacts selon un rôle spécifique
router.get('/getContactsByRole/role/:role', authMiddleware,  checkRole(['guide']),contactController.getContactsByRole);

router.get('/getContactsByNamePlus/name/:name',  authMiddleware,  checkRole(['guide']),contactController.getContactsByNamePlus);


module.exports = router;
