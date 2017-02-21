angular.module("ngEdjab.user_to_like",[])


.service("Default_UserToLike", ['$q', '$http', 'GetContextPath',
                        function($q, $http, GetContextPath){
 	
 	
 	
 	this.default_UserToLike = function(userid, schoolid){
 		
 		var deferred = $q.defer();
 		 		
 		$http.post(GetContextPath.getContextPath()+'/DefaultUserToLike/?likedby='+userid+"&likedTo="+schoolid).then(function(resp) {
 			
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



.service("UserToLike", ['$timeout', '$q', '$http', 'toaster', 'GetContextPath',
                       function($timeout, $q, $http, toaster, GetContextPath){
	
	
	
	this.userToLike = function(id){
		
		var deferred = $q.defer();
		
		
		$http.post(GetContextPath.getContextPath()+'/createUserToLike/?key='+id).then(function(resp) {
				
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
		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Server error occurred...</li></ul>', 5000, 'trustedHtml');*/
		deferred.reject("500");
	
	  })
	
		return deferred.promise;
	
		
	}
	
	
	
	
}])



.service("UserToUnLike", ['$timeout', '$q', '$http', 'toaster', 'GetContextPath',
                       function($timeout, $q, $http, toaster, GetContextPath){
	
	
	
	this.userToUnLike = function(id){
		
		var deferred = $q.defer();
		
		
		$http.post(GetContextPath.getContextPath()+'/removeLikeService/?key='+id).then(function(resp) {
				
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
		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Server error occurred...</li></ul>', 5000, 'trustedHtml');*/
		deferred.reject("500");
	
	  })
	
		return deferred.promise;
	
		
	}
	
	
	
	
}])

.controller("UserToLikeController", ['$scope', '$timeout', '$q', '$http', 'toaster', 'ngProgressFactory', 'UserToLike', '$window', 'UserToUnLike', 'Default_UserToLike', 
                              function($scope, $timeout, $q, $http, toaster, ngProgressFactory, UserToLike, $window, UserToUnLike, Default_UserToLike){
	
	var l = 0; 
	var lr = 0; 
	$scope.disabledL = 0;
	$scope.disabledLR = 0;
	
	var progress = ngProgressFactory.createInstance();
	progress.reset();		
	progress.setColor('red');
		
	
	$scope.l = false;
	$scope.lr = false;
	//$scope.disablelike = false;
	
	$scope.userToLike = function(schoolid){
		progress.start();
		
		if(l>=3){
			progress.reset();	
			//$scope.disablelike = true;
			$scope.l = true;
			$scope.lr = false;
			$timeout(function(){
				toaster.clear();
				toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'You could not like/unlike more than three times...</li></ul>', 5000, 'trustedHtml');
				
			},2)
			
		}else{
			if($scope.disabledL==0){
				
				$scope.disabledL = 1;
			UserToLike.userToLike(schoolid).then(function(result){
				
				if(result=="200"){
					$scope.noOfLikes = parseInt($scope.noOfLikes) + 1;
					$scope.l = false;
					$scope.lr = true;
					progress.complete();	
					$timeout(function(){
						toaster.clear();
						toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
								'You liked university</li></ul>', 5000, 'trustedHtml');
						},3)
					$scope.disabledL = 0;
					l++;
				}
				else if(result=="400"){
					$scope.disabledL = 0;
					progress.reset();	
					$timeout(function(){
					toaster.clear();
					toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'Something wrong happened, please refresh the page...</li></ul>', 5000, 'trustedHtml');
					},3)
				}
				else if(result=="408"){
					$scope.disabledL = 0;
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
					$scope.disabledL = 0;
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
	
	$scope.userToUnLike = function(schoolid){
		progress.start();
		
		if(lr>=3){
			progress.reset();	
			$timeout(function(){
				toaster.clear();
				toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'You could not like/unlike more than three times...</li></ul>', 5000, 'trustedHtml');
				
			},2)
			
		}else{
			if($scope.disabledLR == 0){
				$scope.disabledLR = 1;
			UserToUnLike.userToUnLike(schoolid).then(function(result){
				if(result=="200"){
					$scope.noOfLikes = parseInt($scope.noOfLikes) - 1;
					$scope.disabledLR = 0;
					$scope.lr = false;
					$scope.l = true;
					progress.complete();	
					$timeout(function(){
						toaster.clear();
						toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
								'You unliked university</li></ul>', 5000, 'trustedHtml');
						},3)
					
					lr++;
				}
				else if(result=="400"){
					$scope.disabledLR = 0;
					progress.reset();	
					$timeout(function(){
					toaster.clear();
					toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'Something wrong happened, please refresh the page...</li></ul>', 5000, 'trustedHtml');
					},3)
				}
				else if(result=="408"){
					$scope.disabledLR = 0;
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
					$scope.disabledLR = 0;
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
	
	
	
	$scope.default_UserToLike = function(userid, schoolid){
	
			
		if(userid!=""){
			
			Default_UserToLike.default_UserToLike(userid, schoolid).then(function(result){
				if(result=="true"){
					
					$scope.lr = true;
					$scope.l = false;
				}
				else if(result=="false"){
					
					$scope.lr = false;
					$scope.l = true;
				}
			})
		}		
		else if(userid==""){
			$scope.lr = false;
			$scope.l = true;
		}
		
	}
	
	
	
}])