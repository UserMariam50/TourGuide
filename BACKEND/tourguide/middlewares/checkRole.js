// middleware/checkRole.js
exports.checkRole = (roles) => (req, res, next) => {
    const userRole = req.user.role; // Le rôle de l'utilisateur est extrait du JWT décodé
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Accès interdit. Rôle insuffisant." });
    }
    next(); // L'utilisateur a un rôle autorisé, la requête peut continuer
  };
  