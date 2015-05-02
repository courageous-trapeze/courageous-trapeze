var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  id: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
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