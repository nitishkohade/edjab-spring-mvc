angular.module('ngEdjab.loginregister',[])

.service("RemembermeCookie", ['$cookies', 'GetContextPath',
                              function($cookies, GetContextPath){
	
	this.getRemembermeCookie = function(){
		return $cookies.get('remkeep');
	}
	
	this.putRemembermeCookie = function(cookie){
		$cookies.put('remkeep', cookie);
	}
	
	this.removeRemembermeCookie = function(){
		$cookies.remove('remkeep', { path: "/"+GetContextPath.getContextPath().split("/")[3] });
	}

}])

.controller('LoginRegisterController',['$scope', '$http','$location', '$routeParams', '$timeout', 'toaster', '$window', 'ngProgressFactory', 'GetContextPath', 'RemembermeCookie', 'base64',
                                       function($scope, $http, $location, $routeParams, $timeout, toaster, $window, ngProgressFactory, GetContextPath, RemembermeCookie, base64){
	
		
	var progress = ngProgressFactory.createInstance();
	
	$scope.removeRemembermeCookie = function(){
		
		progress.reset();		
		progress.setColor('red');
		progress.start();
		
		RemembermeCookie.removeRemembermeCookie();
					
		$http.get(GetContextPath.getContextPath()+"/UserLogout")
        .success(function(result){
        	        	
        	$timeout(function(){
    			$window.open(GetContextPath.getContextPath(), "_self");
    			progress.complete();
    		}, 200)
        })        
        .error(function(){
        	progress.reset();
        })
	}
	
	
	
	$scope.loginModal = {};
	$scope.signIn = false;
	$scope.loginError = null;
	$scope.fieldError = null;
	
	
			
	var cookieEncoded = RemembermeCookie.getRemembermeCookie();
	
	if(cookieEncoded != " " && cookieEncoded != null && cookieEncoded != "" && cookieEncoded != undefined){

		var decodedCookie = base64.decode(cookieEncoded);
		var result = decodedCookie.split("|");
		var login = result[0];
		var password = result[1];
		$scope.loginModal.emailId = login;
		$scope.loginModal.password = password;
		$scope.loginModal.rememberme = true;
	}
		
		
	$scope.onLogin = function(){
		
				
		progress.reset();		
		progress.setColor('red');
		progress.start();
		$scope.signIn = true;
		$scope.loginError = null;
		 var input = {
	                'userId': $scope.loginModal.emailId.toLowerCase(),
	                'password': $scope.loginModal.password,
	                'rememberme':$scope.loginModal.rememberme
	            }
	       var userId = $scope.loginModal.emailId.toLowerCase();
		
		$http.post(GetContextPath.getContextPath()+"/UserLogin", input)
        .success(function(result){
        	
        	var res = result.split("|");        	
        	RemembermeCookie.putRemembermeCookie(res[1]);
        	result = res[0];
        	
        	$scope.signIn = false;
        	if(result=="200"){
        		progress.complete();
        		$scope.loginError = false;
        		$scope.fieldError = false;
        		toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Successfully Logged In</li></ul>', 5000, 'trustedHtml');
        		$timeout(function(){
        			$window.location.href = GetContextPath.getContextPath();
        		},1200)
        		
        		
        	}
        	else if(result=="400"){
        		progress.complete();
        		$scope.loginModal = null;
        		$scope.loginError = "400";
        		$scope.fieldError = true;
        		
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Password is incorrect, Please login again</li></ul>', 5000, 'trustedHtml');
        		       		
        	}
        	else if(result=="404"){
        		progress.complete();
        		$scope.loginModal = null;
        		$scope.loginError = "404";
        		$scope.fieldError = true;
        		
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">EmailID not registered...</li></ul>', 5000, 'trustedHtml');
        		       		
        	}
        	else if(result=="408"){
        		progress.complete();
        		$scope.loginModal = null;
        		$scope.loginError = "408";
        		$scope.fieldError = true;
        		
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Your account has been deactivated...</li></ul>', 5000, 'trustedHtml');
        		$timeout(function(){
        			$window.location.href = "renderActivationPage";
        		},1200)     
        		
        	}        	
        	else if(result=="500"){        		
        		progress.reset();
        		$scope.loginModal = null;
        		$scope.loginError = true;
        		$scope.fieldError = true;
        		
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error, please login again</li></ul>', 5000, 'trustedHtml');

        	}
    })
    .error(function(data, status){
    	progress.reset();
    	$scope.loginModal = null;
    	$scope.loginError = true;
    	$scope.fieldError = true;
    	$scope.signIn = false;
    	
    	toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Bad request, please login again, sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
    })
		
	}
	
	
	
}])

/*
.controller("HeaderController", [ '$scope', '$timeout', '$window', 'RemembermeCookie', 'GetContextPath', '$cookies',
                                  function($scope, $timeout, $window, RemembermeCookie, GetContextPath, $cookies){
	
		$scope.removeRemembermeCookie = function(){
				
		$cookies.remove('remkeep');
			
		$timeout(function(){
			$window.open(GetContextPath.getContextPath()+"/UserLogout", "_self")
		}, 200)
	}
	
}])
*/

	   
