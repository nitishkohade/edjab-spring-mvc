angular.module('ngEdjab.facebook', ['ngFacebook'])


/*.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('443059122507704');
  $facebookProvider.setPermissions("email, public_profile, user_posts, publish_actions, user_photos");
})
*/

/*.run( function( $rootScope ) {
	(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
})*/

.service("FacebookLoginSevice", ['$http', 'toaster', 'ngProgressFactory', 'GetContextPath', '$window', '$timeout',
                                 function($http, toaster, ngProgressFactory, GetContextPath, $window, $timeout){
	
	var progress = ngProgressFactory.createInstance();
	
	this.facebookLogin = function(response){
		
		
		progress.reset();		
		progress.setColor('red');
		progress.start();
		
		var input = {
                'facebookId': response.id,
                'facebookName': response.name
            }
		
		
		
		$http.post(GetContextPath.getContextPath()+"/FacebookLogin/?facebookId="+response.id+"&facebookName="+response.name)
        .success(function(result){
        	
        	
        	if(result=="200"){
        		progress.complete();
        		
        		toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Successfully Logged In</li></ul>', 5000, 'trustedHtml');
        		$timeout(function(){
        			$window.location.href = GetContextPath.getContextPath()+"/UserProfileInfo/#/edit";
        		},800)
        		
        		
        	}
        	else if(result=="200f"){
        		progress.complete();
        		
        		toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Successfully Logged In</li></ul>', 5000, 'trustedHtml');
        		$timeout(function(){
        			$window.location.href = GetContextPath.getContextPath();
        		},800)
        		
        		
        	}
        	else if(result=="400"){
        		progress.complete();
        		        		
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Something went wrong, please do it again...</li></ul>', 5000, 'trustedHtml');
        		       		
        	}
        	else if(result=="404"){
        		progress.complete();
        		        		
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Something went wrong, please do it again...</li></ul>', 5000, 'trustedHtml');
       		       		
        	}
        	else if(result=="408"){
        		progress.complete();
        		
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Your account has been deactivated...</li></ul>', 5000, 'trustedHtml');
        		$timeout(function(){
        			$window.location.href = "renderActivationPage";
        		},800)     
        		
        	}        	
        	else if(result=="500"){        		
        		progress.reset();
        		        		
        		toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error, please login again</li></ul>', 5000, 'trustedHtml');

        	}
    })
    .error(function(data, status){
    	progress.reset();
    	    	
    	toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Bad request, please login again, sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
    })
		
		
		
	}
	
}])

.controller('FacebookController',['$scope', '$rootScope', '$facebook', '$http', 'FacebookLoginSevice',
                                  function($scope, $rootScope, $facebook, $http, FacebookLoginSevice){
		$scope.isLoggedInFacebook = false;
		$scope.isFacebookClicked = false;
		
		
		 /*$scope.$on('fb.auth.authResponseChange', function() {
		      $scope.status = $facebook.isConnected();
		      alert($scope.status)
		      if($scope.status) {
		        $facebook.api('/me').then(function(user) {
		          $scope.user = user;
		        });
		      }
		    });*/
		
		
		
		$scope.loginFacebook = function(){
			
			if($rootScope.isLoggedInGoogle==false){
			$facebook.login(function(response){
				if(response.authResponse)
					;
				else
					;
			}).then(function(){
				//$scope.isLoggedInFacebook = true;
				if($scope.isLoggedInGoogle==false)
				refresh();
			});
			}
			else{
				
			}
				
		}
		
		
		$rootScope.logoutFacebook = function(){
			
			$facebook.logout();
			/*$facebook.logout().then(function(){
				$scope.isLoggedInFacebook = false;
				alert("logout")
				refresh();
			});*/
		}
	
		function refresh(){
			$facebook.api("/me").then(function(response){
				//$scope.facebookUsername = response.name;				
				$scope.isLoggedInFacebook = true;
				//$scope.facebookUserInfo = response;
			
				//var data = {"id":response.id};
				
				FacebookLoginSevice.facebookLogin(response);
				
				$facebook.api('/me/picture').then(function(response){
					$scope.facebookPicture = response.data.url;
					$facebook.api('/me/permissions').then(function(response){
						//$scope.permissions = response.data;
						$facebook.api('/me/posts').then(function(response){
							$scope.facebookPosts = response.data;
						});
					})
				})
			},
			function(err){
				$scope.isLoggedInFacebook = false;
				
			}
			);
		}
		
		$scope.facebookPostStatus = function(){
			var body = this.body;
			$facebook.api('/me/feed','post',{message:body}).then(function(response){
				
				refresh();
			})
		}
		
		
}]);



