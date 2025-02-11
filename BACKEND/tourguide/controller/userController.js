const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

module.exports.message=(rea,res)=>{
    
    res.status(200).json('🙋‍♀️ hello user 🙋');
  
  }
  // Route protégée, accessible seulement si un token valide est fourni
exports.getProfile = (req, res) => {
  const user = req.user; // req.user contient les informations de l'utilisateur décodées à partir du token
  res.status(200).json({
    message: "Bienvenue dans votre profil",
    user: user
  });
};


// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Trouver l'utilisateur par son email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Utilisateur non trouvé" });
//     }

//     // Vérifier si le mot de passe est correct
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Mot de passe incorrect" });
//     }

//     // Générer le token
//     const token = user.generateAuthToken();

//     // Renvoyer le token à l'utilisateur
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erreur interne du serveur" });
//   }
// };