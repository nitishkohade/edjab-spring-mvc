angular.module("ngEdjab.schoolphoto", [])

.service("CreateHelpfulPhoto", ['$q', '$http', 'GetContextPath',
                                 function($q, $http, GetContextPath){
	
	this.createHelpfulPhoto = function(imageid, imageurl){
		
		var deferred = $q.defer();
		
		
		$http.post(GetContextPath.getContextPath()+'/createHelpfulImage/?imageid='+imageid+"&imageurl="+imageurl).then(function(resp) {
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


.controller("SchoolPhotoController", ['$scope', '$http', '$q', 'toaster', '$timeout', 'ngProgressFactory', 'CreateHelpfulPhoto', '$window', 'ImageStatusService', 'GetContextPath', 
                                      function($scope, $http, $q, toaster, $timeout, ngProgressFactory, CreateHelpfulPhoto, $window, ImageStatusService, GetContextPath){
	
	var images = [];
	
	var progress = ngProgressFactory.createInstance();
	progress.setColor('red');
	
	
	$scope.limitImageTo = 4;
	$scope.loadMoreImageLadda = false;
	
	$scope.imagesToSchool = [];
	
	var getImageToSchool = function(schoolId){
	
	var deferred = $q.defer(); 
	
	
	
	
	
	 $http.post(GetContextPath.getContextPath()+'/GetUploadedImage/?uploadedTo='+schoolId).then(function(resp) {
		 
		 angular.forEach(resp.data,function(value, key){
			 
			 ImageStatusService.getImageStatus(value.imageUrl, function(result){
					
					if(result == "success"){						
						
						var imageId = value.imageId;
						var imageUrl = value.imageUrl;
						var uploadedBy = value.uploadedBy;
						var helpfulVotes = value.helpfulVotes;	
						
						images.push({'imageId':imageId,'imageUrl':imageUrl, 'uploadedBy':uploadedBy, 'disableHelpfulPhoto':'false',
							'helpfulVotes':helpfulVotes});						
						deferred.resolve(images);
					}		
					
				})				
			
			})
		
 			
			
			 
	  }, function(resp) {
		  
		toaster.clear();
		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Unable to retrieve photos...</li></ul>', 5000, 'trustedHtml');
		
	
	  })
	
	  return deferred.promise;
	}
	
	$scope.noSchoolImages = true;
	
	$scope.getSchoolImages = function(id){
		getImageToSchool(id).then(function(data){
			
			if(data.length!=0){
				$scope.noSchoolImages = false;
			}
			else if(data.length==0){
				$scope.noSchoolImages = true;
			}
			$scope.imagesToSchool = data;
		});
	}
	
	
	
	
	
	$scope.disablePho = 0;
	
	$scope.helpfulPhoto = function(photo, n){
		
		//photo.disableHelpfulPhoto = true;
		if($scope.disablePho == 0){
			$scope.disablePho = 1;
			progress.start();
			CreateHelpfulPhoto.createHelpfulPhoto(photo.imageId, photo.imageUrl).then(function(result){
				if(result=="200"){
					$scope.disablePho = 0;
					photo.disableHelpfulPhoto = true;
					progress.complete();	
					$timeout(function(){
						toaster.clear();
						toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
								'Image is helpful to you...</li></ul>', 5000, 'trustedHtml');
						},3)
									
				}
				else if(result=="400"){
					$scope.disablePho = 0;
					photo.disableHelpfulPhoto = false;
					progress.reset();	
					$timeout(function(){
					toaster.clear();
					toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'Something wrong happened, please refresh the page...</li></ul>', 5000, 'trustedHtml');
					},3)
				}
				else if(result=="408"){
					$scope.disablePho = 0;
					photo.disableHelpfulPhoto = false;
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
					$scope.disablePho = 0;
					photo.disableHelpfulPhoto = false;
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
	
	
	$scope.loadMoreImageClicked = function(limit){
		
				
		progress.start();
		$scope.loadMoreImageLadda = true;
		$timeout(function(){
			$scope.loadMoreImageLadda = false;
			progress.complete();
			$scope.limitImageTo = limit + 4;
		},1500)
	}
	
	
	/*$scope.getLengthImagesToSchool = function(){
		return $scope.imagesToSchool.length();
	}*/
	
	
	
}])