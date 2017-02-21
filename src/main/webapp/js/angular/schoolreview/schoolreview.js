angular.module("ngEdjab.schoolreview", [])

.service("CreateHelpfulReview", ['$q', '$http', 'GetContextPath',
                                 function($q, $http, GetContextPath){
	
	this.createHelpfulReview = function(reviewid){
		
		var deferred = $q.defer();
		
		
		$http.post(GetContextPath.getContextPath()+'/createHelpfulReview/?reviewid='+reviewid).then(function(resp) {
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


.factory("SchoolReviewContent", ['$q', '$http', 'GetContextPath',
                                 function($q, $http, GetContextPath){
	
	
	
	var reviews = new Set();
	
	
	
	var getReviewContent = function(id, callBack){
		
		
		var deferred = $q.defer();
		
		 $http.post(GetContextPath.getContextPath()+'/GetReviewPerSchoolId/?reviewedTo='+id).then(function(resp) {
			 	
				angular.forEach(resp.data,function(value, key){
				
					var reviewId = value.reviewId;
					var reviewBody = value.reviewBody;
					var reviewedBy = value.reviewedBy;
					var userReviewed = value.reviewedBy;
					
					if(reviewedBy.includes("@")){
						
						reviewedBy = reviewedBy.split("@")[0];
						
					}
					else {
						
						reviewedBy = "Anonymous";
						
					}
					
					
					
					
					var reviewedOn = value.reviewedOn;
						/*var year = reviewedOn.year;
						var month = reviewedOn.monthOfYear;
						var day = reviewedOn.dayOfMonth;
						var dayOfYear = reviewedOn.dayOfYear;
						
					var reviewedOn = month+" "+day+", "+year;
									    
					var now = new Date();
					var start = new Date(now.getFullYear(), 0, 0);
					var diff = now - start;
					var oneDay = 1000 * 60 * 60 * 24;
					var day = Math.floor(diff / oneDay);
					
					var daysAgo = day - dayOfYear;*/
					
					
					
					var minMilli = 1000 * 60;
					var hrMilli = minMilli * 60;
					var dyMilli = hrMilli * 24;
					
					var years = dyMilli * 365;

					var parsedTodate = Date.parse(new Date());

					var total = Math.round(parsedTodate / dyMilli);

					var days_posted = Math.round(reviewedOn / dyMilli);

					var daysAgo = (total - days_posted);
					var reviewedOn = value.reviewedOn;
						
					var helpfulVotes = value.helpfulVotes;
					var ratedNumber = value.ratedNumber;
									
				reviews.add({'reviewId':reviewId, 'userReviewed':userReviewed, 'reviewBody':reviewBody,'reviewedBy':reviewedBy, 'helpfulVotes':helpfulVotes,
					'ratedNumber':ratedNumber, 'filtered':ratedNumber+"star", 'reviewedOn':reviewedOn, 'daysAgo':daysAgo, 'disableHelpfulReview':false});
					
				
				})
			 
			 	 callBack(Array.from(reviews));
			 		
				deferred.resolve(Array.from(reviews));
				 
		  }, function(resp) {
			  
			/*toaster.clear();
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
					'Unable to post your reviews...</li></ul>', 5000, 'trustedHtml');*/
			deferred.reject("false");
		
		  })
		
		  
		 
		  
		
		
	}
	
	
	return {
		reviewContent : getReviewContent
	}
	
}])

.controller("SchoolReviewController",['$scope', '$http', '$q', 'toaster', '$timeout', 'ngProgressFactory', 'SchoolReviewContent', '$window', 'CreateHelpfulReview', 'GetContextPath',
                                      function($scope, $http, $q, toaster, $timeout, ngProgressFactory, SchoolReviewContent, $window, CreateHelpfulReview, GetContextPath){
	
	
	//Accordion width with button
	
	
		/*$scope.reviewToSchool = function(id) {
			$timeout(function(){
				var x = document.getElementById(id);
			    if (x.className.indexOf("w3-show") == -1) {
			        x.className += " w3-show";
			    } else {
			        x.className = x.className.replace(" w3-show", "");
			    }
			},200)
		    
		}*/
	
	$scope.reviewToSchool = function(){
		
		$scope.widgetExpanded = !$scope.widgetExpanded;
	}
	
	var progress = ngProgressFactory.createInstance();
	progress.setColor('red');
	
	$scope.limitReviewTo = 2;
	$scope.loadMoreReviewLadda = false;
	
	$scope.loadMoreReviewClicked = function(limit){
		progress.start();
		$scope.loadMoreReviewLadda = true;
		$timeout(function(){
			$scope.loadMoreReviewLadda = false;
			progress.complete();
			$scope.limitReviewTo = limit + 2;
		},1500)
		
		
	}
	
	$scope.fieldTable = [{
	    field: "ALL Star",
	    	value: "ALL"	    
	  }, {
		  field: "5 Star",
		    value: 5
	  }, {
		  field: "4 Star",
		    value: 4
	  }, {
		  field: "3 Star",
		    value: 3
	  }, {
		  field: "2 Star",
		    value: 2
	  }, {
		  field: "1 Star",
		    value: 1
	  }];

	   $scope.selectedRating = $scope.fieldTable[0];
	
	
	$scope.ratingBy = function(){
		
		$scope.noOfdisplayedReviews = 0;
		
		if($scope.selectedRating.value!="ALL"){
			$scope.filterByRating = $scope.selectedRating.value+"star";
		}
		else if($scope.selectedRating.value=="ALL"){
			$scope.filterByRating = "star";
		}
		
	}
	
	$scope.noOfdisplayedReviews = 0;
	
	$scope.displayReviews = function(i){
		
		$scope.noOfdisplayedReviews = i;
		
	}
	
//$scope.orderBy = 'daysAgo';

	$scope.orderByDays_Recent = function(){
		$scope.orderBy = 'daysAgo';
	}
	
	$scope.orderByDays_Old = function(){
	$scope.orderBy = '-daysAgo';
	}
	
	
	$scope.schoolReviews = [];
	$scope.noReviewsMade = true;
	
	
	
	$scope.DisplayPositiveReviews = function(){
		
		
		$scope.fieldTable = [{
		    field: "ALL Star",
		    	value: "ALL"	    
		  }, {
			  field: "5 Star",
			    value: 5
		  }, {
			  field: "4 Star",
			    value: 4
		  }];
		
		 $scope.selectedRating = $scope.fieldTable[0];
		 
		 if($scope.selectedRating.value!="ALL"){
				$scope.filterByRating = $scope.selectedRating.value+"star";
			}
			else if($scope.selectedRating.value=="ALL"){
				$scope.filterByRating = "star";
			}
		
		 $scope.schoolReviews  = $scope.totalPositiveReviews;
		 $scope.totalReviews = $scope.totalPositiveReviews.length;
		 
		 $timeout(function(){
			 $('html,body').animate({
			        scrollTop: $("#reviewBodySection").offset().top - 140},
			        'slow');
			},200)
			
	}
	
	$scope.DisplayCriticalReviews = function(){
		
		$scope.fieldTable = [{
		    field: "ALL Star",
		    	value: "ALL"	    
		  }, {
			  field: "2 Star",
			    value: 2
		  }, {
			  field: "1 Star",
			    value: 1
		  }];
		
		 $scope.selectedRating = $scope.fieldTable[0];
		
		 if($scope.selectedRating.value!="ALL"){
				$scope.filterByRating = $scope.selectedRating.value+"star";
			}
			else if($scope.selectedRating.value=="ALL"){
				$scope.filterByRating = "star";
			}
		 
		$scope.schoolReviews  = $scope.totalCriticalReviews;
		$scope.totalReviews = $scope.totalCriticalReviews.length;
		
		
		
		
			$timeout(function(){
				 $('html,body').animate({
				        scrollTop: $("#reviewBodySection").offset().top - 140},
				        'slow');
				},200)
				
		
		
	}
	
	$scope.reviewImageLetter = function(user){
		
		
		$scope.reviewImageCharacter = user.charAt(0).toUpperCase();
		
		
	}
	
	$scope.schoolReviewContent = function(id){
		 SchoolReviewContent.reviewContent(id, function(result){
			 
			
			$scope.totalCriticalReviews = [];
			$scope.totalPositiveReviews = [];
				
			 var positive_len = 0;
			 var critical_len = 0;
			 
			 var len = result.length;
			for(i=0;len>i;i++){
				if(result[i].ratedNumber > 3){
					positive_len++;
					$scope.totalPositiveReviews.push(result[i]);
				}
				else if(result[i].ratedNumber < 3){
					critical_len++;
					$scope.totalCriticalReviews.push(result[i]);
				}
				
			}
			
			
			$scope.totalCriticalReviewsLength = critical_len;
			$scope.totalPositiveReviewsLength = positive_len;
			 
			 
			 
			$scope.totalReviews = result.length;
			 if(result.length!=0){
				 
				 $scope.noReviewsMade = false;
			 }
			 else if(result.length==0){
				 				 
				 $scope.noReviewsMade = true;
			 }
			 $scope.schoolReviews = result;
		});
		
	}
	
	// keep it for future use
	/*$scope.helpfulReview = function(review, n){
		
		if(review.oldHelpfulVotes == review.helpfulVotes){
			
			review.helpfulVotes = review.helpfulVotes + 1;
			
		}
		else if(review.oldHelpfulVotes == review.helpfulVotes - 1){
		
			review.helpfulVotes = review.helpfulVotes - 1;
		}
		
	}*/
	
	var disableRev = 0;
	
		$scope.helpfulReview = function(review, n){
			if(disableRev == 0){
			disableRev = 1;
			progress.start();
			CreateHelpfulReview.createHelpfulReview(review.reviewId).then(function(result){
				if(result=="200"){
					disableRev = 0;
					review.disableHelpfulReview = true;
					progress.complete();	
					$timeout(function(){
						toaster.clear();
						toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
								'Review is helpful to you...</li></ul>', 5000, 'trustedHtml');
						},3)
									
				}
				else if(result=="400"){
					disableRev = 0;
					review.disableHelpfulReview = false;
					progress.reset();	
					$timeout(function(){
					toaster.clear();
			/*		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'Something wrong happened, please refresh the page...</li></ul>', 5000, 'trustedHtml');*/
					toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'You can\'t provide more than once... </li></ul>', 5000, 'trustedHtml');
					},3)
				}
				else if(result=="408"){
					disableRev = 0;
					review.disableHelpfulReview = false;
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
					disableRev = 0;
					review.disableHelpfulReview = false;
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
	
	
	
	
	$scope.reviewText = null;
	$scope.schoolStarRating = 0;
	$scope.reviewTextError = false;
	$scope.submitReview = false;
	$scope.disableCancel = false;
		

	var postSchoolReview = function(star, text, schoolId){
	
	var deferred = $q.defer();
	
	var input = {
				"reviewBody":text,
				"reviewedTo":schoolId,
				"ratedNumber":star
				}
	
	 $http.post(GetContextPath.getContextPath()+'/createReviewService', input).then(function(resp) {
		 					
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
		  
		toaster.clear();
		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Unable to post your reviews...</li></ul>', 5000, 'trustedHtml');
		deferred.reject("false");
	
	  })
	
	  return deferred.promise;
	}
	
	
	
	
	$scope.saveSchoolReview = function(star, text, schoolId){
		
		if(star==0 && text==null){
			
			$scope.reviewTextError = true;
			$timeout(function(){
				toaster.clear();
				toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'Please input both fields before submitting...</li></ul>', 5000, 'trustedHtml');
			},2)
				
		}
		else if(star==0){
			$timeout(function(){
				toaster.clear();
				toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'Please provide rating before submitting...</li></ul>', 5000, 'trustedHtml');
			},2)
			
		}
		else if(text==null){
			$scope.reviewTextError = true;
			$timeout(function(){
			toaster.clear();
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
					'Please write some text before submitting...</li></ul>', 5000, 'trustedHtml');
			},2);
		}
		else if(star!=0 && text!=null){
			$scope.disableCancel = true;
			$scope.submitReview = true;
			//progress.reset();		
			
			progress.start();
			
			$scope.reviewTextError = false;
			toaster.clear();
			
			postSchoolReview(star, text, schoolId).then(function(data){
				if(data=="200"){
				$timeout(function(){
				toaster.clear();
				progress.complete();
				$scope.submitReview = false;
				$scope.disableCancel = false;
				toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'Your Review has been submitted...</li></ul>', 5000, 'trustedHtml');
				},2);
				}
				else if(data=="400"){
					$timeout(function(){
						toaster.clear();
						progress.reset();
						$scope.submitReview = false;
						$scope.disableCancel = false;
						toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
								'You can review only once. <br/> Please head towards settings to edit your reviews... </li></ul>', 10000, 'trustedHtml');
						},2);
				}
				else if(data=="408"){
					$timeout(function(){
						toaster.clear();
						progress.reset();
						$scope.submitReview = false;
						$scope.disableCancel = false;
						toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
								'You cannot submit your reviews. Please Login first...</li></ul>', 5000, 'trustedHtml');
						},2);
					
					$timeout(function(){
						$window.location.href = "../login";
					},3000)
				}
				else if(data=="500"){
					$timeout(function(){
						toaster.clear();
						progress.complete();
						$scope.submitReview = false;
						$scope.disableCancel = false;
						toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
								'Server error occurred...</li></ul>', 5000, 'trustedHtml');
						},2);
				}
			});
			
		}
		
	}
	
	
	
	
	
}])