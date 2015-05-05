'use strict';
// built-in npm module dependencies
//var Promise = require('bluebird');
//var Promise = require('mpromise');
var _ = require('underscore');

// local dependencies
var Contact = require('./contactModel.js');

module.exports = {
  addContact: function (request, response) {
  // logic to add or update Contact after server receives POST request
  // accept array of contact objects
    var convertPhone = function (phone) {
      var phoneArray = phone.split('');
      var phoneNum = [];
      for (var i = 0; i < phoneArray.length; i++) {
        if (!isNaN(phoneArray[i])) {
          phoneNum.push(phoneArray[i]);
        }
      }
      return Number(phoneNum.join(''));
    };

    // map array of contacts received in request to new objects 
    var contactsReceived = _.map(request.body.contacts, function (contact) {
      var googleId = contact.googleId || '';
      return {
        googleId: googleId,
        name: contact.name,
        phone: convertPhone(contact.phone)
      };
    });

    // generate array of received phoneNumbers
    var contactPhones = _.map(contactsReceived,
      function (contact) {
        return { phone: contact.phone };
      }
    );

    // generate array of received phoneNumbers that already exist in database
    var contactsFound = Contact.find({'$or': contactPhones});
    
    // identify net new contacts, i.e., contacts that do not exist in database already
    var newContacts = _.difference(request.body.contacts, contactsFound);

    // create new contacts from newContacts array
    // see: http://mongoosejs.com/docs/models.html, http://mongoosejs.com/docs/api.html re: Model.create();

    Contact.create(newContacts, function (error, docs) {
      if (error) {
        response.status(500).send("Error: Could not save contacts");
      } else {
        response.status(200).send(docs);
      }
    });
  },
  
  showContacts: function (request, response) {
  // logic to return all Contacts after server receives GET request
  // check with Mike how sessions are being created
    Contact.find({ userId: request.session.userId }, function (error, docs) {
      if (error) {
        response.status(500).send('Error: Could not find contacts');
      } else {
        response.set('Content-Type', 'application/json');
        if (docs) {
          response.status(200).send(docs);
        } else {
          response.status(200).send([]);
        }
      }
    });
  }
};
