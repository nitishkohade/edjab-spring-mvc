angular.module("ngEdjab.schoolmap",[])

.factory("GeoLocation", ['$timeout', 'toaster',
                         function($timeout, toaster){
	
	function showPosition(position) {
		
		 $timeout(function(){
		 toaster.clear();
		 toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
   				'Computing Distance, Please wait...</li></ul>', 5000, 'trustedHtml');
		 }, 3);
		
		 getSource({lat:position.coords.latitude, lng:position.coords.longitude});  
	 }
	 function errorPosition(result){
			/*$timeout(function(){
				toaster.clear();
				toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
						'Unable to calculate distances, Please enable location from your browser... </li></ul>', 5000, 'trustedHtml');
								
			},3)*/
		 
		 var tryAPIGeolocation = function() {
				jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDDwQy6mkf3L1W5okNke4G8eJQUhE0qCds", function(success) {
					
					getSource({lat:success.location.lat, lng:success.location.lng}); 
					
				})
			 
			  .fail(function(err) {
				  
				  $timeout(function(){
						toaster.clear();
						toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
								'Unable to calculate distances, Please enable location from your browser... </li></ul>', 5000, 'trustedHtml');
										
					},3)
				  
			   /* alert("API Geolocation error! \n\n"+err);*/
			  });
			};
			
			
			tryAPIGeolocation();
		 
		 
			
		};

		function getGeoLocation(getSource){
			 if (navigator.geolocation) {
				 
		         navigator.geolocation.getCurrentPosition(function(position){
		        	 $timeout(function(){
		        		 toaster.clear();
		        		 toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
		           				'Computing Distance, Please wait...</li></ul>', 5000, 'trustedHtml');
		        		 }, 3);
		        		
		        		 getSource({lat:position.coords.latitude, lng:position.coords.longitude});  
		         }, errorPosition, {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true});
			 } 
			 
			
		}
	
	
	 
	 return {
		 getGeoLoc:getGeoLocation
	 }
	 
	
}])


.factory("SchoolDirection",['$timeout', 'toaster', 'GeoLocation', 
                            function($timeout, toaster, GeoLocation){
	
	
	
	var getSchoolDirection =  function(lat, long){
		 
		 var source;
		 
		 function getDirection(source) {
			 	
		 	  
			   var destination = {lat: parseFloat(lat), lng: parseFloat(long)};
			   
			   

			   var map = new google.maps.Map(document.getElementById('school_map'), {
			     center: source,
			     scrollwheel: true,
			     zoom: 7
			   });
			   
			  

			   var directionsDisplay = new google.maps.DirectionsRenderer({
			     map: map
			   });

			   // Set destination, origin and travel mode.
			   var request = {
			     destination: destination,
			     origin: source,
			     travelMode: google.maps.TravelMode.DRIVING
			   };

			   // Pass the directions request to the directions service.
			   var directionsService = new google.maps.DirectionsService();
			   directionsService.route(request, function(response, status) {
			     if (status == google.maps.DirectionsStatus.OK) {
			       // Display the route on the map.
			    	 $timeout(function(){
			    		 toaster.clear();
			    	 },3)
			    	 
			       directionsDisplay.setDirections(response);
			     }
			   });
			 }
		 
		 GeoLocation.getGeoLoc(function(result){
			 getDirection(result);
		 });

	 }
	
	
	
	
	return {
		direction:getSchoolDirection
	}
	
}])



.factory("DefaultSchoolView",['$timeout', 'toaster', 'GetContextPath',
                            function($timeout, toaster, GetContextPath){
	
	function defaultView(lat, long, radius, name){ 
		
		var marker;
		
		  var map = new google.maps.Map(document.getElementById('school_map'), {
		    zoom: 5,
		    center: {lat: parseFloat(lat), lng: parseFloat(long)}
		  });

		  		  
		  var infowindow = new google.maps.InfoWindow({
			    		
	    		content:'<div class="pull-left"><div class="pull-left"><i class="pull-left fa fa-university fa-2x" aria-hidden="true"></i></div>'+
						  '<div style="color:orange;font-size:16px;" class="pull-right"><strong>'+name+'</strong></div></div>'
			  });
		  
		  marker = new google.maps.Marker({
			icon: GetContextPath.getContextPath()+"/img/map_marker/user_location_marker_1.png",
		    map: map,		    
		    animation: google.maps.Animation.DROP,
		    position: {lat: parseFloat(lat), lng: parseFloat(long)}
		  });
		  marker.addListener('click', toggleBounce);
		

		function toggleBounce() {
			infowindow.open(map, marker);
		   /* marker.setAnimation(google.maps.Animation.BOUNCE);*/
		  
		}
	
			
		}
	
	
	
	
	
	return {
		initView:defaultView
	}
	
}])




.factory("NearbySchool",['$timeout', 'toaster', 'GetContextPath',
                            function($timeout, toaster, GetContextPath){
	
	function getNearby(lat, long, near, radius){ 
		
		var zoom = 13;
		
		if(near=='init'){
			var zoom = 4;
		}
		
		else if(near==null){
			var zoom = 4;
			$timeout(function(){
			toaster.clear();
			toaster.pop('success', "", '<ul class=\'list-inline\'><listyle="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
  				'Please select nearby...</li></ul>', 5000, 'trustedHtml');
			}, 3);
			}
			
		
		
		 var pyrmont = new google.maps.LatLng(parseFloat(lat), parseFloat(long));

		  map = new google.maps.Map(document.getElementById('school_map'), {
		    center: pyrmont,
		    zoom: zoom
		  });

		 
		  var request = {
		    location: pyrmont,
		    radius: parseInt(radius),
		    types: [near]
		  };
		  
		   
		  infowindow = new google.maps.InfoWindow();
		  var service = new google.maps.places.PlacesService(map);
		  service.nearbySearch(request, callback);
		  
		  
		  
		  function callback(results, status) {
			  if (status == google.maps.places.PlacesServiceStatus.OK) {
			    for (var i = 0; i < results.length; i++) {
			      createMarker(results[i]);
			    }
			  }
			}

			function createMarker(place) {
			  var placeLoc = place.geometry.location;
			  var marker = new google.maps.Marker({
				  icon: GetContextPath.getContextPath()+"/img/map_marker/nearby_school_marker_1.png",
			    map: map,
			    position: place.geometry.location
			  });

			  google.maps.event.addListener(marker, 'click', function() {
				  infowindow.setContent('<div class="pull-left"><div class="pull-left"><img src="'+place.icon+'" height="40" width="40"/></div>'+
						  '<div style="color:orange;font-size:16px;" class="pull-right"><strong>'+place.name+'</strong><br>'+
						  '<strong>'+place.vicinity+'</strong></div></div>');
			    infowindow.open(map, this);
			  });
			}

			google.maps.event.addDomListener(window, 'load', this);
			
		}
	
	
	
	
	
	return {
		nearby:getNearby
	}
	
}])



.controller("SchoolMapController", ['$scope', '$timeout', 'toaster', 'SchoolDirection', 'NearbySchool', 'DefaultSchoolView',
                                    function($scope, $timeout, toaster, SchoolDirection, NearbySchool, DefaultSchoolView){

	
	var dragToPos = function(){
		 $timeout(function(){
				
			 $('html,body').animate({
			        scrollTop: $("#map_area").offset().top - 50},
			        'slow');
			
			 
		 },2)
	}
	
	
	
	$scope.nearbycontent = null;
	$scope.radiuscontent = 1;
	$scope.oldnearbycontent = null;	
		
	var radius = 1000;
	var nearStructure = null;
	var latitude = null;
	var longitude = null;
	
	$scope.initMap = function(lat, long, schoolname){
		latitude = lat;
		longitude = long;
		DefaultSchoolView.initView(latitude, longitude, 5, schoolname);
	}
	
	 $scope.getSchoolDirection = function(lat, long){
		 
		 dragToPos();
		 
		 $scope.nearbycontent = null;
		 latitude = lat;
		 longitude = long;
		 SchoolDirection.direction(lat, long);
	 } 
	 
	 
	 $scope.radius = function(rad){
		 
		 dragToPos();
		 
		 $scope.nearbycontent = $scope.oldnearbycontent;
		 $scope.radiuscontent = rad/1000;
		 radius = rad;
		 if(latitude != null){
		 NearbySchool.nearby(latitude, longitude, nearStructure, radius);
		 }
		 else if(latitude == null){
			 NearbySchool.nearby(latitude, longitude, nearStructure, 1);
		 }
	 }
	 
	 $scope.NearbySchool = function(lat, long, nearbyArea){
		 
		 dragToPos();
		 
		 m = nearbyArea[0].toUpperCase() + nearbyArea.slice(1);
		 $scope.nearbycontent = m.replace("_"," ")
		 $scope.oldnearbycontent = $scope.nearbycontent;
		 latitude = lat;
		 longitude = long;
		 nearStructure = nearbyArea;
		 NearbySchool.nearby(lat, long, nearbyArea, radius);
	 }
	
}])
