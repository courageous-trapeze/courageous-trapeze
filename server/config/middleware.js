'use strict';

var userRoutes = require('../users/userRoutes.js');
var messageRoutes = require('../messages/messageRoutes.js');
var contactRoutes = require('../contacts/contactRoutes.js');

module.exports = function (app, express) {

  // instantiate express Routers for User, Message, and Contact 
  // see: http://expressjs.com/guide/routing.html
  var userRouter = express.Router();
  var messageRouter = express.Router();
  var contactRouter = express.Router();

  // mount middleware functions at the specified paths
  // see: http://expressjs.com/api.html re: app.use()
  app.use('api/users', userRouter);
  app.use('api/messages', messageRouter);
  app.use('api/contacts', contactRouter);

  // call routes with express Routers passed as parameters
  userRoutes(userRouter);
  messageRoutes(messageRouter);
  contactRoutes(contactRouter);
};