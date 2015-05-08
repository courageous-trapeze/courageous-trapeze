angular.module('courageousTrapeze.auth', [])

.controller('AuthController', ['$scope', 'Auth', function($scope, Auth) {
  $scope.user = {};
  $scope.user.username = '';
  $scope.user.password = '';

  $scope.signin = function(){
    Auth.signin($scope.user)
    .then(function(token){
      localStorage.setItem("courageousTrapeze", token);
    })
    .catch(function(err){
      console.error(err);
    });
  };

  $scope.signup = function(){
    Auth.signup($scope.user)
    .then(function(token){
      localStorage.setItem("courageousTrapeze", token);
    })
    .catch(function(err){
      console.error(err);
    });
  };

  $scope.signout = function(){
    Auth.signout($scope.user);
  };

  $scope.isAuth = function(){
    return Auth.isAuth($scope.user);
  };

}]);
