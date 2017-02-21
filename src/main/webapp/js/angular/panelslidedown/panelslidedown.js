angular.module('ngEdjab.panelslidedown',[])

.controller('PanelSlideDownController',['$scope', '$timeout', '$rootScope', 
                                        function($scope, $timeout, $rootScope){
	
	$rootScope.frontMapView = true;
	$rootScope.frontListView = false;
	
	
	$rootScope.frontListViewClicked = function(){
		$timeout(function(){
			$rootScope.frontMapView = false;
			$rootScope.frontListView = true;
		},200)
		
	}
	$rootScope.frontMapViewClicked = function(){
		$timeout(function(){
			$rootScope.frontMapView = true;
			$rootScope.frontListView = false;
		},200)
		
	}
	
	$rootScope.specificLocationTab = true;
	$rootScope.nearbyLocationTab = false;
	
	$scope.searchByLocationExpanded = false;
	$scope.searchByNearbyExpanded = false;
	
	
	var i = 0;
	var j = 0;
	
	var schoolSearchSlider = function(){
		
		
		if(i==0){			
		//$timeout(function(){
			i=1;			
			$scope.searchByLocationExpanded = true;
		//},2)
		}
		else if(i==1){
			//$timeout(function(){
				i=0;
				$scope.searchByLocationExpanded = false;
			//},2)
			}
		
		j=0;
		$scope.searchByNearbyExpanded = false;
		
		
	}
	
	var schoolSearchSliderNearby = function(){
		
		
		if(j==0){
		//	$timeout(function(){
				j=1;
				$scope.searchByNearbyExpanded = true;
		//	},2000)
			}
		else if(j==1){
		//$timeout(function(){
			j=0;
			$scope.searchByNearbyExpanded = false;
		//},2)
		}
		
		i=0;
		$scope.searchByLocationExpanded = false;
		
	}
	
	
	var nearbyTabClicked = false;
	var locationTabClicked = false;
	
	$rootScope.specificLocationClicked = function(){
		
		schoolSearchSlider();
		if(locationTabClicked == false){
			locationTabClicked = true;
			nearbyTabClicked = false;
		
		$rootScope.specificLocationTab = true;
		$rootScope.nearbyLocationTab = false;
		
		$timeout(function(){
			$( "#front_map_view" ).trigger( "click" );
		}, 2000)
		}
	}
	
	var oneTimeLoad = new Set();
	
	$rootScope.nearbyLocationClicked = function(){
		
		schoolSearchSliderNearby();
		if(nearbyTabClicked == false){
			locationTabClicked = false;
			nearbyTabClicked = true;
		
		$rootScope.specificLocationTab = false;
		$rootScope.nearbyLocationTab = true;
		
		$timeout(function(){
			$( "#front_map_view" ).trigger( "click" );
		},2000)
		}
	}
	
	
	
}])