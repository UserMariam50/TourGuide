const mongoose = require('mongoose');

const User = require('./userSchema');  // Importer le modèle de base User
const Resource = require('./resourceSchema');  
const Contact = require('./contactSchema');  
const condition = require('./conditionSchema');
const Comment = require('./commentSchema');
const place = require('./placeSchema');
const totalcost = require('./totalcostSchema');
const guide = require('./guideSchema');
const categories = [
  'Adventure', 'Cultural', 'Nature', 'Historical', 'Beach', 'Safari', 
  'Religious', 'Luxury', 'Hiking', 'City Tour', 'Cruise', 'Mountain', 
  'Desert', 'Island', 'Road Trip', 'Skiing', 'Festivals', 
  'Photography', 'food Tasting','Other'
];

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  
  tourstate: {
    type: String,
    enum:['done', 'programmed'],
    required: true
  },
  category: {
    type: String,
    enum: categories,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  conditions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'condition',  // Référence au modèle Condition
  }],
  totalcost: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'totalcost',  // Référence au modèle totalcost
  }],
  places: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'place',  // Référence au modèle Place
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',  // Référence au modèle Comment
  }],
  Resources: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',  // Référence au modèle Comment
  }],
  photo: {
    type: [String],
    required: true
  },
  
  description: {
    type: String,
    required: true
  },
  descriptionJSON: {
    type: String,
    required: true
  },





  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 

});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
