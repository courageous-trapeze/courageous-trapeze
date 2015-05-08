var authUtil = require('../config/authUtil.js');

module.exports = {

  // edit: function (req, res) {
  // // logic to add or update User after server receives POST request
  // },
  // show: function (req, res) {
  // // logic to return User profile after server receives GET request
  // },

  signup: function (req, res, cbNext) {
    var reqUser = {username: req.body.username, password:req.body.password};
    authUtil.findUser(reqUser.username, function(){ // user not found, create new user
      authUtil.createNewUser(reqUser.username, reqUser.password);

    }, function(dbUser){ // user found, should inform user name is already taken
      //res.send({redirect: '/#/signin'}); // if username exists, redirect to signin
    });

  },

  signin: function (req, res, cbNext) {
    var reqUser = {username: req.body.username, password:req.body.password};
    authUtil.findUser(reqUser.username, function(){
      // user not found, TODO: should inform user incorrect login entered
      res.status(401).send();

    }, function(dbUser){
      // user found, should validate passwords

      authUtil.validatePassword(reqUser, dbUser, function(){ // user/password not found
        res.status(401).send();
      }, function(token){ // user/password found
        res.set('token', token); // attach token to response header
        res.send();
      });

    });

  },

  checkAuth: function (req, res, cbNext) {
  }

}
