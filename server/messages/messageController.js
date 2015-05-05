'use strict';
// built-in npm module dependencies
//var Promise = require('bluebird');
//var Promise = require('mpromise');
var _ = require('underscore');

// local dependencies
var Message = require('./messageModel.js');

module.exports = {
  addMessage: function (request, response) {
  // logic to add or update Message after server receives POST request
    var messageObject = {
      userId: request.body.message.user._id,
      // see: mongoosejs.com/docs/populate.html
      contactId: request.body.message.contact._id,
      contactPhone: request.body.message.phone,
      text: request.body.message.text,
      // what format is the date being sent over? any validation on the server side?
      date: request.body.message.date,
      status: 'scheduled'
    };
    // see: http://mongoosejs.com/docs/models.html
    var newMessage = new Message(messageObject);
    newMessage.save(function (error, doc) {
      if (error) {
        response.status(500).send('Error: Could not save message');
      } else {
        response.status(200).send(doc);
      }
    });

    Message.findOne({ _id: newMessage._id })
    .populate('userId').populate('contactId');
  },

  updateMessage: function (request, response) {
    //update message in database after receiving message status
    for (var status in request.body) {
      var messagesArray = request.body[status];
      _.each(messagesArray, function (messageId) {
        var query = { _id: messageId };
        Message.findOneAndUpdate(query, { status: status }, function (error) {
          if (error) {
            response.status(500).send('Error: Could not update message status');
          } else {
            response.status(200).send();
          }
        });
      });
    }
  },
  
  showMessages: function (request, response) {
  // return all Messages after server receives GET request
    Message.find({ userId: request.session.userId }, function (error, docs) {
      if (error) {
        response.status(500).send('Error: Could not send docs');
      } else {
        response.status(200).send(docs);
      }
    });
  }
};
