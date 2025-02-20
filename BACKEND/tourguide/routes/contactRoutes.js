const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/checkRole');


// Créer un contact (accessible uniquement aux guides)
router.post('/createContact', authMiddleware, checkRole(['Guide']), contactController.createContact);

// Mettre à jour un contact (accessible uniquement aux guides)
router.put('/updateContact/:id', authMiddleware, checkRole(['Guide']), contactController.updateContact);

// Supprimer un contact (accessible uniquement aux guides)
router.delete('/deleteContact/:id', authMiddleware, checkRole(['Guide']), contactController.deleteContact);

// Obtenir un contact par son nom (insensible à la casse)
router.get('/getContactByName/name/:name',authMiddleware, checkRole(['Guide']), contactController.getContactByName);

// Obtenir tous les contacts (accessible uniquement aux utilisateurs authentifiés)
router.get('/getAllContacts', authMiddleware,  checkRole(['Guide']),contactController.getAllContacts);

// Obtenir un contact spécifique par ID (accessible uniquement aux utilisateurs authentifiés)
router.get('/getContactById/:id', authMiddleware,  checkRole(['Guide']),contactController.getContactById);

// Obtenir les contacts créés par un guide spécifique (basé sur l'utilisateur authentifié)
router.get('/getContactsByGuide/guide', authMiddleware,  checkRole(['Guide']),contactController.getContactsByGuide);

// Obtenir des contacts selon un rôle spécifique
router.get('/getContactsByRole/role/:role', authMiddleware,  checkRole(['Guide']),contactController.getContactsByRole);

router.get('/getContactsByNamePlus/name/:name',  authMiddleware,  checkRole(['Guide']),contactController.getContactsByNamePlus);


module.exports = router;
