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