var app = angular.module('courageousTrapeze.auth', []);
app.controller('AuthController', ['$scope', 'Auth', function($scope, Auth){
  // var test = Counter();
  $scope.user = {};
  $scope.user.username = '';
  $scope.user.password = '';

  $scope.signin = function(count){
    Auth.signin(count, function(resp){
      console.log('signin callback');
    })
  };

  $scope.signup = function(count){
    Auth.signup(count, function(resp){
      console.log('signup callback');
    })
  };

}]);

app.factory('Auth', function($http){
  var signup = function(count, cb){
    return $http({
      method: 'Post',
      url: '/api/user/signup'
    })
    .then(function (resp) {
      console.log('RESPONSE:', resp)
    });
  };

  var signin = function(count, cb){
    return $http({
      method: 'Post',
      url: '/api/user/signin'
    })
    .then(function (resp) {
      console.log('RESPONSE:', resp)
    });
  };

  return {
    signup: signup,
    signin: signin
  }

});
