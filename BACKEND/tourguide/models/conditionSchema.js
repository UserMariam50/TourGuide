const mongoose = require('mongoose');
const User = require('./userSchema');  

const conditionSchema = new mongoose.Schema({
  minimumParticipants: {
    type: Number,
    required: true
  },
  maximumParticipants: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  minimumAge: {
    type: Number,
    required: true
  },
  requiresAdultCompanion: {
    type: Boolean,
    default: false
  },
  requiresAdvanceBooking: {
    type: Boolean,
    default: false
  },
  allowsPets: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Condition = mongoose.model('Condition', conditionSchema);
module.exports = Condition;
