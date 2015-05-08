var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  messages: {
    type: String
  },
  contacts: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);