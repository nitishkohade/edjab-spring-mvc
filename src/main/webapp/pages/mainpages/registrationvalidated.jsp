<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="ngEdjab">
<head>
<link rel="shortcut icon" href="/img/icon/icon.png" />
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Validate Registration</title>

<style>
[ng\:cloak], [ng-cloak], .ng-cloak {
	display: none !important;
}
</style>

<%@ include file="../style/validate_style.jsp"%>

</head>
<body>

	<toaster-container
		toaster-options="{'time-out': 10000, 'close-button':true, 'animation-class': 'toast-top-right'}">
	</toaster-container>

	<%@ include file="../included pages/common/header/header.jsp"%>

	<div class="container-fluid" style="visibility: hidden;">invisible
		content</div>
	<div class="container-fluid" style="visibility: hidden;">invisible
		content</div>
	<div class="container-fluid" style="visibility: hidden;">invisible
		content</div>

	<%@ include
		file="../included pages/registration_validate/registration_validate.jsp"%>

	<%@ include file="../global/global.jsp"%>
</body>
</html>