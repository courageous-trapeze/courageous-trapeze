console.log('contactController');
// built-in npm module dependencies
var Promise = require('bluebird');

// local dependencies
var Contact = require('./contactModel.js');

module.exports = {
  addContact: function (request, response) {
  // logic to add or update Contact after server receives POST request
  // accept array of contact objects
  },
  
  showContacts: function (request, response) {
  // logic to return all Contacts after server receives GET request
  }
};
