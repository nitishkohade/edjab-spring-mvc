/*

angular.module('headerautocomplete', [])

.directive('headerautocomplete', function() {
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
			var s = suggestion.replace("<p>","").replace("</p>","").replace(","," ");


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

			$("#headerautocomplete-dropdown").scrollTop(0);
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
		$("#headerautocomplete-dropdown").scrollTop(n);

	})

	$("#headerautocomplete-input").on("search", function(input){
		console.log("cancel");
		n=0;
		m=900;
		$("#headerautocomplete-dropdown").scrollTop(n);

	})


	element[0].addEventListener("keydown",function (e){
		var keycode = e.keyCode || e.which;

		var l = angular.element(this).find('li').length;
		var scrollDown = 0
		var scrollUp = l*60;

		// this allows submitting forms by pressing Enter in the autocompleted field
		if(!scope.completing || l == 0) return;

		// implementation of the up and down movement in the list of suggestions

		switch (keycode){
		case key.up:

			index = scope.getIndex()-1;
			if(index==-1){	
				scope.setIndex(l-1);
				m=(l-1)*60;
				$("#headerautocomplete-dropdown").scrollTop(m);
			}
			else if(index==0){	

				$("#headerautocomplete-dropdown").scrollTop(0);
			}
			else{
				m=m-60;
				n=m;
				$("#headerautocomplete-dropdown").scrollTop(m);
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
			console.log(index);
			if(index==l){	
				scope.setIndex(0);
				n=0;
				$("#headerautocomplete-dropdown").scrollTop(n);
			}
			else if(index==0){
				scope.setIndex(index);	
				n=0;
				$("#headerautocomplete-dropdown").scrollTop(n);
			}
			else{
				scope.setIndex(index);
				n=n+60;
				m=n;
				$("#headerautocomplete-dropdown").scrollTop(n);
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
	<div class="headerautocomplete {{ attrs.class }}" id="{{ attrs.id }}">\
	<input disable-valid-styling="true" ng-pattern-err-type="autocomplete_error" ng-pattern="/^[a-zA-Z0-9- ]*$/"\
	id="headerautocomplete-input"\
	style="border:0;font-size:19px;color:black;border-radius:0px;font:inherit;font-variant: small-caps;outline: none;border: 1px block ;font-family: Times, serif;  letter-spacing:2px;display: block; cursor: pointer;width:400px;"\
	type="search"\
	ng-model="searchParam"\
	placeholder="{{ attrs.placeholder }}"\
	class="{{ attrs.inputclass }}"\
	id="{{ attrs.inputid }}"\
	ng-required="{{ autocompleteRequired }}"\
	autocomplete="off"/>\
	<ul style="border-radius:5px;width:400px;z-index:2;" id="headerautocomplete-dropdown"\
	ng-style="{height: (suggestions|filter:searchFilter).length > 2 ? 183+\'px\':\
	(suggestions|filter:searchFilter).length > 1 ?122+\'px\':61+\'px\' , overflow: \'auto\'}"\
	ng-show="completing && (suggestions|filter:searchFilter).length > 0">\
	<li style="z-index:2;cursor:pointer;height:60px;font-size:16px;font-variant: small-caps;outline: none;border: 1px block ;font-family:Georgia;"\
	headerSuggestion\
	ng-repeat="suggestion in suggestions | filter:searchFilter | orderBy:\'toString()\' track by $index"\
	index="{{ $index }}"\
	val="{{ suggestion }}"\
	ng-class="{ active: ($index === selectedIndex) }"\
	ng-click="select(suggestion)"\
	ng-bind-html="suggestion | headerHighlight:searchParam"></li>\
	</ul>\
</div>'};
})

.filter('headerHighlight', ['$sce', function ($sce) {
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

.directive('headerSuggestion', function(){
	return {
		restrict: 'A',
		require: '^headerautocomplete', // ^look for controller on parents element
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
});

















angular.module('ngEdjab.technicalHeaderAutocomplete', ['headerautocomplete'])

.factory('schoolPrefixDataCache',function($cacheFactory){

	return $cacheFactory("cachedSchoolPrefixData");

})


.factory('schoolPrefixCache',function($cacheFactory){

	return $cacheFactory("cachedSchoolPrefix");

})


//the service that retrieves some School title from an url
.factory('PrefixSchoolRetriever', function($http, $q, $timeout, $rootScope, GetContextPath){


	var moreschools = new Set();
	this.getTopRatedSchools = function(typedthings) {


		var Schooldata = $q.defer();


		$http.post(GetContextPath.getContextPath()+"/TechnicalAutocomplete/?typedthings="+typedthings)
		.then(function(result) {


			angular.forEach(result.data,function(value, key){
				parts = value.instituteId.split('_');
				state = parts.pop();
				parts_new = parts.join('_');
				parts_new = parts_new.split('_');
				cityState = parts_new.pop()+" "+state;
				instituteId = parts_new.join(' ');

				moreschools.add(instituteId+",<p>"+cityState+"</p>");

				console.log();
			})

			Schooldata.resolve(Array.from(moreschools));
		})





		return Schooldata.promise;
	}

	return this;

})


.controller('TechnicalHeaderAutocompleteController', [ '$scope', '$rootScope', 'PrefixSchoolRetriever', 
		'$sce', 'schoolPrefixDataCache', 'schoolPrefixCache', '$window', 'GetContextPath',
		function($scope, $rootScope, PrefixSchoolRetriever, 
		$sce, schoolPrefixDataCache, schoolPrefixCache, $window, GetContextPath){


	schoolPrefixDataCache.put("cachedSchoolPrefixData",new Array());
	schoolPrefixCache.put('cachedSchoolPrefix', new Set());




	$scope.schools = [];
	$scope.getschools = function(){

		return $scope.schools;
	}

	$scope.typedData = function(typedthings){


		if(typedthings.length==1){
			if(schoolPrefixCache.get('cachedSchoolPrefix').has(typedthings)){

			$scope.schools = schoolPrefixDataCache.get('cachedSchoolPrefixData');

		}
		else{

			PrefixSchoolRetriever.getTopRatedSchools(typedthings).then(function(data){

				schoolPrefixCache.put("cachedSchoolPrefix", schoolPrefixCache.get('cachedSchoolPrefix').add(typedthings));

				schoolPrefixDataCache.put('cachedSchoolPrefixData', data);

			    $scope.schools = schoolPrefixDataCache.get('cachedSchoolPrefixData');
				$scope.schools = data;

			})
			//}
		}

	}




	$scope.selectedData = function(suggestion){
		var n=0;
		var m=900;
		$("#headerautocomplete-dropdown").scrollTop(n);


		//console.log("Suggestion selected: " + suggestion );
		var s = suggestion.replace("<p>","").replace("</p>","").replace(","," ");

		s = s.replace(/ /g,"_")
		
		$window.open(GetContextPath.getContextPath()+"/SchoolName/?schoolId="+s, "_self");
	}


}]);*/

angular.module('ngEdjab.technicalHeaderAutocomplete', ['ui.bootstrap'])

.controller('TechnicalHeaderAutocompleteController', [ '$scope', '$window', 'GetContextPath', 
                                                       function($scope, $window, GetContextPath){
	
	/*$scope.schoolName = "";
	
	$scope.renderToSchoolPage = function(){
	 alert($scope.schoolName)
		$window.open(GetContextPath.getContextPath()+"/SchoolName/?schoolId=INDIAN_INSTITUTE_OF_TECHNOLOGY_ROORKEE_UTTARAKHAND", "_self");
	}*/
	
	
	/*$('.typeahead').on('typeahead:selected',  function(e, datum) { 
		
		//$(".typeahead").val(datum.id);  
		//window.location.href = "http://localhost:8080/SchoolName/?schoolId="+datum.id;
	
		$scope.$apply(function(){
			alert("sd");
			$scope.schoolName = datum.id;
		})
		
	});
	*/
	
	
}]);

$(document).ready(function(){
	
	//get the protocol and host name
	var hostName = document.location.protocol + "//" + document.location.host;
	
	// Instantiate the Bloodhound suggestion engine
	var movies = new Bloodhound({
	    datumTokenizer: function (datum) {
	        return Bloodhound.tokenizers.whitespace(datum.value);
	    },
	    queryTokenizer: Bloodhound.tokenizers.whitespace,
	    remote: {
	        url: hostName+'/TechnicalAutocomplete/?typedthings=%QUERY',
	        filter: function (movies) {
	            
	            // Map the remote source JSON array to a JavaScript object array
	            return $.map(movies, function (movie) {
		            	
		            	parts = movie.instituteId.split('_');
						state = parts.pop();
						parts_new = parts.join('_');
						parts_new = parts_new.split('_');
						cityState = parts_new.pop()+" "+state;
						name = parts_new.join(' ');
						
						value = name+", "+cityState;
		            	
		                return {
		                	id: movie.instituteId,
		                	name: name,
		                	cityState:cityState,
		                	value:value
		          
		                };
	            });
	        }
	    },
	    limit: 10
	});

	// Initialize the Bloodhound suggestion engine
	movies.initialize();
	
	

	// Instantiate the Typeahead UI
	$('#scrollable-dropdown-menu .typeahead').typeahead(null, {
	    displayKey: 'value',
	    source: movies.ttAdapter(),
	    templates: {
	    	/*suggestion: Handlebars.compile("<div style='height:50px;"+
		    "font-style: oblique;"+
		    "margin-top: 10px;"+
		    "margin-left: 5px;"+
		    "line-height: 20px;'>" +
    		"<p style='cursor:pointer;'>" +
    		"<i class='fa fa-university fa-2x' aria-hidden='true'></i>"+
    		"<span style='display:hidden;'>sdfsdf</span><span><b>{{name}}</b>, {{cityState}}</span></p></div>"),*/
	    	
	    	suggestion: Handlebars.compile('<div style="cursor:pointer;height:50px;font-style: oblique;'+
		    'margin-top: 0px;'+
		    'margin-left: 5px;'+
		    'line-height: 15px;"><ul>'+
		    '<li style="display:inline;"><div style="float:left;width:6%;height:50px;"><img src="{{hostName}}/img/history.png" class="img-thumbnail" width="50" height="50" ></img><div></li>'+
		    '<li style="display:inline;"><div style="float:left;width:94%;height:50px;"><span><b>{{name}}</b>,<br> {{cityState}}</span><div></li>'+
	    	'</ul></div>'),
	        /*footer: Handlebars.compile("<b>Searched for '{{query}}'</b>")*/
	    }
	});
	
	$('.typeahead').on('typeahead:selected',  function(e, datum) { 
		//$(".typeahead").val(datum.id);  
		window.location.href = hostName+"/SchoolName/?schoolId="+datum.id;
	});
})
// Instantiate the Bloodhound suggestion engine
