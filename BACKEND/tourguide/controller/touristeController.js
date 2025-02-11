const User = require("../models/userSchema");

// 🔹 Obtenir tous les touristes
exports.getAllTouristes = async (req, res) => {
  try {
    const tourists = await User.find({ role: "touriste" }).select("-password");
    res.status(200).json(tourists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Obtenir un touriste par ID
exports.getTouristeById = async (req, res) => {
  try {
    const touriste = await User.findOne({ _id: req.params.id, role: "touriste" }).select("-password");
    if (!touriste) return res.status(404).json({ message: "Touriste non trouvé !" });

    res.status(200).json(touriste);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Mettre à jour un touriste
exports.updateTouriste = async (req, res) => {
  try {
    const { username, email, image_user } = req.body;

    let touriste = await User.findOne({ _id: req.params.id, role: "touriste" });
    if (!touriste) return res.status(404).json({ message: "Touriste non trouvé !" });

    touriste.username = username || touriste.username;
    touriste.email = email || touriste.email;
    touriste.image_user = image_user || touriste.image_user;

    await touriste.save();
    res.status(200).json({ message: "Touriste mis à jour avec succès !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Supprimer un touriste
exports.deleteTouriste = async (req, res) => {
  try {
    const touriste = await User.findOneAndDelete({ _id: req.params.id, role: "touriste" });
    if (!touriste) return res.status(404).json({ message: "Touriste non trouvé !" });

    res.status(200).json({ message: "Touriste supprimé avec succès !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createTouriste = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

    // Créer un nouvel utilisateur avec le rôle 'touriste'
    const user = new User({
      username,
      email,
      password,
      role: 'touriste' // Le rôle est défini ici
    });

    // Sauvegarder l'utilisateur
    await user.save();

    // Générer un token pour l'utilisateur créé
    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
