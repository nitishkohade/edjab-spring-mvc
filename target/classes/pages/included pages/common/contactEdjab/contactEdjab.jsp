	<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="ngEdjab">
<head>
<link rel="shortcut icon" href="/img/icon/icon.png" />
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Contact Edjab</title>

<style>

#map-row {}
#map-overlay {
    height:300px;
    margin-top:-405px;
    background-color:#669de5;
    padding:40px;
}

[ng\:cloak], [ng-cloak], .ng-cloak {
  display: none !important;
}
</style>

<%@ include file="../../../style/contact_style.jsp"%>

</head>
<body style="font-family: Times New Roman, Times, serif; font-family: Courier;font-variant: small-caps;font-size:16px;" ng-controller="FacebookController">
<br><br><br>
	<div ng-controller="GoogleController">
	
		<div ng-controller="ContactMeController">
	<%@ include file="../../../included pages/common/header/header.jsp"%>
		
		
		
		<toaster-container 
        toaster-options="{'time-out': 3000, 'close-button':true, 'animation-class': 'toast-top-right'}">
        </toaster-container>






<div id="map-row" class="row">
    <div class="col-xs-12">
    
        <!-- PASTE GOOGLE MAP IFRAME HERE. ENSURE HEIGHT MATCHES IN CSS .map-overlay CLASS. -->
    	<!-- <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&q=15+Springfield+Way,+Hythe,+CT21+5SH&aq=t&sll=52.8382,-2.327815&sspn=8.047465,13.666992&ie=UTF8&hq=&hnear=15+Springfield+Way,+Hythe+CT21+5SH,+United+Kingdom&t=m&z=14&ll=51.077429,1.121722&output=embed"></iframe> -->
        <iframe src="http://mapbuildr.com/frame/hbt3fi" frameborder="0" height="400" width="100%"></iframe>
        
        <!-- /IFRAME -->
        
          <div id="map-overlay" class="col-lg-3  col-lg-offset-1 col-md-3  col-md-offset-1 col-sm-3  col-sm-offset-1 col-xs-6  col-xs-offset-1 ">
    		<h2 style="margin-top:0;color:#fff;">Contact us</h2>
    		<address style="color:#fff;">
    			<strong>Edjab</strong><br>    			
	    			<a 
	    			style="text-decoration: none;color:white;" 
	    			href="mailto:edjab.org@gmail.com?Subject=Hello%20again" target="_top"">
	    			edjab.org@gmail.com
	    			</a>
	    			<br>
	    			Delhi, India
	    			<br>
	    			<abbr 
	    			title="Phone">
	    			Tel:
	    			</abbr> 
	    			+91 8527 057 489
    		</address>
    	</div>
    </div>
</div>

<br><br>

	
			

<div class="container">
	<div class="row">
		<div class="col-md-4 col-md-offset-4">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h3 
					class="panel-title">
					Contact Me
				    </h3>
				</div>
				<div class="panel-body">

					<fieldset>
						<form ng-submit="onContactMe()" novalidate autocomplete="off">
						
							<input style="display:none;" ng-model="no_e='${no_e}'" />
							<input style="display:none;" ng-model="e='${user_emailId}'" />
							  	 <div class="form-group" ng-class="{'has-error':fieldError}">
				                <label for="EmailId" 
				                       class="control-label">EmailId</label>
				                <input type="email"  ng-init="emailId='${user_emailId}'"  
				                		ng-keydown="contactMeError=null"
				                       class="form-control" 
				                       id="emailId"  
				                       ng-model="emailId"
				                       required autocomplete="off" readonly onfocus="this.removeAttribute('readonly');"/>
				            	</div>
				            	<div class="form-group" ng-class="{'has-error':fieldError}">
  								<label 	for="message"
  										class="control-label">Message</label>
  								<textarea 	class="form-control" 
  											ng-keydown="contactMeError=null"
  											rows="5" 
  											id="message"  
				                       		ng-model="message"
				                       		ng-minLength="20"
                       				   		ng-maxLength="2000" 
                       				   		ng-pattern-err-type="message_error"
				                       		required autocomplete="off" 
				                       		readonly onfocus="this.removeAttribute('readonly');">
  								</textarea>
								</div>
								<div 
								class="form-group">
							<button  
							style="margin-top: 25px;
							position: relative;" 
							id="send_message"
							class="btn btn-success btn-lg btn-block"
							ladda="sendingMessage"
					    	data-style="expand-right"
							type="submit">
								<span ng-show="!sendingMessage">Send</span>
					            <span ng-cloak ng-show="sendingMessage">Sending</span>
							</button>
							</div>
						</form>
						
						

					</fieldset>


				</div>
				
				</div>
			
		</div>
	</div>
</div>


<h4>
<p ng-cloak class="bg-success text-center" style=" font-variant: small-caps;font-family: Times New Roman, Times, serif;"
					 ng-show="contactMeError=='500'">Server Error, please send again, sorry for this inconvenience</p>

<p ng-cloak class="bg-success text-center" style=" font-variant: small-caps;font-family: Times New Roman, Times, serif;"
					 ng-show="contactMeError=='400'">EmailId <span ng-bind="emailId"></span> doesn't  exist, please provide the correct address</p>

<p ng-cloak class="bg-success text-center" style=" font-variant: small-caps;font-family: Times New Roman, Times, serif;"
					 ng-show="contactMeError=='e_error'">Your emailId id is ${user_emailId}, Please correct it </p>

<p ng-cloak class="bg-success text-center" style=" font-variant: small-caps;font-family: Times New Roman, Times, serif;"
					 ng-show="contactMeError==true">Bad request [your host name doesn't seem good], please send again</p>

<p ng-cloak class="bg-success text-center" style=" font-variant: small-caps;font-family: Times New Roman, Times, serif;"
					 ng-show="contactMeError==false">Thank you for contacting me!<br>I'll be in touch with you shortly</p>
</h4>

		<%@ include file="../../../global/global.jsp"%>				


</div>
<br>

<br><br><br><br><br><br>
<%@ include file="../../../included pages/common/footer/footer.jsp"%>



</div>

</body>
</html>