const mongoose = require('mongoose');
const User = require('./User');  // Importer le modèle de base User
const Tour = require('./Tour');  
const Ressource = require('./Ressource');  
const Contact = require('./Contact');  
const Partenaire = require('./Partenaire');

const guideSchema = new mongoose.Schema({// Liste des tours anciens (référence vers le modèle Tour)
    oldTours: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour'
    }],
    // Nombre de tours
    nbTours: {
      type: Number,
      default: 0
    },
    // Liste des ressources 
    resources: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ressource'
    }],
    // Liste des contacts )
    contacts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact'
    }],
    // Liste des partenaires 
    partners: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Partenaire'
    }],
    // Nouveau tour 
    newTour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour'
    }
});

const Guide = User.discriminator('Guide', guideSchema); // Discriminateur pour Guide
module.exports = Guide;
