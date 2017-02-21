<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="ngEdjab">
<head>
<link rel="shortcut icon" href="/img/icon/icon.png" />
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Register</title>

<style>
[ng\:cloak], [ng-cloak], .ng-cloak {
	display: none !important;
}
</style>

<%@ include file="../../../style/register_style.jsp"%>

</head>
<body ng-controller="FacebookController">

	<br>
	<br>
	<br>

	<div ng-controller="GoogleController">

		<%@ include file="../../../included pages/common/header/header.jsp"%>

		<div ng-controller="LoginRegisterController">
			<div ng-controller="ValidateRegistrationController"
				id="register_form" class="row" style="display: block;">

				<toaster-container
					toaster-options="{'time-out': 3000, 'close-button':true, 'animation-class': 'toast-top-right'}">
				</toaster-container>

				<div class="col-md-4 col-lg-4 col-sm-4 "></div>
				<div class="col-md-4 col-lg-4 col-sm-4 ">

					<h3 class="text-center">
						<div class="row">
							<div class="col-md-12 col-lg-12 col-sm-12 ">
								<div class="col-md-4 col-lg-4 col-sm-4 ">
									<h3
										style="text-align: center; font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
										<a style="font-size: 23px;" href="/login" id="login_link">Signin</a>
									</h3>
								</div>
								<div class="col-md-4 col-lg-4 col-sm-4 "></div>
								<div class="col-md-4 col-lg-4 col-sm-4 ">
									<h3
										style="text-align: center; font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
										<a style="font-size: 23px;" href="/register" class="active"
											id="register_link">Register</a>
									</h3>
								</div>
							</div>
						</div>
					</h3>
					<hr id="signup_hr">
					<div class="row-fluid">

						<div class="col-md-6 col-lg-6 col-sm-6 ">
							<a ng-click="googleLogIn()" style="border-radius: 5px;"
								class="btn btn-block btn-social btn-google-plus"> <i
								class="fa fa-google-plus"> </i> <span
								style="border: 0; text-align: center; font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;">
									Google</span>
							</a>
						</div>
						<div class="col-md-6 col-lg-6 col-sm-6 ">
							<a ng-click="loginFacebook()" style="border-radius: 5px;"
								class="btn btn-block btn-social btn-facebook"> <i
								class="fa fa-facebook"> </i> <span
								style="border: 0; text-align: center; font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;">
									Facebook</span>
							</a>
						</div>

					</div>

					<div class="list-inline text-center">
						<li><br>
							<h4>
								<span
									style="text-align: center; font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;">OR
								</span>
							</h4></li>
					</div>

					<p ng-cloak class="bg-danger text-center"
						style="font-family: Times New Roman, Times, serif;"
						ng-show="registerError==true">Something wrong happened, please
						register again</p>
					<p ng-cloak class="bg-success text-center"
						style="font-family: Times New Roman, Times, serif;"
						ng-show="registerError==false">Successfully Registered, Please
						validate your email in order to login to your account!</p>
					<p ng-cloak class="bg-success text-center"
						style="font-family: Times New Roman, Times, serif;"
						ng-show="registerError=='400'">Already registered, please
						login...</p>

					<form ng-submit="onRegister()" novalidate autocomplete="off">


						<div class="form-group" ng-class="{'has-error':fieldError}">
							<label
								style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
								for="email" class="control-label">Email</label> <input
								ng-keydown="registerError=null" style="border: 0;"
								style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;font-size:18px;"
								type="email" class="form-control" id="email" ng-maxLength="200"
								ng-maxLength-err-type="email_max_length"
								ng-model="registerModal.emailId" required autocomplete="off"
								readonly onfocus="this.removeAttribute('readonly');" />
						</div>


						<div class="form-group" ng-class="{'has-error':fieldError}">
							<label
								style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
								for="password" class="control-label">Password</label> <input
								type="password" style="border: 0;"
								ng-keydown="registerError=null" class="form-control"
								id="password" ng-minLength="6" ng-maxLength="25"
								ng-minLength-err-type="password_length_error"
								ng-pattern="/^(?=.*[A-Z])(?=.*\d).+$/"
								ng-pattern-err-type="password_error" name="password"
								ng-model="registerModal.password" required autocomplete="off"
								readonly onfocus="this.removeAttribute('readonly');" />
						</div>

						<div class="form-group" ng-class="{'has-error':fieldError}">
							<label
								style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
								for="confirm password" class="control-label">Confirm
								Password</label> <input type="password" style="border: 0;"
								ng-keydown="registerError=null" class="form-control"
								id="confirm_password" name="confirm_password"
								ng-model="registerModal.confirmPassword"
								equals-to="registerModal.password"
								equalsTo-err-type="confirm_password_error" required
								autocomplete="off" readonly
								onfocus="this.removeAttribute('readonly');" />
						</div>

						<br>
						<div class="form-group">
							<button
								style="border: 0; text-align: center; font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
								class="btn btn-primary btn-block" ladda="submitting"
								data-style="expand-right" type="submit">
								<span ng-show="!submitting">Register</span> <span ng-cloak
									ng-show="submitting">Registering</span>

							</button>
						</div>
					</form>

				</div>
				<div class="col-md-4 col-lg-4 col-sm-4 col-xs-4"></div>
			</div>
			<%@ include file="../../../global/global.jsp"%>

		</div>
	</div>

	<br>
	<br>
	<br>
	<br>
	<br>
	<%@ include file="../../../included pages/common/footer/footer.jsp"%>

</body>
</html>