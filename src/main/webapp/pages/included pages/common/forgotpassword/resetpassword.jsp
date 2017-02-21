
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="ngEdjab">
<head>
<link rel="shortcut icon" href="/img/icon/icon.png" />
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Password Recovery</title>

<style>
[ng\:cloak], [ng-cloak], .ng-cloak {
	display: none !important;
}
</style>

<%@ include file="../../../style/validate_style.jsp"%>

</head>
<body ng-controller="FacebookController">
	<br>
	<br>
	<br>
	<div ng-controller="GoogleController">


		<%@ include file="../../../included pages/common/header/header.jsp"%>


		<div ng-controller="ResetPasswordController">



			<toaster-container
				toaster-options="{'time-out': 3000, 'close-button':true, 'animation-class': 'toast-top-right'}">
			</toaster-container>


			<h1
				style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
				<b><font color="blue">Now you can reset your password !</font></b>
			</h1>

			<h4
				style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
				<b><font color="black">Please input these fields in order
						to reset your password.. </font></b>
			</h4>
			<br> <br> <input style="display: none"
				ng-model="emailId='${userId}'"> <input style="display: none"
				ng-model="token='${token}'">

			<div class="container">
				<div class="row">
					<div class="col-md-4 col-md-offset-4">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3
									style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 20px;"
									class="panel-title">Reset Password</h3>
							</div>
							<div class="panel-body">

								<fieldset>
									<form ng-submit="onReset()" novalidate autocomplete="off">


										<div class="form-group">
											<label
												style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
												for="password" class="control-label">Password</label> <input
												type="password" ng-keydown="passwordError=null"
												class="form-control" id="password" ng-minLength="6"
												ng-maxLength="25" ng-pattern-err-type="password_error"
												ng-pattern="/^(?=.*[A-Z])(?=.*\d).+$/" name="password"
												ng-model="password" required autocomplete="off" readonly
												onfocus="this.removeAttribute('readonly');" />
										</div>

										<div class="form-group">
											<label
												style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
												for="confirm password" class="control-label">Confirm
												Password</label> <input type="password"
												ng-keydown="passwordError=null" class="form-control"
												id="confirm_password" name="confirm_password"
												ng-model="confirmPassword" equals-to="password"
												equalsTo-err-type="confirm_password_error" required
												autocomplete="off" readonly
												onfocus="this.removeAttribute('readonly');" />
										</div>


										<button
											style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 20px; margin-top: 25px; position: relative;"
											id="generate_token" class="btn btn-success btn-lg btn-block"
											ladda="resetPassword" data-style="expand-right" type="submit">
											<span ng-show="!resetPassword">Submit</span> <span ng-cloak
												ng-show="resetPassword">Submitting</span>
										</button>
									</form>



								</fieldset>


							</div>

						</div>

					</div>
				</div>
			</div>


			<br>
			<h4>

				<p ng-cloak class="bg-danger text-center"
					style="font-variant: small-caps; font-family: Times New Roman, Times, serif;"
					ng-show="passwordError==true">We are experiencing disturbance
					with our server, please try again after 10-15 minutes...</p>
				<p ng-cloak class="bg-success text-center"
					style="font-variant: small-caps; font-family: Times New Roman, Times, serif;"
					ng-show="passwordError==false">Password's been modified
					successfully...</p>
				<p ng-cloak class="bg-danger text-center"
					style="font-variant: small-caps; font-family: Times New Roman, Times, serif;"
					ng-show="passwordError=='400'">The forwarded link to your
					mailing address doesn't seem to be the correct one. Please open the
					latest link or generate another token</p>

			</h4>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<%@ include file="../../../global/global.jsp"%>
		</div>

	</div>

	<%@ include file="../../../included pages/common/footer/footer.jsp"%>

</body>
</html>