const mongoose = require('mongoose');

const User = require('./userSchema');  // Importer le modèle de base User

 
const Comment = require('./commentSchema');

const categories = [
  'Adventure', 'Cultural', 'Nature', 'Historical', 'Beach', 'Safari', 
  'Religious', 'Luxury', 'Hiking', 'City Tour', 'Cruise', 'Mountain', 
  'Desert', 'Island', 'Road Trip', 'Skiing', 'Festivals', 
  'Photography', 'food Tasting','Archaeological Sites','Forest and junlge ','Caves ','Rivers and Lakes  ','National Parks','Castles ','Museums ','Villages ','Other'
];

const placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: categories,
    required: true
  },
  photo: {
    type: [String],
    required: true
  },
  
  description: {
    type: String,
    required: true
  },





  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 

});

const place = mongoose.model('place', placeSchema);
module.exports = place;
