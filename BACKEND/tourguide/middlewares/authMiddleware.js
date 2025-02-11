const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  console.log('Headers:', req.headers);

  // Récupérer le token de l'en-tête 'Authorization'
  // const token = req.header('Authorization')?.split(' ')[1];
  // console.log('Token:', token);
  // Si pas de token
  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé, token manquant" });
  }

  try {
    // Vérifier le token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter l'utilisateur décodé à la requête
    req.user = decoded;

    // Passer au middleware suivant (ou à la route protégée)
    next();
  } catch (error) {
    // Token invalide ou expiré
    res.status(403).json({ message: "Token invalide ou expiré" });
  }
};
