const mongoose = require('mongoose');
const User = require('./userSchema'); 
const Tour = require('./tourSchema'); 
// Importer le modèle de base User

const touristSchema = new mongoose.Schema({
  preferredDestination: String,
  hasTravelInsurance: Boolean,
  passportNumber: String,
  isFrequentTraveler: Boolean,
  specialNeeds: String,
  Nationality: String,
  oldTours: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour'
      }],

});

const Tourist = User.discriminator('Tourist', touristSchema);
 // Discriminateur pour Touriste
module.exports = Tourist;
