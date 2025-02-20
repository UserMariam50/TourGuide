const express = require('express');
const router = express.Router();
const guideController = require('../controller/guideController');

router.post('/createGuide', guideController.createGuide);

router.get('/getAllGuides', guideController.getAllGuides);

router.get('/getGuideById/:id', guideController.getGuideById);

router.put('/updateGuide/:id', guideController.updateGuide);

router.delete('/deleteGuide/:id', guideController.deleteGuide);

router.get('/getGuideWithReferenceIDsOnly/:id', guideController.getGuideWithReferenceIDsOnly);


module.exports = router;

