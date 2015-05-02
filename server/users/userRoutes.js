'use strict';

var userController = require('./userController.js');

module.exports = function (router) {

  router.post('api/user/signup', userController.signup);
  router.post('api/user/signin', userController.signin);
  //router.post('api/user/edit', userController.edit);
  router.get('api/user/show', userController.show);

};