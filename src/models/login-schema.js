const mongoose = require('mongoose');

const loginAttemptSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  attempts: {
    type: Number,
    required: true,
    default: 1
  },
  lastAttempt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const LoginAttempt = mongoose.model('LoginAttempt', loginAttemptSchema);

module.exports = LoginAttempt;
