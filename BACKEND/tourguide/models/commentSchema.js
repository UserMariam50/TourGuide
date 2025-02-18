const mongoose = require('mongoose');

const User = require('./userSchema');  // Importer le modèle de base User


const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },

  rate: {
    type: Number,         
    required: true,
    min: 0,                 // Mini 0
    max: 10                 //  Max 10
  },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 

});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
