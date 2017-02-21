angular.module("ngEdjab.frontlistview", [])

.service("OrderRating",[function(){
	
	var rating;
	
	this.getOrderByRating = function(){
		return rating;
	}
	
	this.setOrderByRating = function(rate){
		rating = rate;
	}
}])

.factory("listViewCache",function($cacheFactory){
	
	return $cacheFactory("cachedListView");
})

.factory("listViewIdCache",function($cacheFactory){
	
	return $cacheFactory("cachedListViewId");
})

.controller("FrontListViewController", ['$scope', '$window', '$timeout', 'toaster', '$timeout', '$rootScope', '$q', '$http', 
                                        'listViewCache', 'listViewIdCache', 'geolocationCache', 'nearbyDataCache', 'nearbyCategoryRangeCache', 'GetContextPath', 'FrontListViewHeaderInfo', 'OrderRating', 'RefinedLocationId', 'FrontMapViewHeaderInfo', 'FrontListViewNearbyHeaderInfo', 'NearbyCategory', 'NearbyRange',
                                        function ($scope, $window, $timeout, toaster, $timeout, $rootScope, $q, $http, 
                                        listViewCache, listViewIdCache, geolocationCache, nearbyDataCache, nearbyCategoryRangeCache, GetContextPath, FrontListViewHeaderInfo, OrderRating, RefinedLocationId, FrontMapViewHeaderInfo, FrontListViewNearbyHeaderInfo, NearbyCategory, NearbyRange) {
	
	$rootScope.switchToSchool = function(key){
		$window.open(GetContextPath.getContextPath()+"/SchoolName/?schoolId="+key, "_self");
	}
	
	$scope.getListViewHeaderInfo = function(){
		var l = RefinedLocationId.getLocationId();
		$rootScope.listPerLocationHeaderInfo = FrontListViewHeaderInfo.headerInfo($scope.categoryId, l, $scope.orderRating);
	}
	
	$scope.getMapViewHeaderInfo = function(){
		var l = RefinedLocationId.getLocationId();
		$rootScope.mapPerLocationHeaderInfo = FrontMapViewHeaderInfo.headerInfo($scope.categoryId, l);
	}
	
	var popoverIncrement = 0;
	
	$("#specificlocationview").click(function(){
		$timeout(function(){
			 $('html,body').animate({
			        scrollTop: $("#front_list_view").offset().top},
			        'slow');
			},200)
			
	})
	
	listViewCache.put("cachedListView",new Array());
	listViewIdCache.put('cachedListViewId', new Set());
	
	$scope.limitTo = 3;
	$rootScope.limitToNearby = 3;
	
	$rootScope.topRatedSchools = [];
	
	$rootScope.locationId==undefined
	$scope.categoryId = undefined;
	
	$scope.isRatingValid = function(rating, buttonNumber){
		
				
		if(buttonNumber<=rating){
			
			return true;
		}
		
		return false;
		
	}
	
	$scope.isRatingNotValid = function(rating, buttonNumber){
		if(buttonNumber<=rating){
			return false;
		}
		return true;
	}
	
	$scope.orderRating = '-averageRating';
	$scope.orderRatingNearby = '-averageRating';
	OrderRating.setOrderByRating($scope.orderRating);
	
	// lowest rated  schools
	$scope.increasingListView = function(){
	
	 $scope.orderRating = '-averageRating';
	 OrderRating.setOrderByRating($scope.orderRating);
	 $scope.getListViewHeaderInfo();
	}
	
	$scope.increasingListViewNearby = function(){
		 $scope.orderRatingNearby = '-averageRating';
		 OrderRating.setOrderByRating($scope.orderRating);
		 var c = NearbyCategory.getCategory();
		var r = NearbyRange.getRange();
		 $rootScope.listPerRangeHeaderInfo = FrontListViewNearbyHeaderInfo.headerInfo(c, r, $scope.orderRatingNearby);
	}
	//highest rated schools
	$scope.decreasingListView = function(){	
		
		$scope.orderRating = 'averageRating';
		OrderRating.setOrderByRating($scope.orderRating);
		$scope.getListViewHeaderInfo();
	}
	
	$scope.decreasingListViewNearby = function(){	
		$scope.orderRatingNearby = 'averageRating';
		OrderRating.setOrderByRating($scope.orderRating);
		var c = NearbyCategory.getCategory();
		var r = NearbyRange.getRange();
		$rootScope.listPerRangeHeaderInfo = FrontListViewNearbyHeaderInfo.headerInfo(c, r, $scope.orderRatingNearby);
	}
	
	
	$scope.loadMoreListViewLadda = false;
	$scope.loadMoreListViewLaddaNearby = false;
	
		
	$scope.loadMoreListViewClicked = function(){
		
		$scope.loadMoreListViewLadda = true;
		
		$timeout(function(){
			$scope.limitTo = $scope.limitTo + 3;
			$scope.loadMoreListViewLadda = false;
			return $scope.limitTo;
		}, 2000)		
	}
	
	
	$scope.loadMoreListViewNearbyClicked = function(){
		
		$scope.loadMoreListViewLaddaNearby = true;
		
		$timeout(function(){
			$rootScope.limitToNearby = $rootScope.limitToNearby + 3;
			$scope.loadMoreListViewLaddaNearby = false;
			return $rootScope.limitToNearby;
		}, 2000)		
	}
	
	/*$scope.$watch('filterListView',function(newValue, oldValue){
		$scope.getMaxIndex = -1;
	})*/
	
	$scope.noOfdisplayedSchoolPerLocation = 0;
	$scope.noOfdisplayedSchoolPerRange = 0;
	$scope.gettingIndex = function(index){
		
		$scope.noOfdisplayedSchoolPerLocation = index + 1;
		//$scope.getMaxIndex = index;
	}
	
	$scope.gettingIndexNearby = function(index){
		$scope.noOfdisplayedSchoolPerRange = index + 1;
		//$scope.getMaxIndex = index;
	}
	
	$scope.filteringSchoolPerLocation = function(){
		$scope.noOfdisplayedSchoolPerLocation = 0;
	}
	
	$scope.filteringSchoolPerRange = function(){
		$scope.noOfdisplayedSchoolPerRange = 0;
	}
	
	$scope.noSuchSchool = function(){
			if($scope.noOfdisplayedSchoolPerLocation == 0){
				return true;
			}else if($scope.noOfdisplayedSchoolPerLocation !=0 ){
				return false;
			}
	}
	
	$scope.noSuchSchoolNearby = function(){
		
		if($scope.noOfdisplayedSchoolPerRange == 0){
			return true;
		}else if($scope.noOfdisplayedSchoolPerRange !=0 ){
			return false;
		}
	}
	
	$scope.threeColorOption = function(index){
		if(index%3==0){
			return 3;
		}
		else if(index%3==1){
			return 1;
		}
		else if(index%3==2){
			return 2
		}
	}
	
	
	$scope.totalSchoolPerlocation = function(){
 		return $rootScope.topRatedSchools.length;
	}
	
	$scope.totalSchoolPerRange = function(){
		return $rootScope.topRatedNearbySchools.length;
	}
	
	$scope.getTopRatedSchools = function(categoryId) {
		var moreSchools = new Set();
		
		$rootScope.topRatedSchools = [];
		var catId = categoryId;
		
		if(catId == undefined && $rootScope.locationId==undefined){
			var deferred = $q.defer();
		 $http.post(GetContextPath.getContextPath()+'/GetTopRatedSchools').then(function(resp) {
			    		 
				angular.forEach(resp.data,function(value, key){
				parts = value.instituteId.split('_');
				state = parts.pop();
				parts_new = parts.join('_');
				parts_new = parts_new.split('_');
				cityState = parts_new.pop()+" "+state;
				parts.pop();
				instituteId = parts.join(' ');
									
				moreSchools.add({'instituteId':instituteId,'cityState':cityState, 'averageRating':value.averageRating,
					'categoryId':'ALL', 'latitude':value.latitude, 'longitude':value.longitude, 
					'range':undefined, 'locationId':undefined, "key":value.instituteId});
				})
			 		
				deferred.resolve(Array.from(moreSchools));
				 
		  }, function(resp) {
			  
			  $rootScope.category_specific_clicked = false;
				$rootScope.location_specific_clicked = false;
	  		toaster.clear();
	  		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
					'Connection error... Sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
		  })
		
		  return deferred.promise;
		}
		
		else if(catId == "ALL" && $rootScope.locationId==undefined){
			var deferred = $q.defer();
		 $http.post(GetContextPath.getContextPath()+'/GetTopRatedSchools').then(function(resp) {
			    		 
				angular.forEach(resp.data,function(value, key){
				parts = value.instituteId.split('_');
				state = parts.pop();
				parts_new = parts.join('_');
				parts_new = parts_new.split('_');
				cityState = parts_new.pop()+" "+state;
				parts.pop();
				instituteId = parts.join(' ');
									
				moreSchools.add({'instituteId':instituteId,'cityState':cityState, 'averageRating':value.averageRating,
					'categoryId':'ALL', 'latitude':value.latitude, 'longitude':value.longitude, 
					'range':undefined, 'locationId':undefined, "key":value.instituteId});
				})
			 		
				deferred.resolve(Array.from(moreSchools));
				 
		  }, function(resp) {
			  
			  $rootScope.category_specific_clicked = false;
				$rootScope.location_specific_clicked = false;
	  		toaster.clear();
	  		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
					'Connection error... Sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
		  })
		
		  return deferred.promise;
		}
		
		else if(catId != undefined && catId != "ALL" && $rootScope.locationId==undefined){
			
			$timeout(function(){
				toaster.clear();
				toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'Please wait while the data is being populated...</li></ul>', 5000, 'trustedHtml');
				
			},5)
			var deferred = $q.defer();
			 $http.post(GetContextPath.getContextPath()+'/GetSchoolPerCategory/?category='+catId).then(function(resp) {

				 angular.forEach(resp.data,function(value, key){
						
					parts = value.instituteId.split('_');
					state = parts.pop();
					parts_new = parts.join('_');
					parts_new = parts_new.split('_');
					cityState = parts_new.pop()+" "+state;
					parts.pop();
					instituteId = parts.join(' ');
										
					moreSchools.add({'instituteId':instituteId, 'cityState':cityState, 'averageRating':value.averageRating,
						'categoryId':catId, 'latitude':value.latitude, 'longitude':value.longitude, 'range':undefined, 'locationId':undefined});
					
					})
				 		
					deferred.resolve(Array.from(moreSchools));
					 
			  }, function(resp) {
				  
				  $rootScope.category_specific_clicked = false;
					$rootScope.location_specific_clicked = false;
		  		toaster.clear();
		  		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'Connection error... Sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
				
		  	
			  })
			
			  return deferred.promise;
		}
		else if(catId != undefined && catId != "ALL" && $rootScope.locationId!=undefined){
			
			$timeout(function(){
				toaster.clear();
				toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'Please wait while the data is being populated...</li></ul>', 5000, 'trustedHtml');
				
			},5)
						
			var deferred = $q.defer();
			
		    $http.post(GetContextPath.getContextPath()+'/GetSchoolPerCategoryAndLocation/?location='+$rootScope.locationId+'&category='+catId)
		    		.then(function(result) {
		    
		    			
				angular.forEach(result.data,function(value, key){
					parts = value.instituteId.split('_');
					state = parts.pop();
					parts_new = parts.join('_');
					parts_new = parts_new.split('_');
					cityState = parts_new.pop()+" "+state;
					parts.pop();
					instituteId = parts.join(' ');
										
					moreSchools.add({'instituteId':instituteId, 'cityState':cityState, 'averageRating':value.averageRating,
						'categoryId':catId, 'latitude':value.latitude, 
						'longitude':value.longitude, 'locationId':$rootScope.locationId});
				
					})
				
				deferred.resolve(Array.from(moreSchools));
		  }, function(resp) {
			  
			  $rootScope.category_specific_clicked = false;
				$rootScope.location_specific_clicked = false;
	  		toaster.clear();
	  		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
					'Connection error... Sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
			
	  	
		  })
		     
		  return deferred.promise;
		}
		else if(catId == "ALL" && $rootScope.locationId!=undefined){
			
			$timeout(function(){
				toaster.clear();
				toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'Please wait while the data is being populated...</li></ul>', 5000, 'trustedHtml');
				
			},5)
						
			var deferred = $q.defer();
	    
	   		//$rootScope.mmm = moreschools;
			$http.post(GetContextPath.getContextPath()+'/SchoolPerCategoryId/?location='+$rootScope.locationId)
	    		.then(function(result) {
	    	    
			angular.forEach(result.data,function(value, key){
				parts = value.instituteId.split('_');
				state = parts.pop();
				parts_new = parts.join('_');
				parts_new = parts_new.split('_');
				cityState = parts_new.pop()+" "+state;
				parts.pop();
				instituteId = parts.join(' ');
				
													
				moreSchools.add({'instituteId':instituteId, 'cityState':cityState, 'averageRating':value.averageRating,
					'categoryId':'ALL', 'latitude':value.latitude, 
					'longitude':value.longitude, 'locationId':$rootScope.locationId});
		
				})
					
			deferred.resolve(Array.from(moreSchools));
			
	  }, function(resp) {
		  
		  $rootScope.category_specific_clicked = false;
			$rootScope.location_specific_clicked = false;
  		toaster.clear();
  		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Connection error... Sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
		
  	
	  })
	     
	  return deferred.promise;
	  }
		else{
			$rootScope.category_specific_clicked = false;
			$rootScope.location_specific_clicked = false;
			
			$timeout(function(){
				toaster.clear();
		  		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'Zero Schools found...</li></ul>', 5000, 'trustedHtml');
				
			},2)
			
		}
		
		
	  }
	
	
	if($scope.categoryId == undefined){
		$scope.getListViewHeaderInfo();
		$scope.getMapViewHeaderInfo();
	$scope.getTopRatedSchools($scope.categoryId).then(function(data){
		
	
		
	/*	nearbyCategoryRangeCache.put("cachedNearbyCategoryRange", 
				nearbyCategoryRangeCache.get("cachedNearbyCategoryRange")
				.add("ALL"+""+"undefined"));
	nearbyDataCache.put('cachedNearbyData', data.concat(nearbyDataCache.get('cachedNearbyData')));
		
		listViewIdCache.put('cachedListViewId',listViewIdCache.get('cachedListViewId').add("ALL"+""+"undefined"));
		listViewCache.put("cachedListView", data.concat(listViewCache.get("cachedListView")));				
		
		$rootScope.topRatedSchools = listViewCache.get("cachedListView");*/
		$rootScope.topRatedSchools = data;
		$scope.limitTo = 3;
		//$rootScope.dummySpecificLocationViewPopover=popoverIncrement++;
		$rootScope.category_specific_clicked = false;
		$rootScope.location_specific_clicked = false;
	})
	}
	
	
	
	
	$rootScope.$watch('selectedCategory',function(){
		
				
		$scope.getMaxIndex = -1;
		$scope.categoryId = $rootScope.selectedCategory;
		
  	
		if($scope.categoryId!=undefined && $rootScope.locationId==undefined){
			$scope.getListViewHeaderInfo();
			$scope.getMapViewHeaderInfo();
		$scope.getTopRatedSchools($scope.categoryId).then(function(data){
		
			$rootScope.topRatedSchools = data;
			$scope.limitTo = 3;
			$rootScope.location_specific_clicked = false;
			$rootScope.category_specific_clicked = false;
		})
		}
		else if($scope.categoryId!=undefined && $rootScope.locationId!=undefined){
			$scope.getListViewHeaderInfo();
			$scope.getMapViewHeaderInfo();
			$scope.getTopRatedSchools($scope.categoryId).then(function(data){
				$rootScope.location_specific_clicked = false;
				$rootScope.category_specific_clicked = false;
			
				$rootScope.topRatedSchools = data;
				$scope.limitTo = 3;
				
			})
			
		}
		
	})
	

	$(".listmapviewflip").hover(function(){
		  $(this).find(".wrapper").toggleClass("flipped");
		  return false;
		});
	
}])



	