
angular.module('ngEdjab.resetpassword',[])




.controller('ResetPasswordController',['$scope', '$http','$location', '$routeParams', '$timeout', 'toaster', 'ngProgressFactory', 'GetContextPath', 
                                       function($scope, $http, $location, $routeParams, $timeout, toaster, ngProgressFactory, GetContextPath){
	
	
	var progress = ngProgressFactory.createInstance();
	$scope.resetPassword = false;
	$scope.password = "";
	$scope.emailId="";
	$scope.token="";
	$scope.passwordError = null;
	
	
	
	$scope.onReset = function(){
		progress.reset();		
		progress.setColor('red');
		progress.start();
		$scope.resetPassword = true;
		$scope.passwordError = null;
		var input= {
				'userId':$scope.emailId,
				'updatedPassword':$scope.password,
				'resetPasswordToken':$scope.token
		}
		$http.post(GetContextPath.getContextPath()+"/RenewPassword/ResetPassword", input)
        .success(function(result){
        	
        	$scope.resetPassword = false;
        	if(result=="200"){
        		progress.complete();
        		$scope.passwordError = false;
        		toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Password\'s been modified Successfully, please login :)</li></ul>', 5000, 'trustedHtml');
        		       		
        	}
        	
        	if(result=="400"){
        		progress.complete();
        		$scope.passwordError = "400";            	
            	toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Email ID and token doesn\'t match, please request for another token... </li></ul>', 5000, 'trustedHtml');

        	}
        	if(result=="500"){
        		progress.reset();
        		$scope.passwordError = true;            	
            	toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error, please reset again, sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');

        	}
    })
    .error(function(data, status){
    	progress.reset();
    	$scope.passwordError = true;
    	$scope.resetPassword = false;
    	toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Bad request, please reset again, sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
    })
		
	}
	
	
	
}])


