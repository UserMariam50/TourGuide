const express = require("express");
const router = express.Router();
const touristController = require("../controller/touristController");

const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/checkRole');


// Routes CRUD pour les touristes
router.get("/getAllTouristes", authMiddleware,touristController.getAllTouristes);
router.get("/getTouristeById/:id", touristController.getTouristeById);
router.post("/createTouriste", touristController.createTouriste);

router.put("/updateTouriste/:id", touristController.updateTouriste);
router.delete("/deleteTouriste/:id", touristController.deleteTouriste);

module.exports = router;

