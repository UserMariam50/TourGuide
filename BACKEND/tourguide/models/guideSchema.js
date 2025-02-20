const mongoose = require('mongoose');
const User = require('./userSchema');  // Importer le modèle de base User
const Tour = require('./tourSchema');  // Importer le modèle de base Tour
const Resource = require('./resourceSchema');  
const Contact = require('./contactSchema');  
const partner = require('./partnerSchema');

const guideSchema = new mongoose.Schema({// Liste des tours anciens 
    oldTours: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour'
    }],
    guideState: {
      type: String,
      enum: ['active', 'inactive']
    },
    coveredArea: {
      type:[String]
    },
    gender: {
      type:String
    },
    yearsOfExperience: {
      type:Number
    },
    certifications: {
      type:String,
    },
    spokenLanguages: {
      type: [String],
    },
    instagramProfile: {
      type: String,
    },
    personalDescription: {
      type: String,
    },
    Nationality: {
      type: String,
    },
    // Nombre de tours
    numberOfTours: {
      type: Number,
      default: 0
    },
    // Liste des ressources 
    resources: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource'
    }],
    // Liste des contacts 
    contacts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact'
    }],
    // Liste des partenaires 
    partners: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'partner'
    }],
    // Nouveau tour a vérifier
    newTour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour'
    }
});

const Guide = User.discriminator('Guide', guideSchema); //Héritage via Discriminateur pour Guide
module.exports = Guide;
