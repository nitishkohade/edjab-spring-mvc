<div ng-controller="ActivationValidated">

<span  ng-cloak style="display:none">{{pop()}}</span>

 <input style="display:none" ng-model="emailId='${emailId}'">
<input style="display:none" ng-model="token='${token}'">



<br>

 <div ng-cloak ng-show="activationResult=='200'">
<h1
	style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
	<b><font color="blue">Account has been Activated...</font></b>
</h1>

<h4
	style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
	<b><font color="black">Now you may proceed with <a href="/login" 
	style="text-decoration:none; color:orangered;">Login</a> page</font></b>
</h4>
			
</div>

 
<div ng-cloak ng-show="activationResult=='400'">
<h1
	style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
	<b><font color="blue">Activation not successful...</font></b>
</h1>

<h4
	style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
	<b><font color="black">It seems you played with the URL or there might occur some server related issue. Please
				 try again accessing the same link and if the issue remain persists, then you may <a href="/login" 
	style="text-decoration:none; color:orangered;">Login</a> again</font></b>
</h4>
			
</div>


<div ng-cloak ng-show="activationResult=='500'">
<h1
	style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
	<b><font color="blue">Activation not successful...</font></b>
</h1>

<h4
	style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
	<b><font color="black">Server error occurred, Sorry for this inconvenience... Please access the same link provided to
	 you and if problem persists then you may <a href="/login" 
	style="text-decoration:none; color:orangered;">Login</a> again</font></b>
</h4>
			
</div>

<div ng-cloak ng-show="activationResult=='error'">
<h1
	style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
	<b><font color="blue">Activation not successful...</font></b>
</h1>

<h4
	style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif;">
	<b><font color="black">Bad Request, Please access the same link provided to
	 you and if problem persists then you may <a href="/login" 
	style="text-decoration:none; color:orangered;">Login</a> again</font></b>
</h4>
			
</div>

</div>