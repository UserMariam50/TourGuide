const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔎 Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Utilisateur introuvable" });

    // 🔑 Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

    // 🎫 Générer le token JWT
    const token = user.generateAuthToken();

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
