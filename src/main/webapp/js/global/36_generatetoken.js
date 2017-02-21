
angular.module('ngEdjab.generatetoken',[])

.controller('GenerateTokenController',['$scope', '$http','$location', '$routeParams', '$timeout', 'toaster', 'ngProgressFactory', 'GetContextPath',
                                       function($scope, $http, $location, $routeParams, $timeout, toaster, ngProgressFactory, GetContextPath){
	
	var progress = ngProgressFactory.createInstance();
	
	
	$scope.generatingToken = false;
	$scope.emailId = "";
	$scope.tokenError = null;
	$scope.fieldError = null;

	

	$scope.onGenerate = function(){
		progress.reset();		
		progress.setColor('red');
		progress.start();
		$scope.generatingToken = true;
		$scope.tokenError = null;
		var input = {
				'userId':$scope.emailId.toLowerCase()
		}
		$http.post(GetContextPath.getContextPath()+"/RenewPassword/GenerateToken", input)
        .success(function(result){
        	
        	$scope.generatingToken = false;
        	if(result=="200"){
        		progress.complete();
        		$scope.tokenError = false;
        		$scope.fieldError = false;
        		toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Please check your mail</li></ul>', 5000, 'trustedHtml');
        		       		
        	}
        	if(result=="400"){
        		progress.complete();
        		$scope.tokenError = '400';
        		$scope.fieldError = true;
        		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Email Id does not exist...</li></ul>', 5000, 'trustedHtml');
        		     		
        		
        	}
        	if(result=="500"){
        		progress.reset();
        		$scope.tokenError = true;
        		$scope.fieldError = true;
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server Error, please confirm again, sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');

        	}
        	
    })
    .error(function(data, status){
    	progress.reset();
    	$scope.tokenError = true;
    	$scope.generatingToken = false;
    	$scope.fieldError = true;
    	toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Bad request, please confirm again, sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
    })
		
	}
	
	
	
	
}])