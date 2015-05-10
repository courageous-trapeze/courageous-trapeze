var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
  // Reference user collection for id
  // see: http://docs.mongodb.org/manual/reference/database-references/
  // contact id is generated automatically by Mongo
  //_id: Number,

  googleId: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    // validate: [/\(\d{3}\)\d{3}-\d{4}/,
    // 'phone number required to be in (123)456-7890 format'],
    required: true
  },
  userId: {
    // type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// save new mongoose model to module.exports for use in other files
module.exports = mongoose.model('Contact', contactSchema);