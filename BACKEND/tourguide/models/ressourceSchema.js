const mongoose = require('mongoose');

const ressourceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['achat', 'location'],  // Limiter les valeurs possibles à 'achat' ou 'location'
  },
  
//   url: {
//     type: String,
//     required: true
//   },
    titre: {
        type: String,
        required: true
    },
  description: {
    type: String,
    required: true
  },
  // Ajouter les informations de propriétaire si le type est 'location'
  proprietaire: {
    type: {
      nom: String,
      email: String,
      telephone: String
    },
    required: function() { return this.type === 'location'; } 
    // Si type est 'location', ces champs sont requis
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // 🔹 Stocke l'ID du guide

});

const Ressource = mongoose.model('Ressource', ressourceSchema);
module.exports = Ressource;
