const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['mine ', 'rented '],  // Limiter les valeurs possibles à 'achat' ou 'location'
  },
    name: {
        type: String,
        required: true
    },
  description: {
    type: String,
    required: true
  },
  image : {
    type: String,

  },
  availability : {
    type: Boolean,

  },
  priceinformations : {
    type: String,

  },
  owner: {
    type: {
      purchaseDate : Date,
      
    },
    required: function() { return this.type === 'mine '; } 
    // Si type est 'location', ces champs sont requis
  },
  // Ajouter les informations de propriétaire si le type est 'location'
  owner: {
    type: {
      ownername: String,
      ownerEmail: String,
      ownerAddress: String,
      ownerPhone: String
    },
    required: function() { return this.type === 'rented '; } 
    // Si type est 'location', ces champs sont requis
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 

});

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;
