const express = require('express');
const router = express.Router();
const superadminController = require('../controller/superadminController');

router.post('/createSuperAdmin', superadminController.createSuperAdmin);

router.get('/getAllSuperAdmins', superadminController.getAllSuperAdmins);

router.get('/getSuperAdminById/:id', superadminController.getSuperAdminById);

router.put('/updateSuperAdmin/:id', superadminController.updateSuperAdmin);

router.delete('/deleteSuperAdmin/:id', superadminController.deleteSuperAdmin);



module.exports = router;

