angular.module('courageousTrapeze.factories', [])
.factory('AttachTokens', ['$window', function($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in localStorage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function(object) {
      var jwt = $window.localStorage.getItem('courageousTrapeze');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
}])

.factory('Auth', ['$http', '$location', '$window', function($http, $location, $window) {
  // this is responsible for authenticating the user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'courageousTrapeze'
  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function(res) {
      return res.headers().token;
    });
  };

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function(res) {
      //if (typeof res.data.redirect == 'string') window.location = res.data.redirect;
      return res.headers().token;
    });
  };

  var isAuth = function() {
    return !!$window.localStorage.getItem('courageousTrapeze');
  };

  var signout = function() {
    $window.localStorage.removeItem('courageousTrapeze');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
}])

.factory('Contacts', ['$http', function($http) {
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/contacts'
    })
    .then(function(res) {
      return res.data;
    });
  };

  var addContact = function(message) {
    return $http({
      method: 'POST',
      url: '/api/contacts',
      data: message
    });
  };

  return {
    getAll: getAll,
    addContact: addContact
  };
}])

.factory('Messages', ['$http', function($http) {
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/messages'
    })
    .then(function(res) {
      return res.data;
    });
  };

  var addMessage = function(message) {
    return $http({
      method: 'POST',
      url: '/api/messages',
      data: message
    });
  };

  return {
    getAll: getAll,
    addMessage: addMessage
  };
}]);