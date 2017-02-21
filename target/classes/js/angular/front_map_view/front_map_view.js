angular.module("ngEdjab.frontmapview", [])

.controller('FrontMapViewController', ['$scope', 'toaster', 'MapViewFactory', '$rootScope', '$timeout', 'listViewIdCache', '$compile', '$window', '$q', 'GetContextPath',   
                                       function($scope, toaster, MapViewFactory, $rootScope, $timeout, listViewIdCache, $compile, $window, $q, GetContextPath){
	
	
	$("#front_map_view").click(function(){
		$timeout(function(){
			if($rootScope.nearbyLocationTab == false){
			MapViewFactory.initialize();
			for (i = 0; i < $rootScope.topRatedSchools.length; i++){
				if($rootScope.topRatedSchools[i].categoryId==$rootScope.selectedCategory &&
						$rootScope.topRatedSchools[i].locationId==$rootScope.locationId)
					MapViewFactory.showMarkers($scope, $rootScope.topRatedSchools[i]);
				else if($rootScope.selectedCategory==undefined && $rootScope.locationId==undefined)
					MapViewFactory.showMarkers($scope, $rootScope.topRatedSchools[i]);
		}}
		},2)
})

$rootScope.$watch('topRatedSchools',function(newValue, oldValue){
	
	if(newValue!=undefined){
		MapViewFactory.initialize();
		if($rootScope.locationId == undefined){
			for (i = 0; i < $rootScope.topRatedSchools.length; i++){
				if($rootScope.topRatedSchools[i].categoryId==$rootScope.selectedCategory){
					MapViewFactory.showMarkers($scope, $rootScope.topRatedSchools[i]);		
				}
				else if($rootScope.selectedCategory==undefined)
					MapViewFactory.showMarkers($scope, $rootScope.topRatedSchools[i]);

				if(i==$rootScope.topRatedSchools.length-1){
					
					$timeout(function(){
						toaster.clear();
						
					},5)
				}
			}
		}
		else{
			
			for (i = 0; i < $rootScope.topRatedSchools.length; i++){
				 
				if($rootScope.topRatedSchools[i].categoryId==$rootScope.selectedCategory && 
						$rootScope.topRatedSchools[i].locationId==$rootScope.locationId){
				MapViewFactory.showMarkers($scope, $rootScope.topRatedSchools[i]);		
					
				}
				if(i==$rootScope.topRatedSchools.length-1){
					
					$timeout(function(){
						toaster.clear();
						
					},5)
				}
			}
		}
	}
		
})
	
$rootScope.$watch('selectedCategory',function(newValue, oldValue){
	
	if(newValue!=undefined){
		
		
		MapViewFactory.initialize();
		
		if($rootScope.locationId == undefined){
				 
				for (i = 0; i < $rootScope.topRatedSchools.length; i++){
					 alert($rootScope.topRatedSchools[i].categoryId)
					if($rootScope.topRatedSchools[i].categoryId==$rootScope.selectedCategory)
						MapViewFactory.showMarkers($scope, $rootScope.topRatedSchools[i]);		
					
					if(i==$rootScope.topRatedSchools.length-1){
						
						$timeout(function(){
							toaster.clear();
							
						},5)
					}
				}
		}
		else{
					for (i = 0; i < $rootScope.topRatedSchools.length; i++){
						 
						if($rootScope.topRatedSchools[i].categoryId==$rootScope.selectedCategory && 
								$rootScope.topRatedSchools[i].locationId==$rootScope.locationId)
							MapViewFactory.showMarkers($scope, $rootScope.topRatedSchools[i]);		
						
						if(i==$rootScope.topRatedSchools.length-1){
							
							$timeout(function(){
								toaster.clear();
								
							},5)
						}
					}
					
		}
		
	}
	
})
}])


.factory('MapViewFactory', ['$compile', '$timeout', 'GetContextPath', 
                            function($compile, $timeout, GetContextPath){
  var map;
  
  function getMap() {
    return map;
  }
    
  function initialize() {
    
    map = new google.maps.Map(document.getElementById("frontMapView"),{
      center: new google.maps.LatLng(21, 78),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
);
  }
  

  function showMarkers(scope, list) {
	  	 
      var position = new google.maps.LatLng(
        list.latitude,
        list.longitude);

      var marker = new google.maps.Marker({
    	  icon:GetContextPath.getContextPath()+"/img/map_marker/specific_location_marker_1.png",
          animation: google.maps.Animation.DROP,
          position: position,
          map: map
      });
      
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
  

  return {
    getMap: getMap,
    initialize: initialize,
    showMarkers: showMarkers
  };

}]);
