<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="ngEdjab">
<head>
<link rel="shortcut icon" href="/img/icon/icon.png" />
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${instituteName}</title>

<style>

[ng\:cloak], [ng-cloak], .ng-cloak {
  display: none !important;
}

</style>

<%@ include file="../style/school_page_style.jsp"%>

</head>

<body style="background: #f4f4f4;" 
 ng-controller="FacebookController">
			
		<toaster-container 
        toaster-options="{'time-out': 10000, 'close-button':true, 'animation-class': 'toast-top-right'}">
    	</toaster-container>
			
	
	<div ng-controller="GoogleController">
	<div ng-controller="PanelSlideDownController">
	
		<span style="font-family: Times New Roman, Times, serif; font-family: Courier;font-variant: small-caps;font-size:16px;">
	<%@ include file="../included pages/common/header/header.jsp"%>
		</span>
	</div>
	<br>
	<div ng-controller="SchoolProfileController">
	<br/><br/><br/><br/>
	<%@ include file="../included pages/school/profile/schoolprofile.jsp"%>
	</div>
	<div ng-controller="LinkDashboardController">
	<%@ include file="../included pages/school/dashboard/linkdashboard.jsp"%>
	</div>
	<div id="about_area">
	<%@ include file="../included pages/school/about/about.jsp"%>
	</div>
	<div id="map_area" ng-controller="SchoolMapController">
	<%@ include file="../included pages/school/map/locationmap.jsp"%>
	</div>
	<div id="photo_area" ng-controller="SchoolPhotoController">
	<%@ include file="../included pages/school/photos/photos.jsp"%>
	</div>
	 <div id="video_area" ng-controller="SchoolVideoController">
	<%@ include file="../included pages/school/videos/videos.jsp"%>
	</div>
	<div id="comment_area"  ng-controller="SchoolReviewController">
	<%@ include file="../included pages/school/review/review.jsp"%>
	</div>
	
	<a href="#" class="scrollup">Scroll</a>
	
	<br><br><br>
	
	<div id="footer_area">
	<%@ include file="../included pages/common/footer/footer.jsp"%>
	</div>
	
	<%@ include file="../global/global.jsp"%>
	
 </div>
	
</body>
</html>