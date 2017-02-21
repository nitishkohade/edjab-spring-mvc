angular.module("ngEdjab.headerinfo", [])

.service("FrontListViewHeaderInfo", [function(){
	
	this.headerInfo = function(categoryId, dummyLocationId , orderRating){
		
		var headerInfo = "";
		
		if(categoryId=="ALL"){
			categoryId = "";
		}
		
		
		if(categoryId!=undefined){
		categoryId = categoryId.substring(1,0).toUpperCase()+categoryId.substring(1).toLowerCase();
		}		
		
		if(dummyLocationId!=undefined){
		dummyLocationId = dummyLocationId.substring(1,0).toUpperCase()+dummyLocationId.substring(1).toLowerCase();
		}
		if(categoryId==undefined && dummyLocationId==undefined && orderRating=='-averageRating'){
			headerInfo = "Universities having highest rating in order";
		}
		else if(categoryId==undefined && dummyLocationId==undefined && orderRating=='averageRating'){
			headerInfo = "Universities having lowest rating in order";
		}
		else if(categoryId!=undefined && dummyLocationId==undefined && orderRating=='-averageRating'){
			headerInfo = categoryId+" Universities having highest rating in order";
		}
		else if(categoryId!=undefined && dummyLocationId==undefined && orderRating=='averageRating'){
			headerInfo = categoryId+" Universities having lowest rating in order";
		}
		else if(categoryId==undefined && dummyLocationId!=undefined && orderRating=='-averageRating'){
			headerInfo = "Universities having highest rating in order in "+dummyLocationId+" city";
		}
		else if(categoryId==undefined && dummyLocationId!=undefined && orderRating=='averageRating'){
			headerInfo = "Universities having lowest rating in order in "+dummyLocationId+" city";
		}
		else if(categoryId!=undefined && dummyLocationId!=undefined && orderRating=='-averageRating'){
			headerInfo = categoryId+" Universities having highest rating in order in "+dummyLocationId+" city";
		}
		else if(categoryId!=undefined && dummyLocationId!=undefined && orderRating=='averageRating'){
			headerInfo = categoryId+" Universities having lowest rating in order in "+dummyLocationId+" city";
		}
		
		
		return headerInfo;
		
	}
	
}])


.service("FrontMapViewHeaderInfo", [function(){
	
	this.headerInfo = function(categoryId, dummyLocationId){
		
		var headerInfo = "";
		
		if(categoryId=="ALL"){
			categoryId = "";
		}		
		
		if(categoryId!=undefined){
		categoryId = categoryId.substring(1,0).toUpperCase()+categoryId.substring(1).toLowerCase();
		}		
		
		if(dummyLocationId!=undefined){
		dummyLocationId = dummyLocationId.substring(1,0).toUpperCase()+dummyLocationId.substring(1).toLowerCase();
		}
		
		if(categoryId==undefined && dummyLocationId==undefined){
			headerInfo = "Top Rated Universities";
		}
		else if(categoryId==undefined && dummyLocationId!=undefined){
			headerInfo = "Universities in "+dummyLocationId+" city";
		}
		else if(categoryId!=undefined && dummyLocationId==undefined){
			headerInfo = categoryId+" Universities in India";
		}
		else if(categoryId!=undefined && dummyLocationId!=undefined){
			headerInfo = categoryId+" Universities in "+dummyLocationId+" city";
		}
		
		return headerInfo;
		
	}
	
}])








.service("FrontListViewNearbyHeaderInfo", [function(){
	
	this.headerInfo = function(categoryId, range , orderRating){
		
		var headerInfo = "";
		
		if(categoryId=="ALL"){
			categoryId = "";
		}
		
		if(categoryId!=undefined){
		categoryId = categoryId.substring(1,0).toUpperCase()+categoryId.substring(1).toLowerCase();
		}		
		
		
		if(categoryId==undefined && range==undefined){
			headerInfo = "Please allow this website to track your location";
		}
		else if(categoryId!=undefined && range==undefined && orderRating=='-averageRating'){
			headerInfo = categoryId+" Universities having highest rating in order";
		}
		else if(categoryId!=undefined && range==undefined && orderRating=='averageRating'){
			headerInfo = categoryId +" Universities having lowest rating in order";
		}
		else if(categoryId!=undefined && range!=undefined && orderRating=='-averageRating'){
			headerInfo = categoryId+" Universities having highest rating in order within "+range+" Km in range";
		}
		else if(categoryId!=undefined && range!=undefined && orderRating=='averageRating'){
			headerInfo = categoryId+" Universities having lowest rating in order within "+range+" Km in range";
		}
		else if(categoryId==undefined && range!=undefined && orderRating=='-averageRating'){
			headerInfo = "Universities having highest rating in order within "+range+" Km in range";
		}
		else if(categoryId==undefined && range!=undefined && orderRating=='averageRating'){
			headerInfo = "Universities having lowest rating in order within "+range+" Km in range";
		}
		
		
		
		return headerInfo;
		
	}
	
}])


.service("FrontMapViewNearbyHeaderInfo",[function(){
	this.headerInfo = function(categoryId, range){
		
		var headerInfo = "";
		
		if(categoryId=="ALL"){
			categoryId = "All Indian";
		}		
		
		if(categoryId!=undefined){
		categoryId = categoryId.substring(1,0).toUpperCase()+categoryId.substring(1).toLowerCase();
		}		
		
				
		if(categoryId==undefined && range==undefined){
			headerInfo = "Please allow this website to track your location";
		}
		else if(categoryId!=undefined && range==undefined){
			headerInfo = categoryId+" Universities";
		}
		else if(categoryId!=undefined && range!=undefined){
			headerInfo = categoryId+" Universities within "+range+" Km in range from your location";
		}
		else if(categoryId==undefined && range!=undefined){
			headerInfo = "Top Universities within "+range+" Km in range from your location";
		}
		
		return headerInfo;
		
	}
}])