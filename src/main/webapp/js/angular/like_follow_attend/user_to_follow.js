angular.module("ngEdjab.user_to_follow",[])


.service("Default_UserToFollow", ['$q', '$http', 'GetContextPath',
                                  function($q, $http, GetContextPath){
           	
           	
           	
           	this.default_UserToFollow = function(userid, schoolid){
           		
           		var deferred = $q.defer();
           		 		
           		$http.post(GetContextPath.getContextPath()+'/DefaultUserToFollow/?followedby='+userid+"&followedTo="+schoolid).then(function(resp) {
           			
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



.service("UserToFollow",['$timeout', '$q', '$http', 'toaster', 'ngProgressFactory', 'GetContextPath',
                       function($timeout, $q, $http, toaster, ngProgressFactory, GetContextPath){
	
	
	this.userToFollow = function(id){
		
		var deferred = $q.defer();
	
		$http.post(GetContextPath.getContextPath()+'/createUserToFollow/?key='+id).then(function(resp) {
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


.service("UserToUnFollow",['$timeout', '$q', '$http', 'toaster', 'GetContextPath',
                       function($timeout, $q, $http, toaster, GetContextPath){
	
	
	this.userToUnFollow = function(id){
		
		var deferred = $q.defer();
	
		$http.post(GetContextPath.getContextPath()+'/removeFollowService/?key='+id).then(function(resp) {
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

.controller("UserToFollowController", ['$scope', '$timeout', '$q', '$http', 'toaster', 'ngProgressFactory', 'UserToFollow', '$window', 'UserToUnFollow', 'Default_UserToFollow',
                              function($scope, $timeout, $q, $http, toaster, ngProgressFactory, UserToFollow, $window, UserToUnFollow, Default_UserToFollow){
	
	var f = 0;
	var fr = 0;
	$scope.disabledF = 0;
	$scope.disabledFR = 0;
	
	var progress = ngProgressFactory.createInstance();
	progress.reset();		
	progress.setColor('red');
	
	$scope.f = false;
	$scope.fr = false;
	//$scope.disablefollow = false;
	
	$scope.userToFollow = function(schoolid){
		progress.start();
		
		
		if(f>=3){
			progress.reset();	
			//$scope.disablefollow = true;
			$scope.f = true;
			$scope.fr = false;
			$timeout(function(){
				toaster.clear();
				toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'You could not follow/unfollow more than three times...</li></ul>', 5000, 'trustedHtml');
				
			},2)
			
		}else{
			if($scope.disabledF == 0){
				$scope.disabledF = 1;
			UserToFollow.userToFollow(schoolid).then(function(result){
				if(result=="200"){
					$scope.noOfFollowers = parseInt($scope.noOfFollowers) + 1;
					$scope.disabledF = 0;
					$scope.f = false;
					$scope.fr = true;
					progress.complete();	
					$timeout(function(){
						toaster.clear();
						toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
								'You are following this university</li></ul>', 5000, 'trustedHtml');
						},3)
					
					f++;
				}
				else if(result=="400"){
					$scope.disabledF = 0;
					progress.reset();	
					$timeout(function(){
					toaster.clear();
					toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'Something wrong happened, please refresh the page...</li></ul>', 5000, 'trustedHtml');
					},3)
				}
				else if(result=="408"){
					$scope.disabledF = 0;
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
					$scope.disabledF = 0;
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
	
	$scope.userToUnFollow = function(schoolid){
		progress.start();
		
		if(fr>=3){
			progress.reset();
			$timeout(function(){
				toaster.clear();
				toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'You could not follow/unfollow more than three times...</li></ul>', 5000, 'trustedHtml');
				
			},2)
			
		}else{
			if($scope.disabledFR == 0){
				UserToUnFollow.userToUnFollow(schoolid).then(function(result){
				$scope.disabledFR = 1;
				if(result=="200"){
					$scope.noOfFollowers = parseInt($scope.noOfFollowers) - 1;
					$scope.disabledFR = 0;
					$scope.f = true;
					$scope.fr = false;
					progress.complete();	
					$timeout(function(){
						toaster.clear();
						toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
								'You do not follow this university</li></ul>', 5000, 'trustedHtml');
						},3)
					
					fr++;
				}
				else if(result=="400"){
					$scope.disabledFR = 0;
					progress.reset();	
					$timeout(function(){
					toaster.clear();
					toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'Something wrong happened, please refresh the page...</li></ul>', 5000, 'trustedHtml');
					},3)
				}
				else if(result=="408"){
					$scope.disabledFR = 0;
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
					$scope.disabledFR = 0;
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
	
	
	
$scope.default_UserToFollow = function(userid, schoolid){
		
		
			
		if(userid!=""){
			
			Default_UserToFollow.default_UserToFollow(userid, schoolid).then(function(result){
				if(result=="true"){
					
					$scope.fr = true;
					$scope.f = false;
				}
				else if(result=="false"){
					
					$scope.fr = false;
					$scope.f = true;
				}
			})
		}		
		else if(userid==""){
			$scope.fr = false;
			$scope.f = true;
		}
		
	}
	
	
	
}])