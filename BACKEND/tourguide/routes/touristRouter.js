const express = require("express");
const router = express.Router();
const touristController = require("../controller/touristController");

const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/checkRole');


// Routes CRUD pour les touristes
router.get("/getAllTourists", touristController.getAllTourists);
router.get("/getTouristById/:id", touristController.getTouristById);
router.post("/createTourist", touristController.createTourist);

router.put("/updateTourist/:id",authMiddleware, touristController.updateTourist);
router.delete("/deleteTourist/:id",authMiddleware, touristController.deleteTourist);

module.exports = router;

