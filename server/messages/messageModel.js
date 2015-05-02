var mongoose = require('mongoose');
// userSchema may not be a dependency here, only in messageController
// var userSchema = require('./users/userModel.js');


var messageSchema = new mongoose.Schema({
  // Reference user collection for id
  // see: http://docs.mongodb.org/manual/reference/database-references/
  id: {
    type: String
  },
  user: {
    type: String
  },
  contact: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    validate: [/\(\d{3}\)\d{3}-\d{4}/,
    'phone number required to be in (123)456-7890 format'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

// save new mongoose model to module.exports for use in other files
module.exports = mongoose.model('Message', messageSchema);