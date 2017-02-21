angular.module('autocomplete', [])

.directive('autocomplete', function() {
  var index = -1;

  return {
    restrict: 'E',
    scope: {
      searchParam: '=ngModel',
      suggestions: '=data',
      onType: '=onType',
      onSelect: '=onSelect',
      autocompleteRequired: '='
    },
    controller: ['$scope', '$rootScope', '$window',
                 function($scope, $rootScope, $window){
      // the index of the suggestions that's currently selected
      $scope.selectedIndex = 0;

      $scope.initLock = true;

      // set new index
      $scope.setIndex = function(i){
        $scope.selectedIndex = parseInt(i);
      };

      this.setIndex = function(i){
        $scope.setIndex(i);
        $scope.$apply();
      };

      $scope.getIndex = function(i){
        return $scope.selectedIndex;
      };

      // watches if the parameter filter should be changed
      var watching = true;

      // autocompleting drop down on/off
      $scope.completing = false;

      // starts autocompleting on typing in something
      $scope.$watch('searchParam', function(newValue, oldValue){

        if (oldValue === newValue || (!oldValue && $scope.initLock)) {
          return;
        }

        if(watching && typeof $scope.searchParam !== 'undefined' && $scope.searchParam !== null
        		&& $scope.searchParam.length > 1) {
        	$rootScope.categoryId = $scope.searchParam;
        	$scope.completing = true;
          $scope.searchFilter = $scope.searchParam;
          $scope.selectedIndex = 0;
        }

        if($scope.searchParam.length<2)
        	$scope.completing = false;


        // function thats passed to on-type attribute gets executed
        if($scope.onType)
          $scope.onType($scope.searchParam);
      });

      // for hovering over suggestions
      this.preSelect = function(suggestion){

        watching = false;

        // this line determines if it is shown
        // in the input field before it's selected:
        //$scope.searchParam = suggestion;

        $scope.$apply();
        watching = true;

      };

      $scope.preSelect = this.preSelect;

      this.preSelectOff = function(){
        watching = false;
      };

      $scope.preSelectOff = this.preSelectOff;

      // selecting a suggestion with RIGHT ARROW or ENTER
      $scope.select = function(suggestion){
        if(suggestion){
        	var s = suggestion.replace(", "," ");
    		

          $scope.searchParam = s;
          $scope.searchFilter = suggestion;
          if($scope.onSelect)
            $scope.onSelect(suggestion);
        }
        watching = false;
        $scope.completing = false;
        setTimeout(function(){watching = true;},0);
        $scope.setIndex(-1);
      };


    }],
    link: function(scope, element, attrs){

      setTimeout(function() {
        scope.initLock = false;
        scope.$apply();
      }, 250);

      var attr = '';

      // Default atts
      scope.attrs = {
        "placeholder": "start typing...",
        "class": "",
        "id": "",
        "inputclass": "",
        "inputid": ""
      };

      for (var a in attrs) {
        attr = a.replace('attr', '').toLowerCase();
        // add attribute overriding defaults
        // and preventing duplication
        if (a.indexOf('attr') === 0) {
          scope.attrs[attr] = attrs[a];
        }
      }

      if (attrs.clickActivation) {
        element[0].onclick = function(e){
          if(!scope.searchParam){
            setTimeout(function() {
              scope.completing = true;
              scope.$apply();
            }, 0);
          }
        };
      }

      var key = {left: 37, up: 38, right: 39, down: 40 , enter: 13, esc: 27, tab: 9};

      document.addEventListener("keydown", function(e){
        var keycode = e.keyCode || e.which;

        switch (keycode){
          case key.esc:
            // disable suggestions on escape
	
		$("#autocomplete-dropdown").scrollTop(0);
            scope.select();
            scope.setIndex(-1);
            scope.$apply();
            e.preventDefault();
        }
      }, true);

      document.addEventListener("blur", function(e){
        // disable suggestions on blur
        // we do a timeout to prevent hiding it before a click event is registered
        setTimeout(function() {
          scope.select();
          scope.setIndex(-1);
          scope.$apply();
        }, 150);
      }, true);

	

      element[0].addEventListener("click",function (e){
    		
  		
    		
  	})
	
	document.addEventListener("click",function (e){
	
		n=0;
		m=900;
	$("#autocomplete-dropdown").scrollTop(n);
	
	})

	$("#autocomplete-input").on("search", function(input){
		
			n=0;
			m=900;
		$("#autocomplete-dropdown").scrollTop(n);
		
	})


      element[0].addEventListener("keydown",function (e){
        var keycode = e.keyCode || e.which;

        var l = angular.element(this).find('li').length;
var scrollDown = 0
var scrollUp = l*50;

        // this allows submitting forms by pressing Enter in the autocompleted field
        if(!scope.completing || l == 0) return;

        // implementation of the up and down movement in the list of suggestions

        switch (keycode){
          case key.up:

index = scope.getIndex()-1;
if(index==-1){	
	scope.setIndex(l-1);
	m=(l-1)*50;
	$("#autocomplete-dropdown").scrollTop(m);
}
else if(index==0){	
	
	$("#autocomplete-dropdown").scrollTop(0);
}
else{
	m=m-50;
n=m;
	$("#autocomplete-dropdown").scrollTop(m);
}
	
		
		
            if(index<-1){
              index = l-1;
            }
		 
		if(index >= l){

              index = -1;
              scope.setIndex(index);
              scope.preSelectOff();
              break;
            }
		if(index!=-1)
            	scope.setIndex(index);

            if(index!==-1)
              scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());

            scope.$apply();

            break;

          case key.down:
		
		
index = scope.getIndex()+1;

if(index==l){	
	scope.setIndex(0);
	n=0;
	$("#autocomplete-dropdown").scrollTop(n);
}
else if(index==0){
	scope.setIndex(index);	
	n=0;
	$("#autocomplete-dropdown").scrollTop(n);
}
else{
	scope.setIndex(index);
	n=n+50;
	m=n;
	$("#autocomplete-dropdown").scrollTop(n);
}
	


           

            if(index!==l)
              scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());

            break;
          case key.left:
            break;
          case key.right:
          case key.enter:
          case key.tab:

            index = scope.getIndex();
            // scope.preSelectOff();
            if(index !== -1) {
              scope.select(angular.element(angular.element(this).find('li')[index]).text());
              if(keycode == key.enter) {
                e.preventDefault();
              }
            } else {
              if(keycode == key.enter) {
                scope.select();
              }
            }
            scope.setIndex(-1);
            scope.$apply();

            break;
          case key.esc:

            // disable suggestions on escape
            scope.select();
            scope.setIndex(-1);
            scope.$apply();
            e.preventDefault();
            break;
          default:
            return;
        }

      });
    },
    
    template: '\
        <div class="autocomplete {{ attrs.class }}" id="{{ attrs.id }}">\
          <input  disable-valid-styling="true" ng-pattern-err-type="autocomplete_error" ng-pattern="/^[a-zA-Z0-9- ]*$/"\
    		id="autocomplete-input"\
    		style="border:0;font-size:15px;color:black;font-variant: small-caps;outline: none;font-family: Times, serif;  letter-spacing:2px;display: block; cursor: pointer;width:100%;"\
            type="search"\
            ng-model="searchParam"\
            placeholder="{{ attrs.placeholder }}"\
            class="{{ attrs.inputclass }}"\
            id="{{ attrs.inputid }}"\
            ng-required="{{ autocompleteRequired }}"\
    		autocomplete="off"/>\
            <ul style="border-radius:5px;width:100%" id="autocomplete-dropdown"\
    		ng-style="{height: (suggestions|filter:searchFilter).length > 2 ? 153+\'px\':\
    		(suggestions|filter:searchFilter).length > 1 ?102+\'px\':51+\'px\' , overflow: \'auto\'}"\
    		ng-show="completing && (suggestions|filter:searchFilter).length > 0">\
            <li style="cursor:pointer;height:50px;font-size:16px;font-variant: small-caps;outline: none;border: 1px block ;font-family:Georgia;"\
              suggestion\
              ng-repeat="suggestion in suggestions | filter:searchFilter | orderBy:\'toString()\' track by $index"\
              index="{{ $index }}"\
              val="{{ suggestion }}"\
              ng-class="{ active: ($index === selectedIndex) }"\
              ng-click="select(suggestion)"\
              ng-bind-html="suggestion | highlight:searchParam"></li>\
          </ul>\
        </div>'
    	};
})

.filter('highlight', ['$sce', function ($sce) {
  return function (input, searchParam) {
    //if (typeof input === 'function') return '';
    if (searchParam) {
	
      var words = '(' +
            searchParam.split(" ").join(' |') + '|' +
            searchParam.split(" ").join('|') +
          ')',
          exp = new RegExp(words, 'gi');
		    
        input = input.replace(exp, "<span style=\"background:orange;\" class=\"highlight\">$1</span>");

      
    }
    return $sce.trustAsHtml(input);
  };
}])

.directive('suggestion', function(){
  return {
    restrict: 'A',
    require: '^autocomplete', // ^look for controller on parents element
    link: function(scope, element, attrs, autoCtrl){
	

      element.bind('mouseenter', function() {

        autoCtrl.preSelect(attrs.val);
        autoCtrl.setIndex(attrs.index);
	
      });

      element.bind('mouseleave', function() {
autoCtrl.preSelectOff();
      });
    }
  };
})









angular.module('ngEdjab.categoryAutocomplete', ['autocomplete', 'toaster'])

.factory('dataCache',function($cacheFactory){
	
	return $cacheFactory("cachedData");
	
})


.factory('categoryCache',function($cacheFactory){
	
	return $cacheFactory("cachedCategory");
	
})

.factory('locationPrefixCache',function($cacheFactory){
	
	return $cacheFactory("cachedLocationPrefix");
	
})

.factory('locationPrefixDataCache',function($cacheFactory){
	
	return $cacheFactory("cachedLocationPrefixData");
	
})


.service("RefinedLocationId", [function(){
	
	var locationId = undefined;
	
	this.setLocationId = function(l){
		locationId = l;
	}
	
	this.getLocationId = function(){
		return locationId;
	}
		
	
}])


// the service that retrieves some School title from an url
.factory('SchoolRetriever',[ '$http', '$q', '$timeout', '$rootScope', 'serviceUrl', 'GetContextPath', 
         function($http, $q, $timeout, $rootScope, serviceUrl, GetContextPath){
 
	
	 var moreschools = new Set();
  
 this.getlocationId = function(location) {
	
	  
	    var locationId = $q.defer();
	   
	    
	    $http.post(GetContextPath.getContextPath()+'/CategoryAutocomplete/?location='+location)
	    		.then(function(result) {
	    
	    			
			angular.forEach(result.data,function(value, key){
				var locName = value.locName;
			  
				 if(locName.indexOf("_")!=-1){
					var parts = locName.split("_"); 
				/*	city = parts[0];
					state = parts[1];
					moreschools.add(city+", "+state);
				*/
					moreschools.add(parts[0]+", "+parts[1]);
					
				 }
				else{
						 moreschools.add(locName);
				}

			
				})

			      locationId.resolve(Array.from(moreschools));
	  })
	     

	    return locationId.promise;
	  }
  

  return this;
}])


.controller('CategoryAutocompleteController', [ '$scope', '$rootScope', 'SchoolRetriever', '$sce', 
                                                'toaster', '$q', '$http', '$timeout', 'serviceUrl', 'GetContextPath', 'FrontListViewHeaderInfo', 'OrderRating', 'RefinedLocationId', 'FrontMapViewHeaderInfo',
								    			function($scope, $rootScope, SchoolRetriever, $sce, 
								    			toaster, $q, $http, $timeout, serviceUrl, GetContextPath, FrontListViewHeaderInfo, OrderRating, RefinedLocationId, FrontMapViewHeaderInfo){
	
	
	$scope.typedKey = function(){
		RefinedLocationId.setLocationId(undefined);
	}
	
	
	$scope.getLocationIdToDisplay = function(){
		return RefinedLocationId.getLocationId();
	}
	
	
	
	 $rootScope.selectedCategory = undefined;
	
	$rootScope.location_specific_clicked = false;
	
	//var popoverIncrement = 1000;

	$rootScope.dummyLocationId = undefined;
	
	$rootScope.locationId = undefined;
	
	$rootScope.category_specific_clicked = false;
	
	

  $scope.locations = [];
  $scope.getschools = function(){
	
    return $scope.locations;
  }
  
  $scope.typedData = function(typedthings){
	  if(typedthings.length == 1){
			  SchoolRetriever.getlocationId(typedthings).then(function(data){
					 $scope.locations = data;
			  })
	  }
		$rootScope.typedThing =  typedthings;
  }

 /* $('#specificLocationViewDropdown').on('changed.bs.select', function (event, clickedIndex, newValue, oldValue) {
		$scope.clickCategory($('#specificLocationViewDropdown').val());
		
		});*/
  
  
  $scope.locationDropdownList = [
         	                    "ALL", 
         	                    "ENGINEERING", 
         	                    "MEDICAL", 
         	                    "ARCHITECTURE",
         	                    "LAW"
         	                    ];
  
  $scope.specificLocationDropdown = function(d){
	  $scope.clickCategory(d);
  }
  
  
  $scope.specificLocationRenderOnMap = function(){
	  $timeout(function(){
			 $('html,body').animate({
			        scrollTop: $(".listmapviewflip").offset().top - 140},
			        'slow');
			},200)
  }
  
  
  $scope.clickCategory = function(categoryId){
	 
	  /*if(categoryId!=undefined){
	  $timeout(function(){
			 $('html,body').animate({
			        scrollTop: $(".listmapviewflip").offset().top - 140},
			        'slow');
			},200)
	  }*/
	 // $scope.specificLocationViewPopover=false;
	  
	  if($rootScope.selectedCategory != categoryId){
	  $rootScope.category_specific_clicked = true;
	  $rootScope.location_specific_clicked = true;
	  }
	  
	 /* if($rootScope.selectedCategory == categoryId){		  
		$rootScope.dummySpecificLocationViewPopover=popoverIncrement++;
	  }*/
	 
	  $rootScope.selectedCategory=categoryId;
	  
	  if(RefinedLocationId.getLocationId()==undefined){
		  
		  $scope.result = null;
	  }
	  
	  
  }
	
  
  
  //Upon autocomplete the location field, this function  gets called...
  $scope.selectedData = function(suggestion){
	 
	  
	  //This is to disable both dropdown and autocomplete, so that no other consecutive request could be made...
		  $rootScope.category_specific_clicked = true;
		  $rootScope.location_specific_clicked = true;
		  
	  //$scope.specificLocationViewPopover=false;
	  
			var n=0;
			var m=900;
			$("#autocomplete-dropdown").scrollTop(n);

			toaster.clear();
			toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
					'Please wait while the data is being populated...</li></ul>', 5000, 'trustedHtml');

  
			$rootScope.locationId = suggestion.replace(", ", "_");
			//$rootScope.dummyLocationId = suggestion.split(",")[0];
			var l = suggestion.split(",")[0];
			 RefinedLocationId.setLocationId(l);
			
			var order = OrderRating.getOrderByRating();			
					
			$rootScope.listPerLocationHeaderInfo = FrontListViewHeaderInfo.headerInfo( $rootScope.selectedCategory, l, order);
			$rootScope.mapPerLocationHeaderInfo = FrontMapViewHeaderInfo.headerInfo( $rootScope.selectedCategory, l);
			
			var moreschools = new Set();
			
		var getSchoolSpecificToLocation =  function(){

		if($rootScope.selectedCategory==undefined){
				
			var locationDataId = $q.defer();
				
	    
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
									
			moreschools.add({'instituteId':instituteId, 'cityState':cityState, 'averageRating':value.averageRating,
					'categoryId':undefined, 'latitude':value.latitude, 
					'longitude':value.longitude, 'locationId':$rootScope.locationId});
		
				})
					
			locationDataId.resolve(Array.from(moreschools));
	  }, function(resp) {
		  
		  	$rootScope.category_specific_clicked = false;
			$rootScope.location_specific_clicked = false;
			toaster.clear();
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Connection error... Sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
		
  	
	  })
	     
	  return locationDataId.promise;
	  }
		else if($rootScope.selectedCategory=="ALL"){
			
			var locationDataId = $q.defer();
				
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
									
			moreschools.add({'instituteId':instituteId, 'cityState':cityState, 'averageRating':value.averageRating,
					'categoryId':'ALL', 'latitude':value.latitude, 
					'longitude':value.longitude, 'locationId':$rootScope.locationId});
		
				})
					
			locationDataId.resolve(Array.from(moreschools));
	  }, function(resp) {
		  
		  	$rootScope.category_specific_clicked = false;
			$rootScope.location_specific_clicked = false;
			toaster.clear();
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Connection error... Sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
		
  	
	  })
	     
	  return locationDataId.promise;
	  }
			else{
				
				 var locationDataId = $q.defer();				
				    
				 $http.post(GetContextPath.getContextPath()+'/SchoolPerCategoryIdAndLocation/?location='+$rootScope.locationId+'&category='+$rootScope.selectedCategory)
				    		.then(function(result) {
				    
				    			
						angular.forEach(result.data,function(value, key){
							parts = value.instituteId.split('_');
							state = parts.pop();
							parts_new = parts.join('_');
							parts_new = parts_new.split('_');
							cityState = parts_new.pop()+" "+state;
							parts.pop();
							instituteId = parts.join(' ');
												
						moreschools.add({'instituteId':instituteId, 'cityState':cityState, 'averageRating':value.averageRating,
								'categoryId':$rootScope.selectedCategory, 'latitude':value.latitude, 
								'longitude':value.longitude, 'locationId':$rootScope.locationId});
						
							})
							
						locationDataId.resolve(Array.from(moreschools));
				  }, function(resp) {
					  
					$rootScope.category_specific_clicked = false;
					$rootScope.location_specific_clicked = false;
			  		toaster.clear();
			  		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant:cursive; font-family: Courier, Times New Roman, Times, serif;">'+
							'Connection error...</li></ul>', 5000, 'trustedHtml');
					
			  	
			})
				     
		return locationDataId.promise;
				
				
		}
 
  }




getSchoolSpecificToLocation().then(function(data){
	
	$timeout(function(){
		 $('html,body').animate({
		        scrollTop: $(".listmapviewflip").offset().top - 140},
		        'slow');
		},200)
	
	/*if(listViewIdCache.get('cachedListViewId').has($rootScope.selectedCategory+""+$rootScope.locationId)){
		$rootScope.topRatedSchools = listViewCache.get("cachedListView");
		$rootScope.category_specific_clicked = false;
		$rootScope.location_specific_clicked = false;
		$rootScope.dummySpecificLocationViewPopover=popoverIncrement++;
		toaster.clear();
	}
	else{*/
		
	/*	listViewIdCache.put('cachedListViewId',listViewIdCache.get('cachedListViewId').add($rootScope.selectedCategory+""+$rootScope.locationId));
		listViewCache.put("cachedListView", data.concat(listViewCache.get("cachedListView")));
		*/					
		
		/*$rootScope.topRatedSchools = listViewCache.get("cachedListView");*/	
		$rootScope.topRatedSchools = data;
		$rootScope.category_specific_clicked = false;
		$rootScope.location_specific_clicked = false;
		//$rootScope.dummySpecificLocationViewPopover = popoverIncrement++;
		toaster.clear();
	//}
		
})
  
}
  
 
}]);
