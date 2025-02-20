const express = require('express');
const router = express.Router();
const guideController = require('../controller/guideController');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/checkRole');


router.post('/createGuide', guideController.createGuide);

router.get('/getAllGuides', guideController.getAllGuides);

router.get('/getGuideById/:id', guideController.getGuideById);

router.put('/updateGuide/:id', authMiddleware, checkRole(['Guide']), guideController.updateGuide);

router.delete('/deleteGuide/:id', authMiddleware, checkRole(['Guide']), guideController.deleteGuide);

router.get('/getGuideWithReferenceIDsOnly/:id', guideController.getGuideWithReferenceIDsOnly);


module.exports = router;

