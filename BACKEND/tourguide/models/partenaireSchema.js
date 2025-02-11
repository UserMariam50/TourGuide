const mongoose = require('mongoose');

const partenaireSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  contact: {
    type: String
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // 🔹 Stocke l'ID du guide

});

const Partenaire = mongoose.model('Partenaire', partenaireSchema);
module.exports = Partenaire;
