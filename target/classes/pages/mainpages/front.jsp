<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="ngEdjab">
<head>
 <link rel="shortcut icon" href="/img/icon/icon.png"/>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Search Colleges</title>

<style>

[ng\:cloak], [ng-cloak], .ng-cloak {
  display: none !important;
}
</style>

<%@ include file="../style/front_page_style.jsp"%> 

</head>
<body 
style="font-family: Times New Roman, Times, serif; font-family: Courier;font-variant: small-caps;font-size:16px;"
 ng-controller="FacebookController">

		<toaster-container 
        toaster-options="{'time-out': 10000, 'close-button':true, 'animation-class': 'toast-top-right'}">
    	</toaster-container>

    <div ng-controller="GoogleController">
	<div ng-controller="PanelSlideDownController">
	
		
	<%@ include file="../included pages/common/header/header.jsp"%>
	
 	 <%@ include file="../included pages/common/panelslidedown&area_with_three_buttons/panelslidedown&area_with_three_buttons.jsp"%>
	<br>
	
	<%@ include file="../included pages/view/view.jsp" %>
	
	<br><br>
		
	
	<%@ include file="../included pages/common/footer/footer.jsp"%>
		
	
	
 <%@ include file="../global/global.jsp"%> 
	
	<script type="text/javascript" 	src="/js/onload/enable_cookie_new.js"></script>
		
	
			
	 </div>
	</div>
		
</body>
</html>