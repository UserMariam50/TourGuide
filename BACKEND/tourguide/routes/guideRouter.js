const express = require('express');
const router = express.Router();
const guideController = require('../controller/guideController');

// Créer un guide
router.post('/createGuide', guideController.createGuide);

// Obtenir tous les guides
router.get('/getAllGuides', guideController.getAllGuides);

//  Obtenir un guide par ID
router.get('/getGuideById/:id', guideController.getGuideById);

//  Mettre à jour un guide
router.put('/updateGuide/:id', guideController.updateGuide);

// Supprimer un guide
router.delete('/deleteGuide/:id', guideController.deleteGuide);

module.exports = router;
