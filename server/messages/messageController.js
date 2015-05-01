// built-in npm module dependencies
var Promise = require('bluebird');

// local dependencies
var Message = require('./messageModel.js');

module.exports = {
  addMessage: function (request, response) {
  // logic to add or update Message after server receives POST request
  },
  
  showMessage: function (request, response) {
  // logic to return all Messages after server receives GET request
  }
};
