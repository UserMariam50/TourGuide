const Tourist = require('../models/touristSchema');


module.exports.createTourist = async (req, res) => {
    try {
        const newTourist = new Tourist(req.body);
        await newTourist.save();
        res.status(201).json({ message: "Touriste ajouté avec succès", newTourist });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports.getAllTourists = async (req, res) => {
    try {
        const tourists = await Tourist.find().populate('oldTours');
        res.status(200).json(tourists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports.getTouristById = async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.params.id).populate('oldTours');
        if (!tourist) return res.status(404).json({ message: "Touriste introuvable" });
        res.status(200).json(tourist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports.updateTourist = async (req, res) => {
    try {
        const updatedTourist = await Tourist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTourist) return res.status(404).json({ message: "Touriste introuvable" });
        res.status(200).json({ message: "Touriste mis à jour", updatedTourist });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports.deleteTourist = async (req, res) => {
    try {
        const deletedTourist = await Tourist.findByIdAndDelete(req.params.id);
        if (!deletedTourist) return res.status(404).json({ message: "Touriste introuvable" });
        res.status(200).json({ message: "Touriste supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
