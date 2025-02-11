const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // 🔹 Stocke l'ID du guide

});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
