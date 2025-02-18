// controllers/touristeController.js
const Touriste = require('../models/touristSchema');

exports.getAllTouristes = async (req, res) => {
  try {
    const touristes = await Touriste.find().select('-password');
    res.status(200).json(touristes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTouristeById = async (req, res) => {
  try {
    const touriste = await Touriste.findOne({ _id: req.params.id }).select('-password');
    if (!touriste) return res.status(404).json({ message: "Touriste non trouvé !" });

    res.status(200).json(touriste);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTouriste = async (req, res) => {
  try {
    const { username, email, image_user, preferredDestination } = req.body;

    let touriste = await Touriste.findOne({ _id: req.params.id });
    if (!touriste) return res.status(404).json({ message: "Touriste non trouvé !" });

    touriste.username = username || touriste.username;
    touriste.email = email || touriste.email;
    touriste.image_user = image_user || touriste.image_user;
    touriste.preferredDestination = preferredDestination || touriste.favoriteDestinations;

    await touriste.save();
    res.status(200).json({ message: "Touriste mis à jour avec succès !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTouriste = async (req, res) => {
  try {
    const touriste = await Touriste.findOneAndDelete({ _id: req.params.id });
    if (!touriste) return res.status(404).json({ message: "Touriste non trouvé !" });

    res.status(200).json({ message: "Touriste supprimé avec succès !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTouriste = async (req, res) => {
  try {
    const { username, email, password, image_user, preferredDestination } = req.body;

    const existingUser = await Touriste.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

    const touriste = new Touriste({
      username,
      email,
      password,
      image_user,
      preferredDestination,
      role: 'touriste', // Rôle spécifique
    });

    await touriste.save();

    const token = touriste.generateAuthToken(); // Méthode héritée de User

    res.status(201).json({ token, touriste });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
