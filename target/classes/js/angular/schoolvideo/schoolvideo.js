angular.module("ngEdjab.schoolvideo", [])

.config(function($sceDelegateProvider) {
	   $sceDelegateProvider.resourceUrlWhitelist([
	     'self',
	     '*://www.youtube.com/**'
	   ]);
	 })
	 
	 
	 
.service("CreateHelpfulVideo", ['$q', '$http', 'GetContextPath',
                                 function($q, $http, GetContextPath){
	
	this.createHelpfulVideo = function(videoid, videourl){
		
		var deferred = $q.defer();
		
		
		$http.post(GetContextPath.getContextPath()+'/createHelpfulVideo/?videoid='+videoid+"&videourl="+videourl).then(function(resp) {
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
	 
	 

.controller("SchoolVideoController", ['$scope', '$http', '$q', 'toaster', '$timeout', 'ngProgressFactory', 'CreateHelpfulVideo', '$window', 'GetContextPath',
                                      function($scope, $http, $q, toaster, $timeout, ngProgressFactory, CreateHelpfulVideo, $window, GetContextPath){
	
	var videos = new Set();
	
	$scope.limitVideoTo = 4;
	$scope.loadMoreVideoLadda = false;
	
	var progress = ngProgressFactory.createInstance();
	progress.setColor('red');
	
	$scope.disableVid = 0;
	
	$scope.helpfulVideo = function(video, n){
		
		//video.disableHelpfulVideo = true;
		
		if($scope.disableVid == 0){
			$scope.disableVid = 1;
			progress.start();
			CreateHelpfulVideo.createHelpfulVideo(video.videoId, video.videoUrl).then(function(result){
				if(result=="200"){
					$scope.disableVid = 0;
					video.disableHelpfulVideo = true;
					progress.complete();	
					$timeout(function(){
						toaster.clear();
						toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
								'Video is helpful to you...</li></ul>', 5000, 'trustedHtml');
						},3)
									
				}
				else if(result=="400"){
					$scope.disableVid = 0;
					video.disableHelpfulVideo = false;
					progress.reset();	
					$timeout(function(){
					toaster.clear();
					toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'Something wrong happened, please refresh the page...</li></ul>', 5000, 'trustedHtml');
					},3)
				}
				else if(result=="408"){
					$scope.disableVid = 0;
					video.disableHelpfulVideo = false;
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
					$scope.disableVid = 0;
					video.disableHelpfulVideo = false;
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

	
	$scope.videosToSchool = [];
	
	var getVideoToSchool = function(schoolId){
	
	var deferred = $q.defer();
	
	 $http.post(GetContextPath.getContextPath()+'/GetUploadedVideo/?uploadedTo='+schoolId).then(function(resp) {
		 
			angular.forEach(resp.data,function(value, key){
			
				var videoId = value.videoId;
				var videoUrl = value.videoUrl;
				var uploadedBy = value.uploadedBy;
				var helpfulVotes = value.helpfulVotes;
								
			videos.add({'videoId':videoId,'videoUrl':videoUrl, 'uploadedBy':uploadedBy, 'disableHelpfulVideo':'false',
				'helpfulVotes':helpfulVotes});
				
			
			})
		 
		 	
		 		
			deferred.resolve(Array.from(videos));
			 
	  }, function(resp) {
		  
		toaster.clear();
		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Unable to retrieve photos...</li></ul>', 5000, 'trustedHtml');
		
	
	  })
	
	  return deferred.promise;
	}
	
	$scope.noSchoolVideos = true;
	
	$scope.getSchoolVideos = function(id){
		getVideoToSchool(id).then(function(data){
			
			if(data.length!=0){
				$scope.noSchoolVideos = false;
			}
			else if(data.length==0){
				$scope.noSchoolVideos = true;
			}
			$scope.videosToSchool = data;
		});
	}
	
	$scope.loadMoreVideoClicked = function(limit){
		progress.start();
		$scope.loadMoreVideoLadda = true;
		$timeout(function(){
			$scope.loadMoreVideoLadda = false;
			progress.complete();
			$scope.limitVideoTo = limit + 4;
		},1500)
		
		
	}
	
}])