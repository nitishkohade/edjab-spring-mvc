angular.module('ngEdjab.userprofileservices', [])


.service("likeLocalStorage", ['localStorageService', function(localStorageService){
	
	this.likeStorage = function(s, scopeFunction){
		
		localStorageService.set("likeStore", s);
		like = localStorageService.get("likeStore");
		scopeFunction(like);
		
	}
	
	
	this.isLocalStorageSupported = function(){
		if(localStorageService.isSupported) {
		    return true;
		  }
		else{
			return false;
		}
	}
		
	
	this.removeLikeStore = function(){
		localStorageService.remove("likeStore");
	} 
	
	this.likeStore = localStorageService.get("likeStore");
	
	this.removeLike = function(key, callBack){
		var l = localStorageService.get("likeStore");
		var len = localStorageService.get("likeStore").length;
		
		for(var i = 0; i < len; i++) {
		    if (l[i].key == key) {
		    	l.splice(i,1);
		    	localStorageService.set("likeStore", l);
		        break;
		    }
		}
		
		callBack(localStorageService.get("likeStore"));
	}
	
}])


.service("followLocalStorage", ['localStorageService', function(localStorageService){
	
	this.followStorage = function(s, scopeFunction){
		
		localStorageService.set("followStore", s);
		follow = localStorageService.get("followStore");
		scopeFunction(follow);
		
	}
	
	this.isLocalStorageSupported = function(){
		if(localStorageService.isSupported) {
		    return true;
		  }
		else{
			return false;
		}
	}
		
	
	this.removeFollowStore = function(){
		localStorageService.remove("followStore");
	} 
	
	this.followStore = localStorageService.get("followStore");
	
	this.removeFollow = function(key, callBack){
		var l = localStorageService.get("followStore");
		var len = localStorageService.get("followStore").length;
		
		for(var i = 0; i < len; i++) {
		    if (l[i].key == key) {
		    	l.splice(i,1);
		    	localStorageService.set("followStore", l);
		        break;
		    }
		}
		
		callBack(localStorageService.get("followStore"));
	}
	
}])


.service("attendLocalStorage", ['localStorageService', function(localStorageService){
	
	this.attendStorage = function(s, scopeFunction){
		
		localStorageService.set("attendStore", s);
		attend = localStorageService.get("attendStore");
		scopeFunction(attend);
		
	}
	
	this.isLocalStorageSupported = function(){
		if(localStorageService.isSupported) {
		    return true;
		  }
		else{
			return false;
		}
	}
		
	
	this.removeAttendStore = function(){
		localStorageService.remove("attendStore");
	} 
	
	this.attendStore = localStorageService.get("attendStore");
	
	this.removeAttend = function(key, callBack){
		var l = localStorageService.get("attendStore");
		var len = localStorageService.get("attendStore").length;
		
		for(var i = 0; i < len; i++) {
		    if (l[i].key == key) {
		    	l.splice(i,1);
		    	localStorageService.set("attendStore", l);
		        break;
		    }
		}
		
		callBack(localStorageService.get("attendStore"));
	}
	
}])


.service("reviewLocalStorage", ['localStorageService', function(localStorageService){
	
	this.reviewStorage = function(s, scopeFunction){
		
		localStorageService.set("reviewStore", s);
		review = localStorageService.get("reviewStore");
		scopeFunction(review);
		
	}
	
	this.isLocalStorageSupported = function(){
		if(localStorageService.isSupported) {
		    return true;
		  }
		else{
			return false;
		}
	}
		
	
	
	this.removeReviewStore = function(){
		localStorageService.remove("reviewStore");
	} 
	
	this.reviewStore = localStorageService.get("reviewStore");
	
	this.reviewStore1 = function(){return localStorageService.get("reviewStore");} 
	
	this.removeReview = function(key, callBack){
		var l = localStorageService.get("reviewStore");
		var len = localStorageService.get("reviewStore").length;
		
		for(var i = 0; i < len; i++) {
		    if (l[i].key == key) {
		    	l.splice(i,1);
		    	localStorageService.set("reviewStore", l);
		        break;
		    }
		}
		
		callBack(localStorageService.get("reviewStore"));
	}
	
}])