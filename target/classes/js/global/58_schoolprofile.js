     
angular.module("ngEdjab.schoolprofile",[])

.service("ImageStatusService", ['$rootScope', "$q",
                               function($rootScope, $q){
	
	this.getImageStatus = function(url, callback){
		
		//var d = $q.defer()
		
	    var img = new Image();
	    img.src = url;
	    img.onerror = img.onabort = function() {
	      
	            d.resolve(callback("error"))
	            //callback("error");
	        
	    };
	    img.onload = function() {       
	    	//d.resolve(callback("success"))
	            callback("success");
	        
	    };
	    
		//d.promise;
	}
	
}])

.controller("SchoolProfileController", ['$scope', '$timeout', 'ImageStatusService',
                                        function($scope, $timeout, ImageStatusService){


	$scope.getProfileImage = function(jsonUrl, altUrl){
		
		ImageStatusService.getImageStatus(jsonUrl, function(result){
			
			if(result == "success"){
				$scope.profileUrl = jsonUrl;				
			}
			else if(result == "error"){				
				$scope.profileUrl = altUrl;
			}
			
		})
	}
	
	
	$("#dragToReviewSection").click(function(){
		$timeout(function(){
			 $('html,body').animate({
			        scrollTop: $("#reviewSection").offset().top},
			        'slow');
			},200)
			
	})
	
	
	$scope.school_urls = [];
	$scope.school_categories = [];
	
	$scope.schoolCategory = function(category){
		
		var category = category.replace("[", "").replace("]","");
		
		$scope.school_categories = category.split(",");		
	}
	
	$scope.schoolURL = function(urls){
		
		var URLString = urls.replace("[", "").replace("]","");
		
		$scope.school_urls = URLString.split(",");				
	}
	
	
	
	
		$scope.getRating = function(n){
				
			   var $me = $( '.star-ctr' );

			   var $bg, $fg, wd, cc, ini;

			   $bg = $me.children( 'ul' );
			   $fg = $bg.clone().addClass( 'star-fg' ).css( 'width', 0 ).appendTo( $me );
			   $bg.addClass( 'star-bg' );
			    
			      $fg.css( 'width', (n*45)+'px' );
				
		
			  		  
		}
		
	
	
	
		
}])