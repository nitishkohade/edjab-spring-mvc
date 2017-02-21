angular.module("ngEdjab.activateuser", [])

.controller("ActivateUserController", ['$scope', '$http', 'toaster', 'ngProgressFactory', 'GetContextPath',
                                       function($scope, $http, toaster, ngProgressFactory, GetContextPath){
	
	var i = 0;
	
	var progress = ngProgressFactory.createInstance();
	
	$scope.activatingUser = false;
	
	$scope.activationError = null;
	
	$scope.emailId = "";
	
	$scope.moreClick = false;
	
	
	$scope.onActivate = function(){
		$scope.moreClick = false;
		$scope.activationError = null;
		i++;
		if(i>1){
			
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">You cannot try more than once upon success...</li></ul>', 5000, 'trustedHtml');
			$scope.moreClick = true;
			
		}
		else if(i==1){
			
			progress.reset();		
			progress.setColor('red');
			progress.start();
			$scope.activatingUser = true;
			
			var input = {
							'userId':$scope.emailId.toLowerCase()
						}
			
			$http.post(GetContextPath.getContextPath()+"/activateUser", input)
	        .success(function(result){
	        	
	        	$scope.activatingUser = false;
	        	if(result=="200"){
	        		progress.complete();
	        		toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Please check your mail</li></ul>', 5000, 'trustedHtml');
	        		$scope.activationError = false;       		
	        	}
	        	
	        	if(result=="500"){
	        		progress.reset();
	        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server Error, please try again, sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
	        		$scope.activationError = true;
	        		i=0;
	        	}
	        	
	    })
	    .error(function(data, status){
	    	progress.reset();
	    	$scope.activatingUser = false;
	    	toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Bad request, please try again, sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
	    	$scope.activationError = true;
	    	i=0;
	    })
			
			
		}
		
		
		
	}
	
	
	
}])