const express = require("express");
const router = express.Router();
const tourController = require("../controller/tourController");

const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/checkRole');


// Routes CRUD pour les touristes
router.get("/getAllTours", tourController.getAllTours);
router.get("/getTourById/:id", tourController.getTourById);
router.post("/createTour", authMiddleware,tourController.createTour);

router.put("/updateTour/:id",authMiddleware, tourController.updateTour);
router.delete("/deleteTour/:id",authMiddleware, tourController.deleteTour);


////

router.get("/getToursByGuideId/:id", tourController.getToursByGuideId);

module.exports = router;

