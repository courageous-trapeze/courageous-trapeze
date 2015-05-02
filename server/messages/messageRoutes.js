var messageController = require('./messageController.js');

module.exports = function (router) {

  router.post('api/messages/add', messageController.addMessage);
  router.post('api/messages/edit', messageController.addMessage);
  router.post('api/messages/show', messageController.showMessage);

};