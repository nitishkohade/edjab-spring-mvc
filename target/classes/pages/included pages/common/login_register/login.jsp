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
<title>Login</title>

<style>
[ng\:cloak], [ng-cloak], .ng-cloak {
	display: none !important;
}
</style>

<%@ include file="../../../style/login_style.jsp"%>

</head>
<body ng-controller="FacebookController">
	<br>
	<br>
	<br>

	<div ng-controller="GoogleController">

		<%@ include file="../../../included pages/common/header/header.jsp"%>
		<div ng-controller="ValidateRegistrationController">
			<div ng-controller="LoginRegisterController" class="row"
				id="login_form" style="display: block;">

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
										<a style="font-size: 23px;" href="/login" class="active"
											id="login_link">Signin</a>
									</h3>
								</div>
								<div class="col-md-4 col-lg-4 col-sm-4 "></div>
								<div class="col-md-4 col-lg-4 col-sm-4 ">
									<h3
										style="text-align: center; font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
										<a style="font-size: 23px;" href="/register"
											id="register_link">Register</a>
									</h3>
								</div>
							</div>
						</div>
					</h3>
					<hr id="signup_hr">
					<div ng-controller="FacebookController" class="row-fluid">
						<div ng-controller="GoogleController">

							<div class="col-md-6 col-lg-6 col-sm-6 ">
								<a ng-click="googleLogIn()" style="border-radius: 5px;"
									class="btn btn-block btn-social btn-google-plus"> <i
									class="fa fa-google-plus"> </i> <span
									style="border: 0; font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;">Google</span>
								</a>
							</div>
							<div class="col-md-6 col-lg-6 col-sm-6 ">
								<a ng-click="loginFacebook()" style="border-radius: 5px;"
									class="btn btn-block btn-social btn-facebook"> <i
									class="fa fa-facebook"> </i> <span
									style="border: 0; font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;">
										Facebook</span>
								</a>
							</div>
						</div>
					</div>

					<div class="list-inline text-center">
						<li><br>
						<h4
								style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 20px;">OR</h4></li>
					</div>

					<p ng-cloak class="bg-danger text-center"
						style="font-family: Times New Roman, Times, serif;"
						ng-show="loginError=='400'">Password is incorrect, Please
						login again</p>
					<p ng-cloak class="bg-danger text-center"
						style="font-family: Times New Roman, Times, serif;"
						ng-show="loginError=='404'">EmailId not registered, Please
						register with this id...</p>
					<p ng-cloak class="bg-danger text-center"
						style="font-family: Times New Roman, Times, serif;"
						ng-show="loginError=='408'">You will be redirected to the
						activation page, please wait...</p>
					<p ng-cloak class="bg-danger text-center"
						style="font-family: Times New Roman, Times, serif;"
						ng-show="loginError==false">Successfully logged in...</p>
					<p ng-cloak class="bg-danger text-center"
						style="font-family: Times New Roman, Times, serif;"
						ng-show="loginError==true">Something wrong happened, please
						login again...</p>


					<div style="padding: 10px; padding-bottom: 20px;">
						<form ng-submit="onLogin()" autocomplete="off" novalidate>


							<div class="form-group" ng-class="{'has-error':fieldError}">
								<label
									style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
									for="email" class="control-label">Email</label> <input
									ng-keydown="loginError=null"
									style="border: 0; font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
									type="email" ng-model-options="{updateOn: 'blur'}"
									class="form-control" id="emailId" ng-maxLength="200"
									ng-maxLength-err-type="email_max_length" name="emailId"
									ng-model="loginModal.emailId" required autocomplete="off"
									readonly onfocus="this.removeAttribute('readonly');" />
							</div>


							<div class="form-group" ng-class="{'has-error':fieldError}">
								<label
									style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
									for="password" class="control-label">Password</label> <input
									style="border: 0;" ng-keydown="loginError=null" type="password"
									ng-model-options="{updateOn: 'blur'}" class="form-control"
									id="password" ng-minLength="6" ng-maxLength="25"
									ng-pattern-err-type="password_error"
									ng-pattern="/^(?=.*[A-Z])(?=.*\d).+$/" name="password"
									ng-model="loginModal.password" required autocomplete="off"
									readonly onfocus="this.removeAttribute('readonly');" />
							</div>


							<div>
								<div style="text-align: center;">
									<a style="text-decoration: none; color: blue;&gt;"
										href="/RenewPassword/GenerateToken"> <span
										style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 21px;">Forgot
											your password?</span></a>
								</div>
								<br>
								<div class="checkbox">
									<label><input ng-model="loginModal.rememberme"
										style="float: left; top: -2px; margin-right: 10px; font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
										type="checkbox" name="rememberme" id="rememberme">
										Remember Me </label>
								</div>
							</div>
							<div class="form-group">
								<button
									style="border: 0; font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 17px;"
									class="btn btn-primary btn-block" ladda="signIn"
									data-style="expand-right" type="submit">
									<span ng-show="!signIn">Sign In</span> <span ng-cloak
										ng-show="signIn">Signing In</span>

								</button>
							</div>
						</form>
					</div>

				</div>
				<div class="col-md-4 col-lg-4 col-sm-4 "></div>

			</div>
		</div>
		<%@ include file="../../../global/global.jsp"%>

	</div>

	<br>
	<br>
	<br>

	<%@ include file="../../../included pages/common/footer/footer.jsp"%>

</body>
</html>