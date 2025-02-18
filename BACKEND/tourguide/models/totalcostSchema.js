const mongoose = require('mongoose');

const User = require('./userSchema');  // Importer le modèle de base User



const totalcostSchema = new mongoose.Schema({
  
  totaltourcost: {
    type: Number,
    required: true
  },
  taxRate: {
    type: Number
  },
  marketingCost: {
    type: Number
  },
  entryFees: {
    type: Number
  },
  mealCost: {
    type: Number
  },
  equipmentCost: {
    type: Number
  },
  guideFee: {
    type: Number
  },
  transportationCost: {
    type: Number
  },
  otherExpenses: {
    type: Number
  },
 
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
  

});

const totalcost = mongoose.model('totalcost', totalcostSchema);
module.exports = totalcost;
