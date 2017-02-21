angular.module('ngEdjab.validateForm',[])

.factory('myCustomElementModifier', [
                                     function () {
                                        
                                         makeValid = function (el) {
                                         
                                         },

                                       
                                         makeInvalid = function (el, errorMsg) {
                                         
                                         },


                                      
                                         makeDefault = function (el) {
                                             
                                         };

                                         return {
                                             makeValid: makeValid,
                                             makeInvalid: makeInvalid,
                                             makeDefault: makeDefault,
                                             key: 'myCustomModifierKey'
                                         };
                                     }
                                 ])







.run(function(defaultErrorMessageResolver, validator, myCustomElementModifier, bootstrap3ElementModifier){
   
	bootstrap3ElementModifier.enableValidationStateIcons(true);
	
	
	 validator.registerDomModifier(myCustomElementModifier.key, myCustomElementModifier);
     validator.setDefaultElementModifier(myCustomElementModifier.key);
	
	defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages){
        
    	
        errorMessages["password_error"]= "Password should contain at least 1 capital letter and 1 number";
        errorMessages["password_length_error"]= "Password must contain 6 or more characters";
        errorMessages["confirm_password_error"]= "Passwords do not match";
        errorMessages["message_error"]= "Please write something...";
        errorMessages["autocomplete_error"]= "Please input numbers or alphabets...";        
        errorMessages["min_number_error"]= "Range shouldn't be lower than 100 km";
        errorMessages["max_number_error"]= "Range shouldn't exceed 2000 km";
        errorMessages["step_number_error"]= "Please input 100, 200, 300 ...";
        errorMessages["email_max_length"]="Email is too long";
        errorMessages["name_pattern_error"]="Please input alphabets only...";
        errorMessages["name_max_error"]="Name shouldn't exceed 50 characters";
        errorMessages["contact_pattern_error"]="Please input numbers only...";
        errorMessages["contact_max_error"]="contact number shouldn't exceed 10 characters";
        errorMessages["contact_min_error"]="Please provide your 10 digit contact number";
        errorMessages["address_max_error"]="Address shouldn't exceed 100 characters";
        errorMessages["city_pattern_error"]="Please input alphabets only...";
        errorMessages["city_max_error"]="City name shouldn't exceed 50 characters";
        errorMessages["state_pattern_error"]="Please input alphabets only...";
        errorMessages["state_max_error"]="State name shouldn't exceed 50 characters";
        errorMessages["zip_pattern_error"]="Please input numbers only...";
        errorMessages["zip_max_error"]="Zip code shouldn't exceed 10 characters";
        errorMessages["fb_user_emailId_error"]="Please provide your email Id...";
    })
})

.directive('equalsTo', function() {
    return {
        restrict : 'A',
        require : 'ngModel',
        scope : {
            otherModelValue : '=equalsTo'
        },
        link : function(scope, element, attributes, ngModel) {

            ngModel.$validators.equalsTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch('otherModelValue', function() {
                ngModel.$validate();
            });
        }
    };
})



.controller('ValidateRegistrationController',["$scope", "$http", "toaster", "$location", "$timeout", "ngProgressFactory", "GetContextPath",
                                              function($scope, $http, toaster, $location, $timeout, ngProgressFactory, GetContextPath){
	
	var progress = ngProgressFactory.createInstance();
	
	 $scope.submitting = false;
	 $scope.registerModal = {};
	 $scope.registerError = null;
	 $scope.fieldError = null;
	 
	
	 
	 
	$scope.onRegister = function(valid){
	   
		 	progress.reset();		
			progress.setColor('red');
			progress.start();
		 $scope.submitting = true;
		 $scope.registerError = null;
		
		 var input = {
	                'userId': $scope.registerModal.emailId.toLowerCase(),
	                'password': $scope.registerModal.password
	               
	            }
		
		$http.post(GetContextPath.getContextPath()+"/UserRegister", input)
        .success(function(result){
        	
        	$scope.submitting = false;
        	if(result=="200"){
        		progress.complete();
        		$scope.registerModal = null;
        		$scope.registerError=false;
        		 $scope.fieldError = false;
        		toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Please validate your emailId</li></ul>', 5000, 'trustedHtml');
        	}
        	else if(result=="400"){
        		progress.complete();
        		$scope.registerModal = null;
        		$scope.registerError="400";
        		 $scope.fieldError = true;
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">you are already registered, please login</li></ul>', 5000, 'trustedHtml');
        	}
        	else if(result=="500"){
        		progress.reset();
        		$scope.registerModal = null;
        		$scope.registerError=true;
        		 $scope.fieldError = true;
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error, Please register again, sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
        	}
        	
        	
        	
    })
    .error(function(data, status){
    	progress.reset();
    	$scope.registerModal = null;
    	$scope.submitting = false;
    	$scope.registerError=true;
    	 $scope.fieldError = true;
    	toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Bad request, please register again, sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
    })
    
	}
	
}])