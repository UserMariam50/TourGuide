const mongoose = require('mongoose');
const User = require('./User');  
// Importer le modèle de base User

const touristeSchema = new mongoose.Schema({
  preferredDestination: String
});

const Touriste = User.discriminator('Touriste', touristeSchema);
 // Discriminateur pour Touriste
module.exports = Touriste;
