'use strict';

/**
 * @ngdoc overview
 * @name myProjectList
 * @description
 * # myProjectList
 *
 * Main module of the application.
 */


//  angular.module('myProjectList', [])
// .controller('MyProjectList', function($scope, $http, $sce) {
  
//   $http.get('/js/home.json').success(function (data){
//     $scope.myData = data.media.map(function (m) {
//       m.url = $sce.trustAsResourceUrl(m.url);
//       return m;
//     });
    
//   });
  
// })
angular.module('myProjectList', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('login', {
  				url: '/login',
  				templateUrl: '/login.html',
  				controller: 'AuthCtrl',
  				onEnter: ['$state', 'auth', function($state, auth){
    				if(auth.isLoggedIn()){
      					$state.go('home');
    				}
  				}]
			})

			.state('register', {
  				url: '/register',
  				templateUrl: '/register.html',
  				controller: 'AuthCtrl',
  				onEnter: ['$state', 'auth', function($state, auth){
    				if(auth.isLoggedIn()){
      					$state.go('home');
    				}
  				}]
			})

			.state('home', {
  				url: '/',
  				templateUrl: '/index.html',
  				controller: ['AuthCtrl', 'MyProjectList'],
  				onEnter: ['$state', 'auth', function($state, auth){
    				if(auth.isLoggedIn()){
      					$state.go('home');
    				}
  				}]
			});

    $urlRouterProvider.otherwise('home');
  })

  .factory('auth', ['$http', '$window', function($http, $window){
     	var auth = {};

     	auth.saveToken = function (token){
    		$window.localStorage['flapper-news-token'] = token;
  	};

  	auth.getToken = function (){
    		return $window.localStorage['flapper-news-token'];
  	};

  	auth.isLoggedIn = function(){
    		var token = auth.getToken();

    		if(token){
      		var payload = JSON.parse($window.atob(token.split('.')[1]));

      		return payload.exp > Date.now() / 1000;
    		} else {
      		return false;
    		}
  	};

  	auth.currentUser = function(){
    		if(auth.isLoggedIn()){
     			var token = auth.getToken();
      		var payload = JSON.parse($window.atob(token.split('.')[1]));

      		return payload.username;
    		}
  	};

  	auth.register = function(user){
    		return $http.post('/register', user).success(function(data){
      		auth.saveToken(data.token);
    		});
  	};

  	auth.logIn = function(user){
    		return $http.post('/login', user).success(function(data){
      		auth.saveToken(data.token);
    		});
  	};

  	auth.logOut = function(){
    		$window.localStorage.removeItem('flapper-news-token');
  	};

    	return auth;
  }])

  .controller('MyProjectList', function($scope, $http, $sce) {
    
    $http.get('/js/home.json').success(function (data){
      $scope.myData = data.media.map(function (srcUrl) {
        srcUrl.url = $sce.trustAsResourceUrl(srcUrl.url);
        return srcUrl;
      });
      
    });
    
  })

  .controller('AuthCtrl', function($scope, $state, auth){
    $scope.user = {};

    $scope.register = function(){
      auth.register($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('home');
      });
    };

    $scope.logIn = function(){
      auth.logIn($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('home');
      });
    };
  })

  .controller('NavCtrl', [
  '$scope',
  'auth',
  function($scope, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;
  }])