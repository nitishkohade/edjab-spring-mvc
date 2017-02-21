angular.module("ngEdjab.user_to_attend",[])


.service("Default_UserToAttend", ['$q', '$http', 'GetContextPath',
                                function($q, $http, GetContextPath){
         	
         	
         	
         	this.default_UserToAttend = function(userid, schoolid){
         		
         		var deferred = $q.defer();
         		 		
         		$http.post(GetContextPath.getContextPath()+'/DefaultUserToAttend/?attendedby='+userid+"&attendedTo="+schoolid).then(function(resp) {
         			
         			/*	if(resp.data.toString() == "false"){ 				
     				deferred.resolve("false");
     			}else if(resp.data.toString() == "true"){
     				deferred.resolve("true");
     			}*/
     			deferred.resolve(resp.data.toString());
         			
         			 
         	  }, function(resp) {
         		   		
         		 
         		deferred.reject("false");
         	
         	  })
         	
         		return deferred.promise;
         	
         		
         	}
         	
         	
         	
         	
 }])



.service("UserToAttend",['$timeout', '$q', '$http', 'toaster', 'ngProgressFactory', 'GetContextPath', 
                       function($timeout, $q, $http, toaster, ngProgressFactory, GetContextPath){
	
	
	this.userToAttend = function(id){
		
		var deferred = $q.defer();
		
		
		$http.post(GetContextPath.getContextPath()+'/createUserToAttend/?key='+id).then(function(resp) {
		 		if(resp.data=="200"){
		 			deferred.resolve("200");
		 		}
		 		else if(resp.data=="400"){
		 			deferred.resolve("400");
		 		}
		 		else if(resp.data=="408"){
		 			deferred.resolve("408");
		 		}
		 		else if(resp.data=="500"){
		 			deferred.resolve("500");
		 		}
		 		
			
			 
	  }, function(resp) {
		  
		/*toaster.clear();
		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Unable to post your reviews...</li></ul>', 5000, 'trustedHtml');*/
		deferred.reject("500");
	
	  })
	
		return deferred.promise;
		
	}
	
}])


.service("UserToUnAttend",['$timeout', '$q', '$http', 'toaster', 'GetContextPath',
                       function($timeout, $q, $http, toaster, GetContextPath){
	
	
	this.userToUnAttend = function(id){
		
		var deferred = $q.defer();
		
		
		$http.post(GetContextPath.getContextPath()+'/removeAttendService/?key='+id).then(function(resp) {
		 		if(resp.data=="200"){
		 			deferred.resolve("200");
		 		}
		 		else if(resp.data=="400"){
		 			deferred.resolve("400");
		 		}
		 		else if(resp.data=="408"){
		 			deferred.resolve("408");
		 		}
		 		else if(resp.data=="500"){
		 			deferred.resolve("500");
		 		}
		 		
			
			 
	  }, function(resp) {
		  
		/*toaster.clear();
		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Unable to post your reviews...</li></ul>', 5000, 'trustedHtml');*/
		deferred.reject("500");
	
	  })
	
		return deferred.promise;
		
	}
	
}])

.controller("UserToAttendController", ['$scope', '$timeout', '$q', '$http', 'toaster', 'ngProgressFactory', 'UserToAttend', '$window', 'UserToUnAttend', 'Default_UserToAttend',
                              function($scope, $timeout, $q, $http, toaster, ngProgressFactory, UserToAttend, $window, UserToUnAttend, Default_UserToAttend){
	
	var a = 0
	var ar = 0;
	$scope.disabledA = 0;
	$scope.disabledAR = 0;
	
	
	var progress = ngProgressFactory.createInstance();
	progress.reset();		
	progress.setColor('red');
	
	$scope.a = false;
	$scope.ar = false;
	//$scope.disableattend = false;
	
	$scope.userToAttend = function(schoolid){
		progress.start();
		
		
		if(a>=3){
			progress.reset();	
			//$scope.disableattend = true;
			$scope.a = true;
			$scope.ar = false;
			$timeout(function(){
				toaster.clear();
				toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'You could not attend/unattend more than three times...</li></ul>', 5000, 'trustedHtml');
				
			},2)
			
		}else{
			if($scope.disabledA == 0){
				$scope.disabledA = 1;
			UserToAttend.userToAttend(schoolid).then(function(result){
					if(result=="200"){
						$scope.noOfAttendees = parseInt($scope.noOfAttendees) + 1;
						$scope.disabledA = 0;
						$scope.a = false;
						$scope.ar = true;
						progress.complete();	
					$timeout(function(){
						toaster.clear();
						toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
								'You have attended this university</li></ul>', 5000, 'trustedHtml');
						},3)
					
					a++;
				}
				else if(result=="400"){
					$scope.disabledA = 0;
					progress.reset();	
					$timeout(function(){
					toaster.clear();
					toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'Something wrong happened, please refresh the page...</li></ul>', 5000, 'trustedHtml');
					},3)
				}
				else if(result=="408"){
					$scope.disabledA = 0;
					$timeout(function(){
						progress.reset();	
					},500)
					toaster.clear();
					toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'You are not logged in, please login first...</li></ul>', 5000, 'trustedHtml');
					$timeout(function(){
						$window.location.href = "../login";
					},3000)
				}
				else if(result=="500"){
					$scope.disabledA = 0;
					progress.reset();	
					$timeout(function(){
					toaster.clear();
					toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'Server error occurred... </li></ul>', 5000, 'trustedHtml');
					},3)
				}
			});
		}
		}
		
	}
	
	$scope.userToUnAttend = function(schoolid){
		progress.start();
		
		if(ar>=3){
			progress.reset();
			$timeout(function(){
				toaster.clear();
				toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'You could not attend/unattend more than three times...</li></ul>', 5000, 'trustedHtml');
				
			},2)
			
		}else{
			if($scope.disabledAR == 0){
				$scope.disabledAR = 1;
				UserToUnAttend.userToUnAttend(schoolid).then(function(result){
				if(result=="200"){
					$scope.noOfAttendees = parseInt($scope.noOfAttendees) - 1;
					$scope.disabledAR = 0;
					$scope.a = true;
					$scope.ar = false;
					progress.complete();	
					$timeout(function(){
						toaster.clear();
						toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
								'You never attended this university</li></ul>', 5000, 'trustedHtml');
						},3)
					
					ar++;
				}
				else if(result=="400"){
					$scope.disabledAR = 0;
					progress.reset();	
					$timeout(function(){
					toaster.clear();
					toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'Something wrong happened, please refresh the page...</li></ul>', 5000, 'trustedHtml');
					},3)
				}
				else if(result=="408"){
					$scope.disabledAR = 0;
					$timeout(function(){
						progress.reset();	
					},500)
					toaster.clear();
					toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'You are not logged in, please login first...</li></ul>', 5000, 'trustedHtml');
					$timeout(function(){
						$window.location.href = "../login";
					},3000)
				}
				else if(result=="500"){
					$scope.disabledAR = 0;
					progress.reset();	
					$timeout(function(){
					toaster.clear();
					toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'Server error occurred... </li></ul>', 5000, 'trustedHtml');
					},3)
				}
			});
		}
		}
		
	}
	
	
	
	$scope.default_UserToAttend = function(userid, schoolid){
		
		
			
		if(userid!=""){
			
			Default_UserToAttend.default_UserToAttend(userid, schoolid).then(function(result){
				if(result=="true"){
					
					$scope.ar = true;
					$scope.a = false;
				}
				else if(result=="false"){
					
					$scope.ar = false;
					$scope.a = true;
				}
			})
		}		
		else if(userid==""){
			$scope.ar = false;
			$scope.a = true;
		}
		
	}
	
	
	
	
}])