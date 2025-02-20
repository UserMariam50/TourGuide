const SuperAdmin = require('../models/superAdminSchema');

module.exports.createSuperAdmin = async (req, res) => {
    try {
        const superAdmin = new SuperAdmin(req.body);
        await superAdmin.save();
        res.status(201).json({ message: "SuperAdmin créé avec succès", superAdmin });
    } catch (error) {
        console.error("Erreur lors de la création du SuperAdmin:", error);
        res.status(400).json({ message: "Erreur lors de la création du SuperAdmin", error: error.message });
    }
};

module.exports.getAllSuperAdmins = async (req, res) => {
    try {
        const superAdmins = await SuperAdmin.find();
        res.status(200).json(superAdmins);
    } catch (error) {
        console.error("Erreur lors de la récupération des SuperAdmins:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

module.exports.getSuperAdminById = async (req, res) => {
    try {
        const superAdmin = await SuperAdmin.findById(req.params.id);
        if (!superAdmin) {
            return res.status(404).json({ message: "SuperAdmin non trouvé" });
        }
        res.status(200).json(superAdmin);
    } catch (error) {
        console.error("Erreur lors de la récupération du SuperAdmin:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

module.exports.updateSuperAdmin = async (req, res) => {
    try {
        const superAdmin = await SuperAdmin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!superAdmin) {
            return res.status(404).json({ message: "SuperAdmin non trouvé" });
        }
        res.status(200).json({ message: "SuperAdmin mis à jour avec succès", superAdmin });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du SuperAdmin:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

module.exports.deleteSuperAdmin = async (req, res) => {
    try {
        const superAdmin = await SuperAdmin.findByIdAndDelete(req.params.id);
        if (!superAdmin) {
            return res.status(404).json({ message: "SuperAdmin non trouvé" });
        }
        res.status(200).json({ message: "SuperAdmin supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression du SuperAdmin:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
