angular.module('courageousTrapeze.messages', [])

.controller('MessagesController', ['$scope', 'Messages', function($scope, Messages) {
  Messages.getAll();
}]);
