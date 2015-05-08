var bcrypt = require('bcrypt-nodejs');
var User = require('../users/userModel.js');
var jwt  = require('jwt-simple');
var tokenKey = 'u8yUOyiBjLXJqj9opqnKjhWoc0pm8fyl';

module.exports = {

  isTokenInHeader: function(req){
    return !!req.headers['x-access-token'];
  },

  encodeToken: function(payload){
    return jwt.encode(payload, tokenKey);
  },

  decodeToken: function(token){
    return jwt.decode(token, tokenKey);
  },

  decodeTokenAttachToReq: function(req, res, cbNext){
    var token = req.headers['x-access-token'];
    if (token) {
      req.decodedToken = jwt.decode(token, tokenKey);
      cbNext();
    } else {
      res.sendStatus(403);
    }
  },

  validatePassword: function(reqUser, dbUser, onFail, onSuccess){
    bcrypt.compare(reqUser.password, dbUser.password, function(err, passwordsMatch){

      if (err) console.error(err);
      if (passwordsMatch) {
        var token = jwt.encode({ username: reqUser.username }, tokenKey);
        onSuccess(token);
      } else {
        onFail();
      }

    });
  },


  findUser: function(username, onFail, onSuccess){
    User.findOne({username: username}, function(err, result){
      if (err) console.error(err);
      if (!result) {
        onFail();
      } else {
        onSuccess(result);
      }
    });
  },

  findAllUsers: function(){
     // console log all users in database
    console.log('*****************************************');
    User.find({}, function(err, allResults) {
      allResults.forEach(function(each){
        console.log('****', each);
      });
    });    
  },

  createNewUser: function(username, password){
    var newUser = {username: username, password:''};
    bcrypt.hash(password, null, null, function(err, hash){
      if (err) console.error(err);
      newUser.password = hash;

      User.create({username: newUser.username, password: newUser.password} , function (err) {
        if (err) console.error(err);
        // record saved
      });
    });

  },

};