const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email : {
    type: String,
    
  },
  phone : {
    type: String,
    required: true
  },
  image : {
    type: String,
    
  },
  addresswebsite : {
    type: String,
   
  },
  openingHours : {
    type: String,
    
  },
  servicesOffered: {
    type: [String],
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 

});

const partner = mongoose.model('partner', partnerSchema);
module.exports = partner;
