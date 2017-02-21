
angular.module('angular-google-gapi', [])

angular.module('angular-google-gapi').factory('GClient', ['$document', '$q', '$timeout', '$interval', '$window',
        function ($document, $q, $timeout, $interval, $window) {

        var LOAD_GAE_API = false;
        var URL = 'https://apis.google.com/js/client.js';

        function loadScript(src) {
                var deferred = $q.defer();
                var script = $document[0].createElement('script');
                script.onload = function (e) {
                    $timeout(function () {
                        deferred.resolve(e);
                    });
                };
                script.onerror = function (e) {
                    $timeout(function () {
                        deferred.reject(e);
                    });
                };
                script.src = src;
                $document[0].body.appendChild(script);
                return deferred.promise;
        };

        function load(callback) {
                loadScript(URL).then(function() {
                    var isok = function(callback) {
                        if($window.gapi.client != undefined) {
                            callback();
                            $interval.cancel(check);
                        }
                    }
                    isok(callback);
                    var check = $interval(function() {
                        isok(callback);
                    }, 10);
                    LOAD_GAE_API = true;
                });
        }

        return {

            get: function(callback){
                if(LOAD_GAE_API)
                    callback();
                else
                    load(callback);

            }

        }

    }]);

angular.module('angular-google-gapi').factory('GData', ['$rootScope',
        function ($rootScope) {

        $rootScope.gapi = {};

        var isLogin = false;
        var user = null;

        return {

            isLogin : function(value) {
            	
                if(arguments.length == 0){
                    return isLogin;
                    
                }
                isLogin = value;
                $rootScope.gapi.login = value;
                console.log($rootScope.gapi.login);
            },

            getUser : function(value) {
                if(arguments.length == 0)
                    return user;
                user = value;
                $rootScope.gapi.user = value;
            }

        }

    }]);


angular.module('angular-google-gapi').factory('GAuth', ['$rootScope', '$q', 'GClient', 'GApi', 'GData', '$interval', '$window', '$location',
    function($rootScope, $q, GClient, GApi, GData, $interval, $window){
        var isLoad = false;

        var CLIENT_ID;
        var SCOPE = 'https://www.googleapis.com/auth/userinfo.email';
        var RESPONSE_TYPE = 'token id_token';

        function load(callback){
             if (isLoad == false) {
                 var args = arguments.length;
                 GClient.get(function (){
                    $window.gapi.client.load('oauth2', 'v2', function() {
                         isLoad = true;
                         if (args == 1)
                             callback();
                     });
                 });
             } else {
                 callback();
             }

         }

        function signin(mode, authorizeCallback) {
        	
           load(function(){
            	
            	$window.gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPE, immediate: mode, response_type : RESPONSE_TYPE}, authorizeCallback);
            	
            });
           
           
        }

        function offline() {
            var deferred = $q.defer();
            var origin = $location.protocol + "//" + $location.hostname;
            if($location.port != "") {
                origin = origin + ':' + $location.port;
            }
            var win =  $window.open('https://accounts.google.com/o/oauth2/auth?scope='+encodeURI(SCOPE)+'&redirect_uri=postmessage&response_type=code&client_id='+CLIENT_ID+'&access_type=offline&approval_prompt=force&origin='+origin, null, 'width=800, height=600');

            $window.addEventListener("message", getCode);

            function getCode(event) {
                if (event.origin === "https://accounts.google.com") {
                    var data = JSON.parse(event.data);
                    $window.removeEventListener("message", getCode);
                    data = gup(data.a[0], 'code');
                    if (data == undefined)
                        deferred.reject();
                    else
                        deferred.resolve(data);

                }
            }

            function gup(url, name) {
                name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                var regexS = name+"=([^&#]*)";
                var regex = new RegExp( regexS );
                var results = regex.exec( url );
                if( results == null )
                    return undefined;
                else
                    return results[1];
            }

            return deferred.promise;
        }

        function getUser() {

            var deferred = $q.defer();
            $window.gapi.client.oauth2.userinfo.get().execute(function(resp) {
                if (!resp.code) {
                    GData.isLogin(true);
                    GApi.executeCallbacks();
                    var user = {};
                    user.email = resp.email;
                    user.picture = resp.picture;
                    user.id = resp.id;
                    if (resp.name == undefined)
                        user.name = resp.email;
                    else
                        user.name = resp.name;
                    user.link = resp.link;
                    GData.getUser(user);
                    deferred.resolve();
                } else {
                	
                    deferred.reject();
                }
            });
            return deferred.promise;
        }

        return {

            setClient: function(client) {
                CLIENT_ID = client;
            },

            setScope: function(scope) {
                SCOPE = scope;
            },

            load: function(callback){
                var args = arguments.length;
                GClient.get(function (){
                	
                    $window.gapi.client.load('oauth2', 'v2', function() {
                        if (args == 1)
                            callback();
                    });
                });

            },

            checkAuth: function(){
                var deferred = $q.defer();
                signin(true, function() {
                    getUser().then(function () {
                        deferred.resolve();
                    }, function () {
                        deferred.reject();
                    });
                });
                return deferred.promise;
            },

            login: function(){
                var deferred = $q.defer();
                signin(false, function() {
                    getUser().then(function () {
                    	deferred.resolve();
                    }, function () {
                    	deferred.reject();
                    });
                });
                
                return deferred.promise;
            },

            setToken: function(token){
                var deferred = $q.defer();
                load(function (){
                    $window.gapi.auth.setToken(token);
                    getUser().then(function () {
                    	
                        deferred.resolve();
                    }, function () {
                    	deferred.reject();
                    });
                });
                return deferred.promise;
            },

            getToken: function(){
                var deferred = $q.defer();
                load(function (){
                    deferred.resolve($window.gapi.auth.getToken());
                });
                return deferred.promise;
            },

            logout: function(){
                var deferred = $q.defer();
                load(function() {
                    $window.gapi.auth.setToken(null);
                    GData.isLogin(false);
                    GData.getUser(null);
                    deferred.resolve();
                });
                return deferred.promise;
            },

            offline: function(){
                var deferred = $q.defer();
                offline().then( function(code){
                        deferred.resolve(code);
                    }, function(){
                        deferred.reject();
                    });
                return deferred.promise;
            },


        }

    }]);

angular.module('angular-google-gapi').factory('GApi', ['$q', 'GClient', 'GData', '$window',
    function($q, GClient, GData, $window){

        var apisLoad  = [];

        var observerCallbacks = [];

        function registerObserverCallback(api, method, params, auth, deferred){
            var observerCallback = {};
            observerCallback.api = api;
            observerCallback.apiLoad = false;
            observerCallback.method = method;
            observerCallback.params = params;
            observerCallback.auth = auth;
            observerCallback.deferred = deferred;
            observerCallbacks.push(observerCallback);
        };

        function load(api, version, url) {
            GClient.get(function (){
                $window.gapi.client.load(api, version, function() {
                    console.log(api+" "+version+" api loaded");
                    apisLoad.push(api);
                    executeCallbacks(api);
                }, url)
            });
        }

        function executeCallbacks(api){
            var apiName = api;

            for(var i= 0; i < observerCallbacks.length; i++){
              var observerCallback = observerCallbacks[i];
              if ((observerCallback.api == apiName || observerCallback.apiLoad) && (observerCallback.auth == false || GData.isLogin() == true)) {
                  runGapi(observerCallback.api, observerCallback.method, observerCallback.params, observerCallback.deferred);
                  if (i > -1) {
                      observerCallbacks.splice(i--, 1);
                  }
              } else {
                  if (observerCallback.api == apiName)
                      observerCallbacks[i]['apiLoad'] = true;
              }
            };

        }

        function runGapi(api, method, params, deferred) {

            var pathMethod = method.split('.');
            var api = $window.gapi.client[api];
            for(var i= 0; i < pathMethod.length; i++) {
                api = api[pathMethod[i]];
            }
            api(params).execute(function (response) {
                if (response.error) {
                    deferred.reject(response);
                } else {
                    deferred.resolve(response);
                }
            });
        }

        function execute(api, method, params, auth) {
            var deferred = $q.defer();
            if (apisLoad.indexOf(api) > -1) {
                runGapi(api, method, params, deferred);
            }
            else
                registerObserverCallback(api, method, params, auth, deferred);
            return deferred.promise;
        }

        return {

            executeCallbacks : function() {
                executeCallbacks();
            },

            load: function(name, version, url){
                load(name, version, url);
            },

            execute: function(api, method, params){
                if(arguments.length == 3)
                    return execute(api, method, params, false);
                if(arguments.length == 2)
                    return execute(api, method, null, false);
            },

            executeAuth: function(api, method, params){
                if(arguments.length == 3)
                    return execute(api, method, params, true);
                if(arguments.length == 2)
                    return execute(api, method, null, true);
            },
        }
    }]);











var googleApi  = angular.module('ngEdjab.google',['angular-google-gapi'])


googleApi.run(['GAuth', 'GApi', function(GAuth, GApi){


var CLIENT = '446118979957-e7jo78qffeddglosqg4mt2lthr4qbdra.apps.googleusercontent.com';
var BASE = 'https://myGoogleAppEngine.appspot.com/_ah/api';

GApi.load('myContactApi', 'v1', BASE);
GApi.load('calendar', 'v3');
GAuth.setClient(CLIENT);
GAuth.setScope('https://www.googleapis.com/auth/userinfo.email');



}])



.service("GoogleLoginSevice", ['$http', 'toaster', 'ngProgressFactory', 'GetContextPath', '$window', '$timeout',
                               function($http, toaster, ngProgressFactory, GetContextPath, $window, $timeout){
	
	
	
var progress = ngProgressFactory.createInstance();
	
	this.googleLogin = function(email, name){
		
		
		progress.reset();		
		progress.setColor('red');
		progress.start();
		
		/*var input = {
                'facebookId': response.id,
                'facebookName': response.name
            }*/
		
		
		
		$http.post(GetContextPath.getContextPath()+"/GoogleLogin/?googleId="+email+"&googleName="+name)
        .success(function(result){
        	
        	
        	if(result=="200"){
        		progress.complete();
        		
        		toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Successfully Logged In</li></ul>', 5000, 'trustedHtml');
        		$timeout(function(){
        			$window.location.href = GetContextPath.getContextPath();
        		},800)
        		
        		
        	}
        	else if(result=="400"){
        		progress.complete();
        		        		
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Something went wrong, please do it again...</li></ul>', 5000, 'trustedHtml');
        		       		
        	}
        	else if(result=="404"){
        		progress.complete();
        		        		
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Something went wrong, please do it again...</li></ul>', 5000, 'trustedHtml');
       		       		
        	}
        	else if(result=="408"){
        		progress.complete();
        		
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Your account has been deactivated...</li></ul>', 5000, 'trustedHtml');
        		$timeout(function(){
        			$window.location.href = "renderActivationPage";
        		},800)     
        		
        	}        	
        	else if(result=="500"){        		
        		progress.reset();
        		        		
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error, please login again</li></ul>', 5000, 'trustedHtml');

        	}
    })
    .error(function(data, status){
    	progress.reset();
    	    	
    	toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Bad request, please login again, sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
    })
		
		
		
	}
	
	
	
	
	
}])

googleApi.controller('GoogleController', ['$scope', '$rootScope', 'GAuth', 'GApi', 'GData', '$location', '$window', '$http', 'GoogleLoginSevice', 
                                          function($scope, $rootScope, GAuth, GApi, GData, $location, $window, $http, GoogleLoginSevice){
	
	$rootScope.isLoggedInGoogle = false;
	$rootScope.isGoogleClicked = false;
	
	$scope.isLogin = function(){
		
		return $rootScope.gapi.login;
	}
	
	//$scope.googleUserInfo = {};
	
	if($rootScope.gapi.login==true){
		$rootScope.isLoggedInGoogle = true;
		
	}
	
	$scope.googleLogIn = function () {
		
		if($scope.isLoggedInFacebook==false){
		 GAuth.login().then(function(){
			 if($scope.isLoggedInFacebook==false){
			 $rootScope.isLoggedInGoogle = true;
			 var userInfo = $rootScope.gapi.user;
			 
			// $scope.googleUserInfo.email = userInfo.email;
			// $scope.googleUserInfo.id = userInfo.id; 
			// $scope.googleUserInfo.name = userInfo.name;
			
			 
			 //var data = {"emailId":userInfo.id, "password":"GooglE_PassworD"};
				
			 GoogleLoginSevice.googleLogin(userInfo.email, userInfo.name);
			 
			
			 }
         });
		}
		else{
			
		}
	}		
	

    $scope.googleLogout = function () {
    	GAuth.logout().then(
                function () {
                	//GAuth.offline();
                	               	
                	$rootScope.isLoggedInGoogle = false;
                	 var userInfo = $rootScope.gapi.user;
        			 if(userInfo==null)
        			 $scope.user = {};
        			 
        			 var self = $window.open('https://mail.google.com/mail/u/0/?logout&hl=en', 'newwindow', 'width=550, height=550'); 
        			 setTimeout(function(){ self.close(); }, 2000);
        			 
        			 
                });
		
    };
    
    
    
   
	
}])