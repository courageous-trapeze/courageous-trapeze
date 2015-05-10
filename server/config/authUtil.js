'use strict';

var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var User = require('../users/userModel.js');
var jwt  = require('jwt-simple');
var secret = 'u8yUOyiBjLXJqj9opqnKjhWoc0pm8fyl';

module.exports = {

  decodeTokenAttachToReq: function(req, res, next){
    var token = req.headers['x-access-token'];
    if (token) {
      try {
        req.user = jwt.decode(token, secret);
        next();
      }
      catch(error) {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  },

  validatePassword: function(reqPassword, dbPassword){
    return new Promise(function(resolve, reject) {
      bcrypt.compare(reqPassword, dbPassword, function(err, passwordsMatch){
        if (err) {
          console.error(err);
          throw err;
        }

        if (passwordsMatch) {
          resolve();
        } else {
          reject();
        }
      });
    });
  },

  findUser: function(username) {
    return new Promise(function(resolve, reject) {
      User.findOne({username: username}, function(err, result) {
        if (err) {
          console.error(err);
          throw err;
        }

        if (result) {
          resolve(result);
        } else {
          reject();
        }
      });
    });
  },

  createNewUser: function(username, password){
    return new Promise(function(resolve, reject) {
      var newUser = {username: username, password: ''};
      bcrypt.hash(password, null, null, function(err, hash){
        if (err) {
          console.error(err);
          throw err;
        }

        newUser.password = hash;

        User.create(newUser, function (err, user) {
          if (err) {
            console.error(err);
            throw err;
          }
          resolve(user);
        });
      });
    });
  }

};