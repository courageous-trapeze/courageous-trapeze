var authUtil = require('../config/authUtil.js');
var jwt = require('jwt-simple');
var secret = 'u8yUOyiBjLXJqj9opqnKjhWoc0pm8fyl';

module.exports = {

  signup: function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    authUtil.findUser(username)
      .then(function() {
        // user already exists
        res.status(400).end('User exists');
      }, function() {
        // user does not exist
        authUtil.createNewUser(username, password)
          .then(function(user) {
            var token = jwt.encode({userId: user.id, username: username}, secret);
            res.json({token: token});
          })
          .catch(function(err) {
            res.status(500).end(err);
          });
      });
  },

  signin: function (req, res) {
    var reqUser = {username: req.body.username, password:req.body.password};

    authUtil.findUser(req.body.username)
      .then(function(user) {
        // user found, validate password
        authUtil.validatePassword(reqUser.password, user.password)
          .then(function() {
            // passwords match
            var token = jwt.encode({userId: user.id, username: user.username}, secret);
            res.json({token: token});
          }, function() {
            // passwords do not match
            res.sendStatus(401);
          });
      }, function() {
        // user not found
        res.sendStatus(401);
      })
      .catch(function(err) {
        res.status(500).end(err);
      });
  }
};
