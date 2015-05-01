console.log('contactRoutes');
var contactController = require('./contactController.js');

module.exports = function (router) {

  router.post('api/contacts/add', contactController.addContact);
  router.post('api/contacts/edit', contactController.addContact);
  router.post('api/contacts/show', contactController.showContacts);

};