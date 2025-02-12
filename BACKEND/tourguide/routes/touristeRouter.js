const express = require("express");
const router = express.Router();
const touristeController = require("../controller/touristeController");

const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/checkRole');


// Routes CRUD pour les touristes
router.get("/getAllTouristes", authMiddleware,touristeController.getAllTouristes);
router.get("/getTouristeById/:id", touristeController.getTouristeById);
router.post("/createTouriste", touristeController.createTouriste);

router.put("/updateTouriste/:id", touristeController.updateTouriste);
router.delete("/deleteTouriste/:id", touristeController.deleteTouriste);

module.exports = router;

