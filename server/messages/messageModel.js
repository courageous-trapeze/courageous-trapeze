var mongoose = require('mongoose');
// userSchema may not be a dependency here, only in messageController
// var userSchema = require('./users/userModel.js');


var messageSchema = new mongoose.Schema({
  // Reference user collection for id
  // see: http://docs.mongodb.org/manual/reference/database-references/
  // see: http://mongoosejs.com/docs/guide.html#_id
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
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
  },
  status: {
    type: String
  }
});

// save new mongoose model to module.exports for use in other files
// see: http://mongoosejs.com/docs/models.html
module.exports = mongoose.model('Message', messageSchema);