console.log('auth.js running...');
var app = angular.module('courageousTrapeze.auth', []);
app.controller('AuthController', ['$scope', 'Auth', function($scope, Auth){
  // var test = Counter();
  $scope.display = 'abcasdfd';

  $scope.test = function(count){
    Auth.testGet(count, function(respCount){
      console.log('$scope.increment() return value:', respCount);
      $scope.display = 'aaaa';
    })
  };

}]);

app.factory('Auth', function($http){
  console.log('Auth factory() running...');
  var testGet = function(count, cb){
    console.log('Auth factory() testGet() running...');
    return $http({
      method: 'GET',
      url: '/signup'
    })
    .then(function (resp) {
      console.log('Auth factory() testGet() response callback running...');
      console.log('response:', resp);
    });
    return 44;
  };

  return {
    testGet: testGet
  }

});
