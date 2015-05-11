angular.module('courageousTrapeze.messages', [])

.controller('MessagesController', ['$scope', 'Auth', 'Messages', function($scope, Auth, Messages) {
  $scope.loading = false;
  $scope.messages = [];
  $scope.signout = Auth.signout;

  $scope.getAllMessages = function() {
    $scope.loading = true;
    Messages.fetch()
      .then(function(messages) {
        $scope.messages = messages;
      })
      .catch(function(error) {
        console.error(error);
      })
      .finally(function() {
        $scope.loading = false;
      });
  };

  $scope.getAllMessages();
}]);
