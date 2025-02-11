const mongoose = require('mongoose');
const User = require('./User');  // Importer le modèle de base User

const superAdminSchema = new mongoose.Schema({
  permissions: {
    type: [String], // Liste des permissions spéciales pour le superAdmin
    default: ['all-access']
  }
});

const SuperAdmin = User.discriminator('SuperAdmin', superAdminSchema); // Discriminateur pour SuperAdmin
module.exports = SuperAdmin;
