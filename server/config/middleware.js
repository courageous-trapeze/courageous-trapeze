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

  // serve static content for the app from the “client” directory in the application directory
  app.use(express.static(__dirname + '/../../client'));

  // mount middleware functions at the specified paths
  // call routes with express Routers passed as parameters to assign 'get' and 'post' properties to Routers
  userRoutes(userRouter);
  messageRoutes(messageRouter);
  contactRoutes(contactRouter);

  // see: http://expressjs.com/api.html#app.use
  app.use('/api/users', userRouter);
  app.use('/api/messages', messageRouter);
  app.use('/api/contacts', contactRouter);
};


// // using router as middleware (version 1)
// var userRoutes = function (router) {
//   router.post('/signup', userController.signup);
//   router.post('/signin', userController.signin);
// };
// userRoutes(userRouter);

// // using router as middleware (version 2)
// userRouter.post('/signup', userController.signup);
// userRouter.post('/signin', userController.signin);

// var router = express.Router();
// router.get('/', function (req, res, next) {
//   next();
// })
// app.use(router);