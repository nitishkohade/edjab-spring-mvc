angular.module('ngEdjab.nearbyschool',[])

.service('weatherServiceNearby',['$resource', function($resource){
    
    this.getWeather = function(city){
        
        var weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=be413494af8fe814faa52d2a1e7bdedf",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});
        
        return weatherResult = weatherApi.get({q: city, cnt:1});
    }
    
}])


.factory('userAddress', ['$http', '$rootScope', function($http, $rootScope){
	
	function getUserAddress(lat, lng){
		
		$rootScope.userAddress = "";
		
	$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+","+lng).success(function(data){
		
		$rootScope.userAddress = data.results[1].formatted_address;
		$rootScope.userCityName = data.results[1].address_components[3].long_name;
		
	})
	
	
	}
	
	
	return {
		getUserAddress : getUserAddress
	}
	
}])



.factory('getMarkerInfo', ['$rootScope', '$timeout', '$compile', 'userAddress', 'GetContextPath',
                           function($rootScope, $timeout, $compile, userMarkerAddress, GetContextPath){
	
	
	
	
	
	function showUserMarkerInfo(scope, list, marker, map){
		
			
		
			var boxText = document.createElement("div");
	         boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background: white; padding: 5px;";
	         boxText.innerHTML = '<a style="text-decoration:none;" href="#"><p class="bg-success text-center"'+ 
	       	  'style="text-align: center;background:orange;color:white;font-size:20px; font-variant: small-caps;font-family: Times New Roman, Times, serif;">'+
	   			 	'Your current Location</p></a><p style="text-align: center;background:white;color:orange;font-size:20px; font-variant: small-caps;font-family: Times New Roman, Times, serif;">'+
	   			 	$rootScope.userAddress+'</p>';
		
         
         var myOptions = {
       			
       			boxStyle: { 
       			  background: "url('tipbox.gif') no-repeat"
       			  ,opacity: 0.85
       			  ,width: "300px"
       			 }
       			,closeBoxMargin: "8px 8px 8px 8px"
       			,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
       			,infoBoxClearance: new google.maps.Size(1, 1)
       			,isHidden: false
       			,pane: "floatPane"
       			,enableEventPropagation: false
       		};

         				         
         //var infowindow = new google.maps.InfoWindow();
         var infobox = new InfoBox(myOptions);

         var contentString = '<div style="background:#3CAAE9;height:120px">'+
       	  '<button class="btn btn-default" ng-click="test()">check id</button>'+
       	  '<label for="input-2" class="control-label">Rate This</label>'+
       	  '<input id="input-2" class="rating rating-loading" data-min="0" data-max="5" data-step="0.1"></div>';

         var compiled = $compile(boxText)(scope);
        
         
         google.maps.event.addListenerOnce(marker, 'position_changed', function() {
             map.setCenter(this.getPosition());
             map.fitBounds(this.getBounds());
         });

         
         navigator.geolocation.watchPosition(function(position) {
             var latitude = list.lat;
             var longitude = list.lng;
             var geolocpoint = new google.maps.LatLng(latitude, longitude);
             map.setCenter(geolocpoint);
         });

         google.maps.event.addListener(marker, 'geolocation_error', function(e) {
             alert('There was an error obtaining your position. Message: ' + e.message);
         });
         marker.setMap(map);
         
         
        google.maps.event.addListener(marker, 'click', (function(marker, scope, place) {
           return function(){
           	toggleBounce();
             scope.place = place;
             
             scope.isRatingValid = function(rating, buttonNumber){
         		
         		if(buttonNumber<=rating){
         			return true;
         		}
         		return false;
         	}
             scope.isRatingNotValid = function(rating, buttonNumber){
           		
           		if(buttonNumber<=rating){
           			return false;
           		}
           		return true;
           	}
                     
             scope.$apply();
             infobox.setContent(compiled[0]);
             infobox.open(map, marker);
             $timeout(toggleBounce, 3000);
           };
         })(marker, scope, list));
         
         
         function toggleBounce () {
             if (marker.getAnimation() != null) {
                 marker.setAnimation(null);
             } else {
                 marker.setAnimation(google.maps.Animation.BOUNCE);
             }
         }
    }
	
	
	function showMarkerInfo(scope, list, marker, map){
    	var boxText = document.createElement("div");
         boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background: white; padding: 5px;";
         boxText.innerHTML = '<a style="text-decoration:none;" href='+GetContextPath.getContextPath()+'/SchoolName/?schoolId='+list.instituteId.replace(/ /g,"_")+'_'+list.cityState.replace(/ /g,"_")+'><p class="bg-success text-center"'+ 
       	  'style="text-align: center;background:#44ADEA;color:white;font-size:20px; font-variant: small-caps;font-family: Times New Roman, Times, serif;"'+
   			 '<b>'+list.instituteId+'</b><br><p style="color:black;font-size:13px;font-variant: small-caps;font-family: Times New Roman, Times, serif;">'+list.cityState+'</p></p>'+
   			 '<ul><li>'+		   						   			 
   			 '<div'+ 
   			 'id="main"'+
   			 	'ng-app="stars">'+
   			 	    '<div star-rating stars="5"'+ 
   			 	    'outer-star-selection="stars"'+ 
   			 	    'outer-percent="rating='+list.averageRating+'*20"'+ 
   			 	    'rating-define="percent"'+ 
   			 	    'rating-percent="100"'+ 
   			 	    'star-radius="14"'+ 
   			 	    'sel-color="gold"'+ 
   			 	    'back-color="white">'+
   			 	    '</div>'+
   			 '</div>'+			   			 
   			'</li></ul></a>';

         var myOptions = {
       			
       			boxStyle: { 
       			  background: "url('tipbox.gif') no-repeat"
       			  ,opacity: 0.85
       			  ,width: "300px"
       			 }
       			,closeBoxMargin: "8px 8px 8px 8px"
       			,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
       			,infoBoxClearance: new google.maps.Size(1, 1)
       			,isHidden: false
       			,pane: "floatPane"
       			,enableEventPropagation: false
       		};

         				         
         //var infowindow = new google.maps.InfoWindow();
         var infobox = new InfoBox(myOptions);

         var contentString = '<div style="background:#3CAAE9;height:120px">'+
       	  '<button class="btn btn-default" ng-click="test()">check id</button>'+
       	  '<label for="input-2" class="control-label">Rate This</label>'+
       	  '<input id="input-2" class="rating rating-loading" data-min="0" data-max="5" data-step="0.1"></div>';

         var compiled = $compile(boxText)(scope);
   
         
         google.maps.event.addListener(marker, 'click', (function(marker, scope, place) {
           return function(){
           	toggleBounce1();
             scope.place = place;
             
             scope.isRatingValid = function(rating, buttonNumber){
         		
         		if(buttonNumber<=rating){
         			return true;
         		}
         		return false;
         	}
             scope.isRatingNotValid = function(rating, buttonNumber){
           		
           		if(buttonNumber<=rating){
           			return false;
           		}
           		return true;
           	}
                     
             scope.$apply();
             infobox.setContent(compiled[0]);
             infobox.open(map, marker);
             $timeout(toggleBounce1, 3000);
           };
         })(marker, scope, list));
         
         
         function toggleBounce1 () {
             if (marker.getAnimation() != null) {
                 marker.setAnimation(null);
             } else {
                 marker.setAnimation(google.maps.Animation.BOUNCE);
             }
         }
    }
	
	return {
		nearbyMarkerInfo:showMarkerInfo,
		nearbyUserMarkerInfo:showUserMarkerInfo
	}
	
}])

.factory('CurrentLocation',['$rootScope', '$timeout', 'toaster', '$compile', 'getMarkerInfo', 'GetContextPath',
                            function($rootScope, $timeout, toaster, $compile, getMarkerInfo, GetContextPath){
	 
	 	var map;
		var source;
		function getCurrentLocation(scope, list){
		
			$('[data-toggle="confirmation"]').confirmation({
				popout:"true"
			});
			if (navigator.geolocation && scope.allowGeolocation) {
		       	      	  
		      	  map = new google.maps.Map(document.getElementById("frontMapView_nearby"),{
		  	      center: {lat:$rootScope.latitude, lng:$rootScope.longitude},
		  	      zoom: 5,
		  	      mapTypeId: google.maps.MapTypeId.ROADMAP
		  	    });
		      	  
			    var userMarker =  new google.maps.Marker({
				      	  	icon:GetContextPath.getContextPath()+"/img/map_marker/user_location_marker_1.png",
				      	  	animation: google.maps.Animation.DROP,
				            position: {lat:$rootScope.latitude, lng:$rootScope.longitude},
				            map: map
				        });
			    
			    var userMarkerCircle = new google.maps.Geocoder();
			    var latlng = new google.maps.LatLng($rootScope.latitude, $rootScope.longitude);
			    userMarkerCircle.geocode({
			        'latLng': latlng
			    }, function (results, status) {
			        if (status == google.maps.GeocoderStatus.OK) {
			            if (results[0]) {
			                // place your marker coding
			                map.setZoom(5);

			                // Define circle options
			                var circleOptions = {
			                    strokeColor: 'black',
			                    strokeOpacity: 0.8,
			                    strokeWeight: 2,
			                    fillColor: 'red',
			                    fillOpacity: 0.35,
			                    map: map,
			                    center: latlng,
			                    radius: 500
			                };
			                var markerCircle = new google.maps.Circle(circleOptions);
			            } else {
			            }
			        } else {
			        }
			    });   
			    
			   getMarkerInfo.nearbyUserMarkerInfo(scope, {lat:$rootScope.latitude, lng:$rootScope.longitude}, userMarker, map);
			    	 
			    	 for (i = 0; i < list.length; i++){
			    		if(list[i].range==scope.range && list[i].categoryId==scope.nearbyCategoryId){
			    		var marker = new google.maps.Marker({
						      	  icon:GetContextPath.getContextPath()+"/img/map_marker/nearby_school_marker_1.png",
						      	  	animation: google.maps.Animation.DROP,
						            position: {lat:list[i].latitude, lng:list[i].longitude},
						            map: map
						        }); 
			    		 
			    		getMarkerInfo.nearbyMarkerInfo(scope, list[i], marker, map);
				      		}
			    		
			    		if(i==list.length-1){
			    			 $timeout(function(){
					    		 toaster.clear();
					    		 if($rootScope.clickedFromTab == false){
								 $('html,body').animate({
								        scrollTop: $("#front_list_view").offset().top},
								        'slow');
					    		 }
								},2)
			    		}
				        }
		        
		    } else { 
		    
		    		var CookieToolkit = function( text, acceptText) {
		    			this.text = text;
		    			this.acceptText = acceptText;
		    			this.element = null;
		    			this.init();
		    		};
		    		CookieToolkit.prototype = {
		    			init: function() {
		    				this.create();
		    				this.load();
		    				this.actions();
		    			},
		    			load: function() {
		    					this._show();
		    			},
		    			actions: function() {
		    					self = this;
		    					document.querySelector( "#"+"geolocationRefused"+($rootScope.executeMultiplePopup++))	
		    					.addEventListener( "click", function( e ) {
		    						e.preventDefault();
		    						self._hide();
		    					}, false);
		    			},
		    			create: function() {
		    				var element = document.createElement( "div" );
		    				this.element = element;
		    				var html = "<div style='font-family: Times New Roman, Times, serif; font-family: Courier;font-variant: small-caps;font-size:16px;' id='cookie-toolkit-wrap'><div id='cookie-toolkit-text'>" + this.text + "</div>";
		    				element.id = "cookie-toolkit";
		    				html += "<div id='cookie-toolkit-btns'><button style='font-family: Times New Roman, Times, serif; font-family: Courier;font-variant: small-caps;font-size:16px;' type='button' id='geolocationRefused"+$rootScope.executeMultiplePopup+"'>" + this.acceptText + "</button>";
		    				html += "</div>";
		    				element.innerHTML = html;
		    				document.body.appendChild( element );
		    			},
		    			_show: function() {
		    				var self = this;
		    				self.element.style.display = "block";
		    				setTimeout(function() {
		    					self.element.className = "visible";
		    				}, 500);
		    			},
		    			_hide: function() {
		    				var self = this;
		    				self.element.className = "";
		    				setTimeout(function() {
		    					self.element.style.display = "none";
		    				}, 500);
		    			}
		    		};
		    			var toolkit = new CookieToolkit( "Geolocation is turned off from your side, which will cause you to use less number of features."+ 
		    	    			" In order to have better user experience, please allow to track your location", "Got it");
		    	
		    }
		}
		
	return {
		getUserLocation:getCurrentLocation
		}
}])

.factory('nearbyDataCache',function($cacheFactory){
	
	return $cacheFactory("cachedNearbyData");
	
})


.factory('nearbyCategoryRangeCache',function($cacheFactory){
	
	return $cacheFactory("cachedNearbyCategoryRange");
	
})

.factory('geolocationCache',function($cacheFactory){
	
	return $cacheFactory("cachedGeolocation");
	
})



.service("NearbyCategory",[function(){
	
	var category = undefined;
	
	this.setCategory = function(c){
		category = c;
	}
	
	this.getCategory = function(){
		return category;
	}
	
}])

.service("NearbyRange",[function(){
	
	var range = undefined;
	
	this.setRange = function(r){
		range = r
	}
	
	this.getRange = function(){
		return range;
	}
	
}])

.controller('NearbySchoolsController', ['$scope', '$timeout', '$rootScope', '$compile', '$window', '$q', '$http', 'CurrentLocation', 
                                        'nearbyDataCache', 'nearbyCategoryRangeCache', 'geolocationCache', 'toaster', 'userAddress', 
                                        'listViewCache', 'listViewIdCache', 'weatherServiceNearby', 'GetContextPath', 'FrontListViewNearbyHeaderInfo', 'FrontMapViewNearbyHeaderInfo', 'NearbyRange', 'NearbyCategory', 'OrderRating', 'localStorageService',
                                        function($scope, $timeout, $rootScope, $compile, $window, $q, $http, CurrentLocation, 
                                        		nearbyDataCache, nearbyCategoryRangeCache, geolocationCache, toaster, userAddress, 
                                        		listViewCache, listViewIdCache, weatherServiceNearby, GetContextPath, FrontListViewNearbyHeaderInfo, FrontMapViewNearbyHeaderInfo, NearbyRange, NearbyCategory, OrderRating, localStorageService){
	
	var geolocationLocalStorage = function(){
		if(localStorageService.isSupported) {
		localStorageService.set("popup", true);
  			$scope.popupPromptMessage = false;
		  }
		else if(localStorageService.cookie.isSupported) {
		localStorageService.set("popup", true);
		$scope.popupPromptMessage = false;
		  }
	}
	
	if(localStorageService.get("popup")!=undefined){
		$scope.popupPromptMessage = false;
	}
	
	
	
	$scope.getNearbyCategoryToDisplay = function(){
		return NearbyCategory.getCategory();
	}
	
	
	
	$scope.getListViewNearbyHeaderInfo = function(){
		var c = NearbyCategory.getCategory();
		var r = NearbyRange.getRange();
		$rootScope.listPerRangeHeaderInfo = FrontListViewNearbyHeaderInfo.headerInfo(c, r, OrderRating.getOrderByRating());
	}
	
	$scope.getMapViewNearbyHeaderInfo = function(){
		var c = NearbyCategory.getCategory();
		var r = NearbyRange.getRange();
		$rootScope.mapPerRangeHeaderInfo = FrontMapViewNearbyHeaderInfo.headerInfo(c, r);
	}
	
	
	$scope.getListViewNearbyHeaderInfo();
	$scope.getMapViewNearbyHeaderInfo();
	
	
	/*$('#nearbyViewDropdown').on('changed.bs.select', function (event, clickedIndex, newValue, oldValue) {
		$scope.clickNearbyCategory($('#nearbyViewDropdown').val());
		});*/
	
	
	 $scope.nearbyDropdownList = [
	         	                    "ALL", 
	         	                    "ENGINEERING", 
	         	                    "MEDICAL", 
	         	                    "ARCHITECTURE",
	         	                    "LAW"
	         	                    ];
	  
	  $scope.nearbyDropdown = function(d){
		  $scope.clickNearbyCategory(d);
	  }
	
	
	$rootScope.executeMultiplePopup = 0;
	//$rootScope.dummyRange = undefined;
	//$rootScope.dummyNearbyCategoryId = undefined;
	//$scope.geolocationConfirmed = false;
	
		/*$timeout(function(){
    		$("#geolocationconfirmed").trigger('mouseover');
    		$scope.$digest();
    	}, 100);*/
	$rootScope.topRatedNearbySchools = [];
	$scope.range = undefined;
	
	var object = new Object;
	//var userMap = new Map();
	
	$scope.nearbyLadda = true;
	$rootScope.clickedFromTab = false;
	
	//geolocationCache.put("cachedGeolocation", userMap);
	
	nearbyDataCache.put("cachedNearbyData",new Array());
	nearbyCategoryRangeCache.put('cachedNearbyCategoryRange', new Set());
	
	
    object.getTopRatedNearbySchools = function(categoryId, rangeId) {
		$scope.nearbySchools = [];
		var catId = categoryId;
		var range = rangeId;
		var moreSchools = new Set();
		if(catId == 'ALL' && range==undefined){
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
					'categoryId':'ALL', 'latitude':value.latitude, 'longitude':value.longitude, 'range':range, 
					"key":value.instituteId});
				})
				deferred.resolve(Array.from(moreSchools));
		  }, function(resp) {
	        		$rootScope.category_specific_clicked = false;
	        		toaster.clear();
	        		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
	    					'Connection error... Sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
			  })
		
		  return deferred.promise;
		}
		else if(catId != 'ALL' && catId != undefined && range==undefined){
			var deferred = $q.defer();
			 $http.post(GetContextPath.getContextPath()+'/GetSchoolPerCategory/?category='+catId)
			 .then(function(resp) {
					angular.forEach(resp.data,function(value, key){
					parts = value.instituteId.split('_');
					state = parts.pop();
					parts_new = parts.join('_');
					parts_new = parts_new.split('_');
					cityState = parts_new.pop()+" "+state;
					parts.pop();
					instituteId = parts.join(' ');
					moreSchools.add({'instituteId':instituteId,'cityState':cityState, 'averageRating':value.averageRating,
						'categoryId':catId, 'latitude':value.latitude, 'longitude':value.longitude, 'range':range, 
						"key":value.instituteId});
					})
					deferred.resolve(Array.from(moreSchools));
			  }, function(resp) {
	        		$rootScope.category_specific_clicked = false;
	        		toaster.clear();
	        		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
	    					'Connection error... Sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
			  })
			  return deferred.promise;
		}
		else if(catId == undefined && range!=undefined){
			var deferred = $q.defer();
			 $http.post(GetContextPath.getContextPath()+'/GetTopRatedNearBySchool/?radius='+$scope.range+'&userLatitude='+
					 $rootScope.latitude+'&userLongitude='+$rootScope.longitude)
			 .then(function(resp) {
					angular.forEach(resp.data,function(value, key){
					parts = value.instituteId.split('_');
					state = parts.pop();
					parts_new = parts.join('_');
					parts_new = parts_new.split('_');
					cityState = parts_new.pop()+" "+state;
					parts.pop();
					instituteId = parts.join(' ');
					moreSchools.add({'instituteId':instituteId,'cityState':cityState, 'averageRating':value.averageRating,
						'categoryId':catId, 'latitude':value.latitude, 'longitude':value.longitude, 'range':range, 
						"key":value.instituteId});
					})
					deferred.resolve(Array.from(moreSchools));
			  }, function(resp) {
	        		$rootScope.category_specific_clicked = false;
	        		toaster.clear();
	        		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
	    					'Connection error... Sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
			  })
			  return deferred.promise;
		}
		else if(catId != undefined && catId != 'ALL' && range!=undefined){		
			var deferred = $q.defer();
			 $http.post(GetContextPath.getContextPath()+'/GetNearBySchoolPerCategory/?radius='+$scope.range+'&userLatitude='+
					 $rootScope.latitude+'&userLongitude='+$rootScope.longitude+'&category='+catId)
			 .then(function(resp) {
					angular.forEach(resp.data,function(value, key){
					parts = value.instituteId.split('_');
					state = parts.pop();
					parts_new = parts.join('_');
					parts_new = parts_new.split('_');
					cityState = parts_new.pop()+" "+state;
					parts.pop();
					instituteId = parts.join(' ');
					moreSchools.add({'instituteId':instituteId,'cityState':cityState, 'averageRating':value.averageRating,
						'categoryId':catId, 'latitude':value.latitude, 'longitude':value.longitude, 'range':range, 
						"key":value.instituteId});
					})
					deferred.resolve(Array.from(moreSchools));
			  }, function(resp) {
	        		$rootScope.category_specific_clicked = false;
	        		toaster.clear();
	        		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
	    					'Connection error... Sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
			  })
			  return deferred.promise;
		}
		else if(catId == 'ALL' && range!=undefined){		
			var deferred = $q.defer();
			 $http.post(GetContextPath.getContextPath()+'/GetTopRatedNearBySchool/?radius='+$scope.range+'&userLatitude='+
					 $rootScope.latitude+'&userLongitude='+$rootScope.longitude)
			 .then(function(resp) {
					angular.forEach(resp.data,function(value, key){
					parts = value.instituteId.split('_');
					state = parts.pop();
					parts_new = parts.join('_');
					parts_new = parts_new.split('_');
					cityState = parts_new.pop()+" "+state;
					parts.pop();
					instituteId = parts.join(' ');
					moreSchools.add({'instituteId':instituteId,'cityState':cityState, 'averageRating':value.averageRating,
						'categoryId':'ALL', 'latitude':value.latitude, 'longitude':value.longitude, 'range':range, 
						"key":value.instituteId});
					})
					deferred.resolve(Array.from(moreSchools));
			  }, function(resp) {
	        		$rootScope.category_specific_clicked = false;
	        		toaster.clear();
	        		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
	    					'Connection error... Sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
			  })
			  return deferred.promise;
		}
		else if(catId == undefined && range==undefined){

			$rootScope.listPerRangeHeaderInfo = "Nothing to populate as per your request, Please input some fields";
			$rootScope.mapPerRangeHeaderInfo = "Nothing to populate as per your request, Please input some fields";

			
        		
			$timeout(function(){
				$rootScope.category_specific_clicked = false;
				toaster.clear();
				toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'Nothing to populate as per your request, Please input some fields...</li></ul>', 5000, 'trustedHtml');
			},5)
		}
	  }
	
    $scope.clickNearbyCategory = function(nearbyCategoryId){	  
    	
    	//$scope.geolocationConfirmed = true;
		$scope.nearbyCategoryId = nearbyCategoryId;
		//$rootScope.dummyNearbyCategoryId = nearbyCategoryId;
		NearbyCategory.setCategory(nearbyCategoryId);
		/*$scope.getListViewNearbyHeaderInfo();
		$scope.getMapViewNearbyHeaderInfo*/
    }

    $scope.$watch('range', function(){
    	
    	//$scope.geolocationConfirmed = true;
    	//$rootScope.dummyRange = $scope.range;
    	NearbyRange.setRange($scope.range);
    	/*$scope.getListViewNearbyHeaderInfo();
    	$scope.getMapViewNearbyHeaderInfo*/
    })
    
	$scope.confirmGeolocation = function(){
		
    	var callOnSuccess = function(){
    		
    		geolocationLocalStorage();
    		userAddress.getUserAddress($rootScope.latitude, $rootScope.longitude);
        	
        	toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
    				'Please wait while the app is populating your request...</li></ul>', 5000, 'trustedHtml');
                	
        	       	
        	$('[data-toggle="confirmation"]').confirmation('destroy');        	
    		$("#geolocationconfirmed").removeAttr("data-toggle");
        	
        	
        	if($scope.nearbyCategoryId == "ALL" && $scope.range!=undefined){
        		$rootScope.category_specific_clicked = false;
        		toaster.clear();
        	}
		 		  		  
		  		 if($scope.nearbyCategoryId == "ALL"){	
		  			 
		  			object.getTopRatedNearbySchools($scope.nearbyCategoryId, $scope.range).then(function(data){
		  				
		  				if(data.length==0){
		  					$timeout(function(){
		  						toaster.clear();
		  						toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
		  								'Zero Colleges appear under this range...</li></ul>', 5000, 'trustedHtml');
		  					},3)
		  				}
		  				
		  				$scope.nearbySchools = data;
		  			  $rootScope.topRatedNearbySchools =  $scope.nearbySchools;
		  			$rootScope.limitToNearby = 3;
		  			$rootScope.category_specific_clicked = false;
		  			
		  			$scope.getListViewNearbyHeaderInfo();
		  			$scope.getMapViewNearbyHeaderInfo();
		  			
		  			    });
		  			  	}
		  		 else{
		  			
		  			object.getTopRatedNearbySchools($scope.nearbyCategoryId, $scope.range).then(function(data){
		  				if(data.length==0){
		  					$timeout(function(){
		  						toaster.clear();
		  						toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
		  								'Zero Colleges appear under this range...</li></ul>', 5000, 'trustedHtml');
		  					},3)
		  				}
		  				
		  				 $scope.nearbySchools =  data;
		  		  	$rootScope.topRatedNearbySchools =  $scope.nearbySchools;
		  		  $rootScope.limitToNearby = 3;
		  		  $rootScope.category_specific_clicked = false;
		  		  
		  		$scope.getListViewNearbyHeaderInfo();
	  			$scope.getMapViewNearbyHeaderInfo();
		  		  
		  		  	    });
		  		 }
		  		 
		  		 
		  		
		  		 
    	}
    	
		navigator.geolocation.getCurrentPosition(function(position) {
        	$rootScope.longitude=position.coords.longitude;
        	$rootScope.latitude=position.coords.latitude;
        	
        	$timeout(function(){
        		callOnSuccess();
        	}, 20)
        	
		  	   
		}, function(error){
			
			 $timeout(function(){
					toaster.clear();
					toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'Geolocation is not supported for this Browser/OS version yet</li></ul>', 5000, 'trustedHtml');
					$rootScope.category_specific_clicked = false;
				},3)
			
		});
	}
	
	
$("#front_map_view").click(function(event){
	
	$timeout(function(){
			
			if($rootScope.nearbyLocationTab == true){
				
				if($rootScope.latitude==undefined){
					
				new google.maps.Map(document.getElementById("frontMapView_nearby"),{
			  	      center: new google.maps.LatLng(21, 78),
			  	      zoom: 5,
			  	      mapTypeId: google.maps.MapTypeId.ROADMAP
			  	    });			
				}
				else if($rootScope.latitude!=undefined){
										
				//$scope.nearbySchools = nearbyDataCache.get("cachedNearbyData");
				$scope.nearbySchools = $rootScope.topRatedNearbySchools
		  		$scope.allowGeolocation=true;
		  		$rootScope.clickedFromTab = true;
				CurrentLocation.getUserLocation($scope, $scope.nearbySchools);
				$rootScope.category_specific_clicked = false;
				}
			}
		},2)
})
	
	
$scope.geolocationconfirmed = function(){
	
	
	
	var callOnSuccess =  function(){
    	userAddress.getUserAddress($rootScope.latitude, $rootScope.longitude);
		
		$timeout(function(){
			toaster.clear();
		toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Please wait while the app is populating your request...</li></ul>', 5000, 'trustedHtml');
		$rootScope.category_specific_clicked = true;
		},3)
		if($scope.nearbyCategoryId == "ALL" && $scope.range!=undefined){
    		$rootScope.category_specific_clicked = false;
    		toaster.clear();
    	}
		  		 if($scope.nearbyCategoryId == "ALL"){	
		  			
		  			object.getTopRatedNearbySchools($scope.nearbyCategoryId, $scope.range).then(function(data){
		  				if(data.length==0){
		  					$timeout(function(){
		  						toaster.clear();
		  						toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
		  								'Zero Colleges appear under this range...</li></ul>', 5000, 'trustedHtml');
		  					},3)
		  				}
		  				
		  				 $scope.nearbySchools = data;
		  			    $rootScope.topRatedNearbySchools =  $scope.nearbySchools;
		  			  $rootScope.limitToNearby = 3;
		  			  $rootScope.category_specific_clicked = false;
		  			$scope.getListViewNearbyHeaderInfo();
		  			$scope.getMapViewNearbyHeaderInfo();
		  			    });
		  			  	}
		  		 else{
		  			
		  			object.getTopRatedNearbySchools($scope.nearbyCategoryId, $scope.range).then(function(data){
		  				if(data.length==0){
		  					$timeout(function(){
		  						toaster.clear();
		  						toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
		  								'Zero Colleges appear under this range...</li></ul>', 5000, 'trustedHtml');
		  					},3)
		  				}
		  				
  				 	$scope.nearbySchools = data;
	  		  	    $rootScope.topRatedNearbySchools =  $scope.nearbySchools;
	  		  	$rootScope.limitToNearby = 3;
		  		  	$rootScope.category_specific_clicked = false;
		  		  $scope.getListViewNearbyHeaderInfo();
		  			$scope.getMapViewNearbyHeaderInfo();
		  		  	    });
		  			
		  			  }	  		  
	}
	
	
	if($rootScope.longitude==undefined){
	navigator.geolocation.getCurrentPosition(function(position) {
		
		
		$rootScope.longitude=position.coords.longitude;
    	$rootScope.latitude=position.coords.latitude;
    	
    	$timeout(function(){
    		callOnSuccess();
    	}, 20)
    	
	}, function(error){
		
		 $timeout(function(){
				toaster.clear();
				toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'Geolocation is not supported for this Browser/OS version yet</li></ul>', 5000, 'trustedHtml');
				$rootScope.category_specific_clicked = false;
			},3)
		
	});
	}
	else{
		$timeout(function(){
    		callOnSuccess();
    	}, 20)
	}
	
	
}
	
	
	$scope.$watch('nearbySchools', function(newValue, oldValue){
		
		if(newValue!=undefined && newValue != ''){
			$rootScope.topRatedNearbySchools = $scope.nearbySchools;
			$rootScope.limitToNearby = 3;
		$scope.allowGeolocation=true;
		$rootScope.clickedFromTab = false;
		CurrentLocation.getUserLocation($scope, $scope.nearbySchools);	
		$rootScope.category_specific_clicked = false;
		}
	})
	
	
	
	
	$('[data-toggle="confirmation"]').confirmation({ 
		title:"The app is about to request access to your location information, " +
						"please read our privacy policy relating to how your location information " +
						"will be handled, processed and stored."+
						"Please confirm this as Yes or No...",
		btnOkLabel: '<i class="fa fa-check-circle"></i> Yes', 
		btnCancelLabel: '<i class="fa fa-times-circle"></i> No', 
		onConfirm:function(){
			$rootScope.category_specific_clicked = true;
			toaster.clear();
			$scope.confirmGeolocation();
			//$scope.getListViewNearbyHeaderInfo();
			//$rootScope.frontMapViewClicked();
			
			},
		onCancel:function(){	
			//$( "#front_map_view" ).trigger( "click" );
			$rootScope.category_specific_clicked = false;
			$scope.allowGeolocation=false;
			
			CurrentLocation.getUserLocation($scope, $scope.nearbySchools);
			
		},	
		trigger:"click",
		animation:"true",
		popout:"true"
	});
	
	
	
}])
