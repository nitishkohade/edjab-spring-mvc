



angular.module('ngEdjab.userprofile', [])

/*.provider('context',   function() {
   
		
    this.$get = function(GetContextPath) {
        return {
            value: GetContextPath.getContextPath()
        }
    };

   
})*/



.config(['$routeProvider',
         function($routeProvider) {
	 
	$routeProvider
	
	.when('/',{
		templateUrl:"../pages/included pages/user_data/user_profile_data_dynamic.jsp",
		controller:"UserProfileInfoController"
	})
	.when('/:mode',{
		templateUrl:"../pages/included pages/user_data/user_profile_data_dynamic.jsp",
		controller:"UserProfileInfoController"
	})
	.otherwise({
		redirectTo: '/'
	})
	    
	}])

	
	
	
	
.service('editUserInfo', ['$rootScope', '$http', "ngProgressFactory", "toaster", "GetContextPath",
                          function($rootScope, $http, ngProgressFactory, toaster, GetContextPath){
	
	
	
	$rootScope.userEditArray = false;
	$rootScope.currentDate = new Date();
		
	var isFacebookUser = null;
	
	$rootScope.isFacebookUser = function(f){
		isFacebookUser = f;
	}
	
	$rootScope.showValue = function(sessionValue, order){
		if($rootScope.userEditArray==true){
			
			switch(order){
			
			case "first":				
				return $rootScope.user_firstName;
				
			case "middle":
				return $rootScope.user_middleName;
				
			case "last":
				return $rootScope.user_lastName;
				
			case "gender":
				return $rootScope.user_gender;
				
			case "street":
				return $rootScope.user_street;
				
			case "city":
				return $rootScope.user_city;
				
			case "state":
				return $rootScope.user_indianState;
				
			case "country":
				return $rootScope.user_country;
				
			case "zip":
				return $rootScope.user_zip;
				
			case "contact":
				return $rootScope.user_contactNumber;
				
			case "date":
				return $rootScope.user_dateOfBirth;
				
			case "fb_emailId":
				return $rootScope.facebook_user_emailId;
				
			}
			
			
		}else{
		
			return sessionValue;
		}
	}
	
	$rootScope.userProfile = {};
	$rootScope.fieldError = undefined;
	
	
	$rootScope.userEditReset = function(){
		
		$rootScope.userProfile = {};
		
	}
	
	var progress = ngProgressFactory.createInstance();
	progress.setColor('red');
	
	$rootScope.onUserEdit = function(){
		$rootScope.refrainAttack = true;
		
		$rootScope.saving = true;
		progress.start();
		
			if(isFacebookUser == 'true'){
				
			var input = {
							"firstName":$rootScope.userProfile.firstName,
							"middleName":$rootScope.userProfile.middleName,
							"lastName":$rootScope.userProfile.lastName,					
							"gender":$rootScope.userProfile.gender,
							"street":$rootScope.userProfile.street,
							"city":$rootScope.userProfile.city,					
							"indianState":$rootScope.userProfile.indianState,
							"country":$rootScope.userProfile.country,
							"zip":$rootScope.userProfile.zip,
							"contactNumber":$rootScope.userProfile.contactNumber,
							"dateOfBirth":$rootScope.userProfile.dateOfBirth,
							"emailId":$rootScope.userProfile.fb_emailId
						}
		
			}
			else if(isFacebookUser != 'true'){
				var input = {
						"firstName":$rootScope.userProfile.firstName,
						"middleName":$rootScope.userProfile.middleName,
						"lastName":$rootScope.userProfile.lastName,					
						"gender":$rootScope.userProfile.gender,
						"street":$rootScope.userProfile.street,
						"city":$rootScope.userProfile.city,					
						"indianState":$rootScope.userProfile.indianState,
						"country":$rootScope.userProfile.country,
						"zip":$rootScope.userProfile.zip,
						"contactNumber":$rootScope.userProfile.contactNumber,
						"dateOfBirth":$rootScope.userProfile.dateOfBirth
					}
			}
		
		
		$http.post(GetContextPath.getContextPath()+"/editUserInfo/", input).success(function(result){
			
			$rootScope.saving = false;
			
			
			if(result=="200"){
				
				
				$rootScope.userEditArray = true;
				$rootScope.user_firstName = $rootScope.userProfile.firstName;
				$rootScope.user_lastName = $rootScope.userProfile.lastName;
				$rootScope.user_middleName = $rootScope.userProfile.middleName;
				$rootScope.user_gender = $rootScope.userProfile.gender;
				/*if($rootScope.userProfile.gender == "MALE" || $rootScope.userProfile.gender == "FEMALE")
					$rootScope.user_gender = $rootScope.userProfile.gender;
				else
					$rootScope.user_gender = "Undefined";*/
				
				$rootScope.user_street = $rootScope.userProfile.street;
				$rootScope.user_city = $rootScope.userProfile.city;
				$rootScope.user_indianState = $rootScope.userProfile.indianState;
				$rootScope.user_country = $rootScope.userProfile.country;
				$rootScope.user_zip = $rootScope.userProfile.zip;
				$rootScope.user_contactNumber = $rootScope.userProfile.contactNumber;
				$rootScope.user_dateOfBirth = $rootScope.userProfile.dateOfBirth;
				$rootScope.facebook_user_emailId = $rootScope.userProfile.fb_emailId;
					
					
					
				$rootScope.refrainAttack = false;
				progress.complete();
				$rootScope.fieldError = false;
				toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Your account has been updated successfully...</li></ul>', 5000, 'trustedHtml');

			}
			else if(result=="400"){
				$rootScope.refrainAttack = false;
				progress.reset();
				$rootScope.fieldError = true;
				toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred, please try again</li></ul>', 5000, 'trustedHtml');

			}
			
			else if(result=="500"){
				$rootScope.refrainAttack = false;
				progress.reset();
				$rootScope.fieldError = true;
				toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred, please edit again</li></ul>', 5000, 'trustedHtml');

			}
			
		})
		.error(function(result){
			
			$rootScope.refrainAttack = false;
			progress.reset();
			$rootScope.saving = false;
			$rootScope.fieldError = true;
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Something went wrong, please edit again...</li></ul>', 5000, 'trustedHtml');

		})
		
		
	}
	
	
}])


	
	
.service('settingUserInfo', ['$rootScope', '$http', "ngProgressFactory", "toaster", "$timeout", "$window", "GetContextPath",
                          function($rootScope, $http, ngProgressFactory, toaster, $timeout, $window, GetContextPath){
	
	$rootScope.userEditPlan = false;
	
	$rootScope.userSettingSub = false;
	$rootScope.userSettingPass = false;
	$rootScope.userSettingDel = false;
	
	$rootScope.userSettingSubPlan = undefined;
	$rootScope.currentPassword = undefined;
	$rootScope.newPassword = undefined;
	$rootScope.confirmDeactivatePassword = undefined;
		
	var progress = ngProgressFactory.createInstance();
	progress.setColor('red');
	
	
	$rootScope.userSettingSubscription = function(){
		
		$rootScope.userSettingSub = true;
		$rootScope.userSettingPass = false;
		$rootScope.userSettingDel = false;
	};
	
	$rootScope.showSubPlan = function(plan){
		if($rootScope.userEditPlan == false){
		
			return plan;
		}
		else if($rootScope.userEditPlan == true){
			
		return $rootScope.user_subscriptionFrequency;
		}
	}
	
	
	$rootScope.userSettingPassword = function(){
		
		$rootScope.userSettingPass = true;
		$rootScope.userSettingSub = false;
		$rootScope.userSettingDel = false;
	};
	
	$rootScope.userSettingDeleteAccount = function(){
		$rootScope.userSettingPass = false;
		$rootScope.userSettingSub = false;
		$rootScope.userSettingDel = true;
	}
	
	$rootScope.userSettingSubscription();
	$rootScope.changePassword = false;
	$rootScope.changeSubPlan = false;
	
	
	
	$rootScope.onUpdateSubPlan = function(plan){
		
		$rootScope.refrainAttack = true;
		progress.reset();
		progress.start();
		$rootScope.changeSubPlan = true;
		
		var input = {
				
				"frequency":plan
		}
		
		$http.post(GetContextPath.getContextPath()+"/subscription", input).success(function(result){
			$rootScope.changeSubPlan = false;
			if(result=="200"){
				$rootScope.userEditPlan = true;
				$rootScope.user_subscriptionFrequency = plan;
				$rootScope.refrainAttack = false;
				progress.complete();
				$rootScope.fieldError = false;
				toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Subscription plan successfully updated...</li></ul>', 5000, 'trustedHtml');

			}
			else if(result=="500"){
				$rootScope.userEditPlan = false;
				$rootScope.refrainAttack = false;
				progress.reset();
				$rootScope.fieldError = true;
				toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred, please subscribe again</li></ul>', 5000, 'trustedHtml');

			}
			else if(result=="400"){
				$rootScope.userEditPlan = false;
				$rootScope.refrainAttack = false;
				progress.reset();
				$rootScope.fieldError = true;
				toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred, please check your network</li></ul>', 5000, 'trustedHtml');

			}
			
		})
		.error(function(result){
			$rootScope.userEditPlan = false;
			$rootScope.changeSubPlan = false;
			$rootScope.refrainAttack = false;
			progress.reset();
			$rootScope.fieldError = true;
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Something went wrong, please subscribe again...</li></ul>', 5000, 'trustedHtml');

		})
	}
			
	
	$rootScope.onUpdatePassword = function(currentPassword, newPassword){
		
		$rootScope.refrainAttack = true;
		progress.reset();
		progress.start();
		$rootScope.changePassword = true;
				
		var input = {
				
				"currentPassword":currentPassword,
				"updatedPassword":newPassword
		}
		
		
		
		$http.post(GetContextPath.getContextPath()+"/updatePassword", input).success(function(result){
			$rootScope.changePassword = false;
			if(result=="200"){
				
				$rootScope.refrainAttack = false;
				progress.complete();
				$rootScope.fieldError_p = false;
				toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;"> Password successfully updated...</li></ul>', 5000, 'trustedHtml');

			}
			else if(result=="500"){
				$rootScope.refrainAttack = false;
				progress.reset();
				$rootScope.fieldError_p = true;
				toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred, please update your password again</li></ul>', 5000, 'trustedHtml');

			}
			else if(result=="400"){
				$rootScope.refrainAttack = false;
				progress.reset();
				$rootScope.fieldError_p = true;
				toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Your current password is incorrect</li></ul>', 5000, 'trustedHtml');

			}
			
		})
		.error(function(result){
			$rootScope.changePassword = false;
			$rootScope.refrainAttack = false;
			progress.reset();
			$rootScope.fieldError_p = true;
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Something went wrong, please update your password again...</li></ul>', 5000, 'trustedHtml');

		})
		
		
		
	}
	
	
	
	
	$rootScope.onDeactivateAccount = function(confirmDeactivatePassword){
		
		$rootScope.refrainAttack = true;
		progress.reset();
		progress.start();
		$rootScope.deactivateAccountLadda = true;
				
		var input = {
				
				"confirmDeactivatePassword":confirmDeactivatePassword
				
		}
		
		
		
		$http.post(GetContextPath.getContextPath()+"/deactivateAccount", input).success(function(result){
			$rootScope.deactivateAccountLadda = false;
			if(result=="200"){
				
				$rootScope.refrainAttack = false;
				progress.complete();
				$rootScope.fieldError_deactivate = false;
				toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;"> Your Account Successfully deactivated...</li></ul>', 5000, 'trustedHtml');

				$timeout(function(){
        			$window.location.href = GetContextPath.getContextPath()	;
        		},1200)
				
			}
			else if(result=="500"){
				$rootScope.refrainAttack = false;
				progress.reset();
				$rootScope.fieldError_deactivate = true;
				toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred</li></ul>', 5000, 'trustedHtml');

			}
			else if(result=="400"){
				$rootScope.deactivateError = true;
				$rootScope.refrainAttack = false;
				progress.reset();
				$rootScope.fieldError_deactivate = true;
				toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">password is incorrect...</li></ul>', 5000, 'trustedHtml');

			}
			
		})
		.error(function(result){
			
			$rootScope.deactivateAccountLadda = false;
			$rootScope.refrainAttack = false;
			progress.reset();
			$rootScope.fieldError_deactivate = true;
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Something went wrong...</li></ul>', 5000, 'trustedHtml');

		})
		
		
		
	}
	
	
	
}])



.service('likedUserInfo', ['$rootScope', '$http', "toaster", "$q", "$timeout", "likeLocalStorage", "ngProgressFactory", "GetContextPath", "$window",
                             function($rootScope, $http, toaster, $q, $timeout, likeLocalStorage, ngProgressFactory, GetContextPath, $window){
	
	
	$rootScope.noSchoolLiked = true;
	
	$rootScope.clickLikedSchool = function(key){
		
		$window.open(GetContextPath.getContextPath()+"/SchoolName/?schoolId="+key, "_self");
	}
		
	var getLikedSchool =  function(user){
		
	var moreschools = new Set();
	var deferred = $q.defer();

	
	
	
	
	$http.post(GetContextPath.getContextPath()+"/LikedByUser/?likedby="+user).then(function(result){

	
		
			angular.forEach(result.data,function(value, key){
			
			parts = value.instituteId.split('_');
			state = parts.pop();
			parts_new = parts.join('_');
			parts_new = parts_new.split('_');
			cityState = parts_new.pop()+" "+state;
			cityState = cityState.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
			parts.pop();
			instituteId = parts.join(' ');
			instituteId = instituteId.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
			
			moreschools.add({'instituteId':instituteId, 'cityState':cityState, 'key':value.instituteId});
			
			})
		//	deferred.resolve(likeMap);
		deferred.resolve(Array.from(moreschools));
		
	}
	,function(result){
		toaster.clear();
  		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Connection error...</li></ul>', 5000, 'trustedHtml');
		
	})
	
	return deferred.promise;
	}
	
	$rootScope.userLikeInit = function(user){
		/*if(likeLocalStorage.likeStore!=null){
			
			if(likeLocalStorage.likeStore==""){
				
				$rootScope.noSchoolLiked = true;
			}
			else{
				$rootScope.noSchoolLiked = false;
				$rootScope.likedSchools = likeLocalStorage.likeStore;	
			}
			
		}
		else{*/
		
		
			
		getLikedSchool(user).then(function(data){
			
			if(data.length!=0){
				$rootScope.noSchoolLiked = false;
				$rootScope.likedSchools = data;
				/*likeLocalStorage.likeStorage(data, function(result){
					$rootScope.likedSchools = result;
				});*/
			}
			else if(data.length==0){
				$rootScope.likedSchools = [];
				$rootScope.noSchoolLiked = true;
			}
								
		})
		//}
	}
	
	
	
	$rootScope.removeLike = function(key){

		var progress1 = ngProgressFactory.createInstance();
		progress1.setColor('red');
		
		//$rootScope.refrainAttack = true;
		progress1.reset();
		progress1.start();
		
		
		$http.post(GetContextPath.getContextPath()+"/removeLikeService/?key="+key).success(function(result){
			
			if(result=="200"){
				
				// this will remove from browser local storage
				/*likeLocalStorage.removeLike(key, function(result){
					if(result==""){
						$rootScope.noSchoolLiked = true;
					}
					$rootScope.likedSchools = result;
				});*/
				
				var l = $rootScope.likedSchools;
				var len = $rootScope.likedSchools.length;
				
				for(var i = 0; i < len; i++) {
				    if (l[i].key == key) {
				    	l.splice(i,1);
				    	$rootScope.likedSchools = l;
				        break;
				    }
				}
				
				if($rootScope.likedSchools.length==0){
					$rootScope.noSchoolLiked = true;
				}
				
				progress1.complete();
				
				toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">You removed liked university</li></ul>', 5000, 'trustedHtml');
			}
			else if(result=="500"){
				
				progress1.reset();
				
				toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred...</li></ul>', 5000, 'trustedHtml');

			}
			else if(result=="400"){
				
				progress1.reset();
				
				toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred...</li></ul>', 5000, 'trustedHtml');

			}
			
		})
		.error(function(result){
		
			progress1.reset();
			
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Something went wrong...</li></ul>', 5000, 'trustedHtml');

		})
		
		
	}
	
}])







.service('followedUserInfo', ['$rootScope', '$http', "toaster", "$q", "$timeout", "followLocalStorage", "ngProgressFactory",  "GetContextPath", "$window",
                             function($rootScope, $http, toaster, $q, $timeout, followLocalStorage, ngProgressFactory, GetContextPath, $window){
	
	
	$rootScope.noSchoolFollowed = true;
	
	$rootScope.clickFollowedSchool = function(key){
		
		$window.open(GetContextPath.getContextPath()+"/SchoolName/?schoolId="+key, "_self");
	}
		
	var getFollowedSchool =  function(user){
		
	var moreschools = new Set();
	var deferred = $q.defer();

	
	
	$http.post(GetContextPath.getContextPath()+"/FollowedByUser/?followedby="+user).then(function(result){

	
		
			angular.forEach(result.data,function(value, key){
			
			parts = value.instituteId.split('_');
			state = parts.pop();
			parts_new = parts.join('_');
			parts_new = parts_new.split('_');
			cityState = parts_new.pop()+" "+state;
			cityState = cityState.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
			parts.pop();
			instituteId = parts.join(' ');
			instituteId = instituteId.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
			
			moreschools.add({'instituteId':instituteId, 'cityState':cityState, 'key':value.instituteId});
			
			})
		//	deferred.resolve(likeMap);
		deferred.resolve(Array.from(moreschools));
		
	}
	,function(result){
		toaster.clear();
  		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Connection error...</li></ul>', 5000, 'trustedHtml');
		
	})
	
	return deferred.promise;
	}
	
	$rootScope.userFollowInit = function(user){
		/*if(followLocalStorage.followStore!=null){
			
			if(followLocalStorage.followStore==""){
				
				$rootScope.noSchoolFollowed = true;
			}
			else{
				$rootScope.noSchoolFollowed = false;
				$rootScope.followedSchools = followLocalStorage.followStore;	
			}
			
		}
		else{*/
			
		
		getFollowedSchool(user).then(function(data){
			
			
			if(data.length!=0){
				$rootScope.followedSchools = data;
				$rootScope.noSchoolFollowed = false;
				/*followLocalStorage.followStorage(data, function(result){
					$rootScope.followedSchools = result;
				});*/
			}
			else if(data.length==0){
				$rootScope.followedSchools = [];
				$rootScope.noSchoolFollowed = true;
			}
								
		})
		//}
	}
	
	
	
	$rootScope.removeFollow = function(key){
		
		var progress1 = ngProgressFactory.createInstance();
		progress1.setColor('red');
		
		//$rootScope.refrainAttack = true;
		progress1.reset();
		progress1.start();
		
		
		$http.post(GetContextPath.getContextPath()+"/removeFollowService/?key="+key).success(function(result){
			
			if(result=="200"){
				
				// this will remove from browser local storage
				/*followLocalStorage.removeFollow(key, function(result){
					if(result==""){
						$rootScope.noSchoolFollowed = true;
					}
					$rootScope.followedSchools = result;
				});*/
				
				
				var l = $rootScope.followedSchools;
				var len = $rootScope.followedSchools.length;
				
				for(var i = 0; i < len; i++) {
				    if (l[i].key == key) {
				    	l.splice(i,1);
				    	$rootScope.followedSchools = l;
				        break;
				    }
				}
				
				if($rootScope.followedSchools.length==0){
					$rootScope.noSchoolFollowed = true;
				}
				
				progress1.complete();
				
				toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">You removed followed university</li></ul>', 5000, 'trustedHtml');
			}
			else if(result=="500"){
				
				progress1.reset();
				
				toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred...</li></ul>', 5000, 'trustedHtml');

			}
			else if(result=="400"){
				
				progress1.reset();
				
				toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred...</li></ul>', 5000, 'trustedHtml');

			}
			
		})
		.error(function(result){
		
			progress1.reset();
			
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Something went wrong...</li></ul>', 5000, 'trustedHtml');

		})
	}	
}])







.service('attendedUserInfo', ['$rootScope', '$http', "toaster", "$q", "$timeout", "attendLocalStorage", "ngProgressFactory", "GetContextPath", "$window",  
                             function($rootScope, $http, toaster, $q, $timeout, attendLocalStorage, ngProgressFactory, GetContextPath, $window){
	
	
	$rootScope.noSchoolAttended = true;
	
	$rootScope.clickAttendedSchool = function(key){
		
		$window.open(GetContextPath.getContextPath()+"/SchoolName/?schoolId="+key, "_self");
	}
		
	var getAttendedSchool =  function(user){
		
	var moreschools = new Set();
	var deferred = $q.defer();

	
	
	$http.post(GetContextPath.getContextPath()+"/AttendedByUser/?attendedby="+user).then(function(result){

	
		
			angular.forEach(result.data,function(value, key){
			
			parts = value.instituteId.split('_');
			state = parts.pop();
			parts_new = parts.join('_');
			parts_new = parts_new.split('_');
			cityState = parts_new.pop()+" "+state;
			cityState = cityState.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
			parts.pop();
			instituteId = parts.join(' ');
			instituteId = instituteId.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
			
			moreschools.add({'instituteId':instituteId, 'cityState':cityState, 'key':value.instituteId});
			
			})
		//	deferred.resolve(likeMap);
		deferred.resolve(Array.from(moreschools));
		
	}
	,function(result){
		toaster.clear();
  		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Connection error...</li></ul>', 5000, 'trustedHtml');
		
	})
	
	return deferred.promise;
	}
	
	$rootScope.userAttendInit = function(user){
		/*if(attendLocalStorage.attendStore!=null){
			
			if(attendLocalStorage.attendStore==""){
				
				$rootScope.noSchoolAttended = true;
			}
			else{
				$rootScope.noSchoolAttended = false;
				$rootScope.attendedSchools = attendLocalStorage.attendStore;	
			}
			
		}
		else{*/
			
		getAttendedSchool(user).then(function(data){
			
			if(data.length!=0){
				$rootScope.noSchoolAttended = false;
				$rootScope.attendedSchools = data;
				/*attendLocalStorage.attendStorage(data, function(result){
					$rootScope.attendedSchools = result;
				});*/
			}
			else if(data.length==0){
				$rootScope.attendedSchools = [];
				$rootScope.noSchoolAttended = true;
			}
								
		})
		//}
	}
	
	
	
	$rootScope.removeAttend = function(key){
		
		var progress1 = ngProgressFactory.createInstance();
		progress1.setColor('red');
		
		//$rootScope.refrainAttack = true;
		progress1.reset();
		progress1.start();
		
		
		$http.post(GetContextPath.getContextPath()+"/removeAttendService/?key="+key).success(function(result){
			
			if(result=="200"){
				
				// this will remove from browser local storage
				/*attendLocalStorage.removeAttend(key, function(result){
					if(result==""){
						$rootScope.noSchoolAttended = true;
					}
					$rootScope.attendedSchools = result;
				});*/
				
				
				var l = $rootScope.attendedSchools;
				var len = $rootScope.attendedSchools.length;
				
				for(var i = 0; i < len; i++) {
				    if (l[i].key == key) {
				    	l.splice(i,1);
				    	$rootScope.attendedSchools = l;
				        break;
				    }
				}
				
				if($rootScope.attendedSchools.length==0){
					$rootScope.noSchoolAttended = true;
				}
				
				progress1.complete();
				
				toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">You removed attended university</li></ul>', 5000, 'trustedHtml');
			}
			else if(result=="500"){
				
				progress1.reset();
				
				toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred...</li></ul>', 5000, 'trustedHtml');

			}
			else if(result=="400"){
				
				progress1.reset();
				
				toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred...</li></ul>', 5000, 'trustedHtml');

			}
			
		})
		.error(function(result){
		
			progress1.reset();
			
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Something went wrong...</li></ul>', 5000, 'trustedHtml');

		})
	}	
}])




.service('reviewedUserInfo', ['$rootScope', '$http', "toaster", "$q", "$timeout", "reviewLocalStorage", "ngProgressFactory", "GetContextPath",
                             function($rootScope, $http, toaster, $q, $timeout, reviewLocalStorage, ngProgressFactory, GetContextPath){
	
	
	$rootScope.textReview = null;
	
	$rootScope.noSchoolReviewed = true;
		
	var getReviewedSchool =  function(user){
		
	var moreschools = new Set();
	var deferred = $q.defer();

	
	
	$http.post(GetContextPath.getContextPath()+"/ReviewedByUser/?reviewedby="+user).then(function(result){

	
		
			angular.forEach(result.data,function(value, key){
			
			parts = value.reviewedTo.split('_');
			state = parts.pop();
			parts_new = parts.join('_');
			parts_new = parts_new.split('_');
			cityState = parts_new.pop()+" "+state;
			cityState = cityState.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
			parts.pop();
			instituteId = parts.join(' ');
			instituteId = instituteId.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
			
			moreschools.add({'instituteId':instituteId, 'cityState':cityState, 'key':value.reviewedTo, 'body':value.reviewBody, 
				'ratedNumber':value.ratedNumber, 'oldRatedNumber':value.ratedNumber});
			
			})
		//	deferred.resolve(likeMap);
		deferred.resolve(Array.from(moreschools));
		
	}
	,function(result){
		toaster.clear();
  		toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">'+
				'Connection error...</li></ul>', 5000, 'trustedHtml');
		
	})
	
	return deferred.promise;
	}
	
	$rootScope.userReviewInit = function(user){
		/*if(reviewLocalStorage.reviewStore!=null){
			
			if(reviewLocalStorage.reviewStore==""){
				
				$rootScope.noSchoolReviewed = true;
			}
			else{
				$rootScope.noSchoolReviewed = false;
				$rootScope.reviewedSchools = reviewLocalStorage.reviewStore;	
			}
			
		}
		else{*/
			
		getReviewedSchool(user).then(function(data){
			
			if(data.length!=0){
				$rootScope.noSchoolReviewed = false;
				$rootScope.reviewedSchools = data;
				/*reviewLocalStorage.reviewStorage(data, function(result){
					$rootScope.reviewedSchools = result;
				});*/
			}			
			else if(data.length==0){
				$rootScope.reviewedSchools = [];
				$rootScope.noSchoolReviewed = true;
			}
								
		})
		//}
	}
	
	
	
	function removeReview(key){
			
			var progress1 = ngProgressFactory.createInstance();
			progress1.setColor('red');
			
			//$rootScope.refrainAttack = true;
			progress1.reset();
			progress1.start();
			
			var input = {
							"reviewedTo":key
						}
			
			$http.post(GetContextPath.getContextPath()+"/removeReviewService/", input).success(function(result){
				
				if(result=="200"){
					
					// this will remove from browser local storage
					/*reviewLocalStorage.removeReview(key, function(result){
						if(result==""){
							$rootScope.noSchoolReviewed = true;
						}
						$rootScope.reviewedSchools = result;
					});*/
					
					var l = $rootScope.reviewedSchools;
					var len = $rootScope.reviewedSchools.length;
					
					for(var i = 0; i < len; i++) {
					    if (l[i].key == key) {
					    	l.splice(i,1);
					    	$rootScope.reviewedSchools = l;
					        break;
					    }
					}
					
					if($rootScope.reviewedSchools.length==0){
						$rootScope.noSchoolReviewed = true;
					}
					
					progress1.complete();
					
					toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">You removed a review...</li></ul>', 5000, 'trustedHtml');
				}
				else if(result=="500"){
					
					progress1.reset();
					
					toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred...</li></ul>', 5000, 'trustedHtml');

				}
				else if(result=="400"){
					
					progress1.reset();
					
					toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred...</li></ul>', 5000, 'trustedHtml');

				}
				
			})
			.error(function(result){
			
				progress1.reset();
				
				toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Something went wrong...</li></ul>', 5000, 'trustedHtml');

			})
		}	

	
	
	$rootScope.action = function(id){
			
		var self = this;
							
			$("#"+id).confirmation({ 
				title:"Choose an action!",
				placement:"left",
				btnOkLabel: '<span><i class="fa fa-pencil-square-o"></i> edit</span>', 
				btnCancelLabel: '<i class="fa fa-trash-o"></i> remove', 
				onConfirm:function(){
						$("#review_slide"+id).click();									
					},
				onCancel:function(){	
					
					removeReview(self.s.key);
				},	
				trigger:"click",
				animation:"true",
				popout:"true"
			});
			
	}
	
	
		
	$rootScope.hover1 = false;
	$rootScope.hover2 = false;
	$rootScope.hover3 = false;
	$rootScope.hover4 = false;
	$rootScope.hover5 = false;
	
	
	
	$rootScope.enter1 = function(id){
		
		
		$rootScope.hover1 = id+(10*id);
	}
		
	$rootScope.leave1 = function(id){
		
		$rootScope.hover1 = false;
	}
	
	$rootScope.enter2 = function(id){
		
		$rootScope.hover2 = (id+1)+(10*id);
		$rootScope.hover1 = id+(10*id);
	}
		
	$rootScope.leave2 = function(id){
		$rootScope.hover2 = false;
		$rootScope.hover1 = false;
	}
	
	$rootScope.enter3 = function(id){
		
		$rootScope.hover3 = (id+2)+(10*id);
		$rootScope.hover2 = (id+1)+(10*id);
		$rootScope.hover1 = (id)+(10*id);
	}
		
	$rootScope.leave3 = function(id){
		
		$rootScope.hover3 = false;
		$rootScope.hover2 = false;
		$rootScope.hover1 = false;
	}
	
	
	$rootScope.enter4 = function(id){
		
		$rootScope.hover4 = (id+3)+(10*id);
		$rootScope.hover3 = (id+2)+(10*id);
		$rootScope.hover2 = (id+1)+(10*id);
		$rootScope.hover1 = (id)+(10*id);
	}
		
	$rootScope.leave4 = function(id){
		
		$rootScope.hover4 = false;
		$rootScope.hover3 = false;
		$rootScope.hover2 = false;
		$rootScope.hover1 = false;
	}
	
	$rootScope.enter5 = function(id){
		
		$rootScope.hover5 = (id+4)+(10*id);
		$rootScope.hover4 = (id+3)+(10*id);
		$rootScope.hover3 = (id+2)+(10*id);
		$rootScope.hover2 = (id+1)+(10*id);
		$rootScope.hover1 = (id)+(10*id);
	}
		
	$rootScope.leave5 = function(id){
		
		$rootScope.hover5 = false;
		$rootScope.hover4 = false;
		$rootScope.hover3 = false;
		$rootScope.hover2 = false;
		$rootScope.hover1 = false;
	}
	
		
	var isStarClicked = false;
	//var reviewObj = null;
	var newRatedNumber = 0;
	
	
	
	$rootScope.clickRating  = function(s, n){
		
		isStarClicked = true;
		
		//oldRatedValue = s.ratedNumber		
		
		//reviewObj = s;
		newRatedNumber = n;
		s.ratedNumber = n;
	}	
	
	
	
	$rootScope.cancelReview = function(id,obj){
		$timeout(function(){
			$("#review_slide"+id).click();	
			if(isStarClicked == true){
				obj.ratedNumber = obj.oldRatedNumber;
			}
			
		},1)
		
	}
	
	
	var editingReview = 1;
	
	$rootScope.editReview = function(obj, text, id){
		
		
		
		if(editingReview == 0){
			
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">You have to wait for other updates...</li></ul>', 5000, 'trustedHtml');
			
		}
		else if(editingReview == 1){
			
			editingReview = 0;
			
		
		
		$timeout(function(){
			$("#review_slide"+(id+1)).click();	
		},1)
			
		
		
		
		var progress1 = ngProgressFactory.createInstance();
		progress1.setColor('red');
		
		progress1.reset();
		progress1.start();
		
		//$rootScope.textReview = text;
		
		var oldText = obj.body;
		
		obj.body = text;
		
		if(obj.ratedNumber==obj.oldRatedNumber && text==oldText){
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Please edit your review first...</li></ul>', 5000, 'trustedHtml');
			progress1.reset();
			editingReview = 1;
		}
		else if(obj.ratedNumber==0){
			toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Rating cannot be zero...</li></ul>', 5000, 'trustedHtml');
			progress1.reset();
			editingReview = 1;
		}
		else{
			
			/*obj.body = text;
			obj.ratedNumber = newRatedNumber;
			obj.oldRatedNumber = newRatedNumber;
						
			var store = reviewLocalStorage.reviewStore1();
			
			store[id].body = text; 
			store[id].ratedNumber = newRatedNumber; 
			store[id].oldRatedNumber = newRatedNumber; 
			
			reviewLocalStorage.reviewStorage(store, function(updatedReview){
				$rootScope.reviewedSchools = updatedReview;
			});*/
				 
			
			
			
			var input = {
							"reviewBody":obj.body,							
							"reviewedTo":obj.key,
							"ratedNumber":obj.ratedNumber
						}
			
			$http.post(GetContextPath.getContextPath()+"/editReviewService/", input).success(function(result){
				
				if(result=="200"){
					//obj.body = text;
					//obj.ratedNumber = newRatedNumber;
					obj.oldRatedNumber = newRatedNumber;
					editingReview = 1;
					//var store = reviewLocalStorage.reviewStore1();
					
					/*store[id].body = text; 
					store[id].ratedNumber = newRatedNumber; 
					store[id].oldRatedNumber = newRatedNumber; */
					
					/*reviewLocalStorage.reviewStorage(store, function(updatedReview){
						$rootScope.reviewedSchools = updatedReview;
					});*/
					//$rootScope.reviewedSchools = updatedReview;
					
					progress1.complete();
					
					toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">You updated a review...</li></ul>', 5000, 'trustedHtml');
				}
				else if(result=="500"){
					
					//$rootScope.textReview = oldText;					
					obj.body = oldText;
					obj.ratedNumber = obj.oldRatedNumber;
					
					progress1.reset();
					editingReview = 1;
					toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred...</li></ul>', 5000, 'trustedHtml');

				}
				else if(result=="400"){
					
					//$rootScope.textReview = oldText;					
					obj.body = oldText;
					obj.ratedNumber = obj.oldRatedNumber;
					
					progress1.reset();
					editingReview = 1;
					toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error occurred...</li></ul>', 5000, 'trustedHtml');

				}
				
			})
			.error(function(result){
			
				//$rootScope.textReview = oldText;					
				obj.body = oldText;
				obj.ratedNumber = obj.oldRatedNumber;
				
				progress1.reset();
				editingReview = 1;
				toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Something went wrong...</li></ul>', 5000, 'trustedHtml');

			})
			
			
			
			
			
			
			
			
			
		
		}
		
		
		
	}
	
	}
	
}])


.controller('UserProfileInfoController',['$scope', '$window', '$timeout', '$rootScope', '$routeParams', 'ngProgressFactory', 'editUserInfo', 'settingUserInfo', 'likedUserInfo', 'followedUserInfo', 'attendedUserInfo', 'reviewedUserInfo',     
                                         function($scope, $window, $timeout, $rootScope, $routeParams, ngProgressFactory, editUserInfo, settingUserInfo, likedUserInfo, followedUserInfo, attendedUserInfo, reviewedUserInfo){
	
	$scope.save_user_profile = function(){
		$timeout(function(){			
			$('#edit_user_profile_save').click();	
		},2)
		
	}
	
	
	
	$scope.clickToNavigate = function(path, id){
		$window.open(path+"/UserProfileInfo/#/"+id, "_self");
	}
	
	$rootScope.gen = null;
	
	/*$timeout(function(){
		$('#edit_datepicker').datepicker();		
	},2)*/
		
	$rootScope.infoMode = undefined;
	
	if($routeParams.mode != undefined){
		
		$rootScope.infoMode = $routeParams.mode;
		if($routeParams.mode=='profile'){
			$rootScope.infoModeName = 'Profile Info';
		}
		else if($routeParams.mode=='edit'){
			$rootScope.infoModeName = 'Edit Your Profile';
		}
		else if($routeParams.mode=='setting'){
			$rootScope.infoModeName = 'Change Your Subscription Status';
		}
		else if($routeParams.mode=='liked'){
			$rootScope.infoModeName = 'Universities You Liked';
		}
		else if($routeParams.mode=='followed'){
			$rootScope.infoModeName = 'Universities You Followed';
		}
		else if($routeParams.mode=='attended'){
			$rootScope.infoModeName = 'Universities You Attended';
		}
		else if($routeParams.mode=='reviewed'){
			$rootScope.infoModeName = 'Your Overall Reviews';
		}
		
	}
	else{
		$rootScope.infoMode = "profile";
		$rootScope.infoModeName = "Profile Info"
	}
	
	
	$scope.menuToggle = function(){
	
        $("#wrapper").toggleClass("toggled");
	}
	
	
}])