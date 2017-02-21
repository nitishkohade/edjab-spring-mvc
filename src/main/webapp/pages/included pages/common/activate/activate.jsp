
<div ng-controller="FacebookController">
	<div ng-controller="GoogleController">

<div ng-controller="ActivateUserController">
		
		<toaster-container 
        toaster-options="{'time-out': 3000, 'close-button':true, 'animation-class': 'toast-top-right'}">
        </toaster-container>
<h1
	style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
	<b><font color="blue">Account Deactivated!</font></b>
</h1>
<h4
	style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
	<b><font color="black">Please activate your account and
			upon submit, a LINK would be sent to your email address. Please
			follow that link in order to activate.</font></b>
</h4>
<br>
<br>
<div class="container">
	<div class="row">
		<div class="col-md-4 col-md-offset-4">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h3 
					style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;font-size:20px;"
					class="panel-title">
					Account Activation 
				    </h3>
				</div>
				<div class="panel-body">
					<fieldset>
						<form 
						style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;font-size:17px;"
						ng-submit="onActivate()" novalidate autocomplete="off">
							  <div class="form-group">
				                <label
				                style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;font-size:18px;" 
				                for="emailId" 
				                       class="control-label">Deactivated EmailId</label>
				                <input 
				                
				                style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;font-size:18px;"
				                type="email" 
				                ng-maxLength="200" 
                       			ng-maxLength-err-type="email_max_length"
		                       class="form-control" 
		                       ng-model="emailId='${user_id_request}'"
		                       required autocomplete="off" readonly onfocus="this.removeAttribute('readonly');"/>
				            	</div>
							<button  							
							style=" font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;font-size:20px;
							margin-top: 25px;
							position: relative;" 
							id="activate_user"
							class="btn btn-success btn-lg btn-block"
							ladda="activatingUser"
					    	data-style="expand-right"
							type="submit">
								<span ng-show="!activatingUser">Activate</span>
					            <span ng-cloak ng-show="activatingUser">Activating</span>
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
<p ng-cloak class="bg-success text-center" style=" font-variant: small-caps;font-family: Times New Roman, Times, serif;"
					 ng-show="moreClick==true">You cannot try more than once upon success, Please access your Account where you would have received an activation link...</p>
				
<p ng-cloak class="bg-danger text-center" style="font-variant: small-caps;font-family: Times New Roman, Times, serif;"
					 ng-show="activationError==true">Sorry, we could not send you a link to your mail at present, we are experiencing disturbance with our server, please try again after 10-15 minutes...</p>

<p ng-cloak class="bg-success text-center" style=" font-variant: small-caps;font-family: Times New Roman, Times, serif;"
					 ng-show="activationError==false">A link has been sent successfully at your mailing address, Please follow that link to activate your account...</p>
</h4>
<br><br><br><br><br><br>
</div>
</div>

<%@ include file="../../../included pages/common/footer/footer.jsp"%>

</div>