
var ngEdjab = angular.module('ngEdjab',
		[
		 'ngEdjab.facebook',
		 'ngEdjab.google',
		 'ngEdjab.validateForm',
		 'ngEdjab.routing',
		 'ngEdjab.loginregister',
		 'ngEdjab.panelslidedown',
		 'ngEdjab.resetpassword',
		 'ngEdjab.generatetoken',
		 'ngEdjab.technicalHeaderAutocomplete',
		 'ngEdjab.nearbyschool',
		 'ngEdjab.categoryAutocomplete',
		 'ngEdjab.frontmapview',
		 'ngEdjab.frontlistview',
		 'ngEdjab.registrationvalidated',
		 'ngEdjab.activationvalidated',
		 'ngEdjab.contactme',
		 'ngEdjab.errorpage',
		 'ngEdjab.userprofile',
		 'ngEdjab.activateuser',
		 'ngEdjab.schoolprofile',
		 'ngEdjab.schoolmap',
		 'ngEdjab.schoolphoto',
		 'ngEdjab.schoolvideo',
		 'ngEdjab.schoolreview',
		 'ngEdjab.user_to_like', 'ngEdjab.user_to_follow', 'ngEdjab.user_to_attend', 
		 'ngEdjab.linkDashboard',
		 'ngEdjab.headerinfo',
		 'ngRoute',
		 'ngEdjab.userprofileservices',
		 'utf8-base64',
		 'jcs-autoValidate',
		 'angular-ladda', 
		 'ngCookies',
		 'ngAnimate',
		 'ngResource',
		 'toaster',
		 'ui.bootstrap',
		 'ngSanitize',
		 'ngEdjab.stars',
		 'disableAll',
		 'ngProgress',
		 'ng-slide-down',
		 'duScroll',
		 'LocalStorageModule'
		 ])


	 

.factory("GetContextPath",['$window', 
                           function($window){
	
	function getPath(){
		var pathArray = $window.location.pathname.split('/');
			
		/*return $window.location.protocol+"//"+$window.location.host+"/"+pathArray[1];*/
		return $window.location.protocol+"//"+$window.location.host;
	}
	
	return {
		getContextPath:getPath
	}
	
}])


/*.run( function( $rootScope ) {
	(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
})
*/
 .run(['$rootScope', '$window', function($rootScope, $window) {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    $rootScope.$on('fb.load', function() {
      $window.dispatchEvent(new Event('fb.load'));
    });
  }])
/*.service("SourceUrl",["GetContextPath",
             function(GetContextPath){
	
	this.url = function(callback)
	{
	    var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", GetContextPath.getContextPath()+"/source_url/source.txt", false);
	    rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status == 0)
	            {
	                var allText = rawFile.responseText;
	                callback(allText)
	                
	            }
	        }
	    }
	    rawFile.send(null);
	}
	
	
	
}])
*/




.value("serviceUrl", "")

.value("login", "")

.value("password", "")


.config(function($httpProvider, $resourceProvider, $facebookProvider){
	
	//$httpProvider.defaults.headers.common['Authorization'] = 'Basic dmFydW4ua29oYWRlOkhFTWxhdGEyNQ==';
	 $facebookProvider.setAppId('443059122507704');
	 //'email','user_friends','public_profile', 'user_posts', 'publish_actions', 'user_photos'
	  $facebookProvider.setPermissions(['email', 'public_profile']);  
	
})
