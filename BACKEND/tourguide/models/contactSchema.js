const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'] // Validation de la longueur du nom
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Veuillez entrer un email valide']
  },
  phone: {
    type: String,
    match: [/^\+?[1-9]\d{1,14}$/, 'Veuillez entrer un numéro de téléphone valide'] 
  },
  role: {
    type: String,
    enum: ['admin', 'guide', 'tourist','other'], 
    required: true
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
}, { timestamps: true }); 

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
