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
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  }]
});

module.exports = mongoose.model('User', userSchema);