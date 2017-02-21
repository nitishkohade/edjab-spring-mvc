<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="ngEdjab">
<head>
<link rel="shortcut icon" href="/img/icon/icon.png" />
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Activate Account</title>

<style>

[ng\:cloak], [ng-cloak], .ng-cloak {
  display: none !important;
}
</style>

<%@ include file="../style/validate_style.jsp"%>

</head>
<body>

	
	<%@ include file="../included pages/common/header/header.jsp"%>
	
	<!-- Here these are hidden spaces in order to make them available later for some additive features-->
	<div class="container-fluid" style="visibility: hidden;">invisible
		content</div>
	<div class="container-fluid" style="visibility: hidden;">invisible
		content</div>
	

	<%@ include file="../included pages/common/activate/activate.jsp"%>
	
	<%@ include file="../global/global.jsp"%>
	
	
</body>
</html>