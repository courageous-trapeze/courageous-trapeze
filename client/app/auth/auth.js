angular.module('courageousTrapeze.auth', [])

.controller('AuthController', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
  $scope.user = {};

  $scope.signin = function(){
    Auth.signin($scope.user)
    .success(function(data){
      window.localStorage.setItem('courageousTrapeze', data.token);
      $location.path('/messages');
    })
    .error(function(err){
      console.error(err);
    });
  };

  $scope.signup = function(){
    Auth.signup($scope.user)
    .success(function(data){
      window.localStorage.setItem('courageousTrapeze', data.token);
      $location.path('/messages');
    })
    .error(function(err){
      console.error(err);
    });
  };

  $scope.signout = function(){
    Auth.signout();
  };

  $scope.isAuth = function(){
    return Auth.isAuth();
  };

}]);
