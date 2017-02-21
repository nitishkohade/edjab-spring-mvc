
angular.module('ngEdjab.contactme',[])

.controller('ContactMeController',['$scope', '$rootScope', '$http','$location', '$routeParams', '$timeout', 'toaster', 'ngProgressFactory',  'GetContextPath',
                                       function($scope, $rootScope, $http, $location, $routeParams, $timeout, toaster, ngProgressFactory, GetContextPath){
	
	
	var progress = ngProgressFactory.createInstance();
	
	$scope.e = '';
	$scope.no_e = undefined;
	$rootScope.sendingMessage = false;	
	$rootScope.contactMeError = null;
	$rootScope.fieldError = null;
	
	/*$scope.$watch("message",function(){
		
		$rootScope.contactMeError = null;
	})
	
	$scope.$watch("emailId",function(){
		
		$rootScope.contactMeError = null;
	})*/
	
	
	$rootScope.onContactMe = function(){
		progress.reset();		
		progress.setColor('red');
		progress.start();
		if($scope.e.toLowerCase() == $scope.emailId.toLowerCase() && $scope.no_e!='e'){
		
		$rootScope.sendingMessage = true;
		$rootScope.contactMeError = null;
		
		
		
		$http.post(GetContextPath.getContextPath()+"/ContactMe?userId="+$scope.emailId.toLowerCase()+"&message="+$scope.message)
        .success(function(result){
        	
        	$rootScope.sendingMessage = false;
        	if(result=="200"){
        		progress.complete();
        		$rootScope.contactMeError = false;
        		$rootScope.fieldError = false;
        		toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Message successfully sent..</li></ul>', 5000, 'trustedHtml');
        		       		
        	}
        	
        	if(result=="400"){
        		progress.complete();
        		$rootScope.contactMeError = "400";
        		$rootScope.fieldError = true;
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">EmailId doesn\'t exist, please provide the correct existing address</li></ul>', 5000, 'trustedHtml');

        	}
        	
        	if(result=="500"){
        		progress.reset();
        		$rootScope.contactMeError = "500";
        		$rootScope.fieldError = true;
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server Error, please send again, sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');

        	}
        	
    })
    .error(function(data, status){
    	progress.reset();
    	$rootScope.contactMeError = true;
    	$rootScope.sendingMessage = false;
    	$rootScope.fieldError = true;
    	toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Bad request [your host name doesn\'t seem good], please send again</li></ul>', 5000, 'trustedHtml');
    })
    
		}
		else if( $scope.e.toLowerCase() != $scope.emailId.toLowerCase() && $scope.no_e=='e'){
			
			
			$rootScope.sendingMessage = true;
			$rootScope.contactMeError = null;
			
			$http.post(GetContextPath.getContextPath()+"/ContactMe?userId="+$scope.emailId.toLowerCase()+"&message="+$scope.message)
	        .success(function(result){
	        	
	        	$rootScope.sendingMessage = false;
	        	if(result=="200"){
	        		progress.complete();
	        		$rootScope.contactMeError = false;
	        		$rootScope.fieldError = false;
	        		toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Message successfully sent..</li></ul>', 5000, 'trustedHtml');
	        		       		
	        	}
	        	
	        	if(result=="400"){
	        		progress.complete();
	        		$rootScope.contactMeError = "400";
	        		$rootScope.fieldError = true;
	        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">EmailId doesn\'t exist, please provide the correct existing address</li></ul>', 5000, 'trustedHtml');

	        	}
	        	
	        	if(result=="500"){
	        		progress.reset();
	        		$rootScope.contactMeError = "500";
	        		$rootScope.fieldError = true;
	        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server Error, please send again, sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');

	        	}
	        	
	    })
	    .error(function(data, status){
	    	progress.reset();
	    	$rootScope.contactMeError = true;
	    	$rootScope.sendingMessage = false;
	    	$rootScope.fieldError = true;
	    	toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Bad request [your host name doesn\'t seem good], please send again</li></ul>', 5000, 'trustedHtml');
	    })
			
			
		}
		else if($scope.e.toLowerCase() != $scope.emailId.toLowerCase() && $scope.no_e!='e'){
			$timeout(function(){
				progress.complete();
				$rootScope.contactMeError = "e_error";
        		$rootScope.fieldError = true;
				toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Your emailId id is '+ $scope.e+', Please correct it</li></ul>', 5000, 'trustedHtml');

			},200)
			
		}
		
	}
	
	
	
	
}])