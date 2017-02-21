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


		<div ng-controller="GenerateTokenController">


			<toaster-container
				toaster-options="{'time-out': 3000, 'close-button':true, 'animation-class': 'toast-top-right'}">
			</toaster-container>

			<h1
				style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
				<b><font color="blue">Password not found !</font></b>
			</h1>

			<h4
				style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
				<b><font color="black">Please input your registered
						emailId and upon submit, a LINK would be sent to your email
						address. Please follow that link in order to reset your password.</font></b>
			</h4>
			<br> <br>


			<div class="container">
				<div class="row">
					<div class="col-md-4 col-md-offset-4">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3
									style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 20px;"
									class="panel-title">Generate Token</h3>
							</div>
							<div class="panel-body">

								<fieldset>
									<form
										style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 17px;"
										ng-submit="onGenerate()" novalidate autocomplete="off">


										<div class="form-group" ng-class="{'has-error':fieldError}">
											<label
												style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
												for="confirmEmailId" class="control-label">Confirm
												EmailId</label> <input ng-keydown="tokenError=null"
												style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
												type="email" ng-maxLength="200"
												ng-maxLength-err-type="email_max_length"
												class="form-control" id="emailId" ng-model="emailId"
												required autocomplete="off" readonly
												onfocus="this.removeAttribute('readonly');" />
										</div>
										<button
											style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 20px; margin-top: 25px; position: relative;"
											id="generate_token" class="btn btn-success btn-lg btn-block"
											ladda="generatingToken" data-style="expand-right"
											type="submit">
											<span ng-show="!generatingToken">Confirm</span> <span
												ng-cloak ng-show="generatingToken">Confirming</span>
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
				<p ng-cloak class="bg-success text-center"
					style="font-variant: small-caps; font-family: Times New Roman, Times, serif;"
					ng-show="tokenError=='400'">Email Id doesn't exist...</p>

				<p ng-cloak class="bg-danger text-center"
					style="font-variant: small-caps; font-family: Times New Roman, Times, serif;"
					ng-show="tokenError==true">Sorry, we could not send you a link
					to your mail at present, we are experiencing disturbance with our
					server, please try again after 10-15 minutes...</p>
				<p ng-cloak class="bg-success text-center"
					style="font-variant: small-caps; font-family: Times New Roman, Times, serif;"
					ng-show="tokenError==false">A link has been sent successfully
					at your mail, Please follow that link to renew your password...</p>

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
