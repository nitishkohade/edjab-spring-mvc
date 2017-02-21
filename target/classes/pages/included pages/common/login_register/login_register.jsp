
        <toaster-container 
        toaster-options="{'time-out': 3000, 'close-button':true, 'animation-class': 'toast-top-right'}">
        </toaster-container>


<br><br><br><br>
<div ng-if="isLoggedInFacebook==false  &&  isLoggedInGoogle==false">	
<div ng-controller="ValidateRegistrationController" id="register_form" class="row" ng-style="{display:(loginRegisterParam==':mode=register')?'block':'none'}" >


<div class="col-md-4 col-lg-4 col-sm-4 "></div>
<div class="col-md-4 col-lg-4 col-sm-4 ">
	
	<h3 class="text-center">
				<div class="row">
					<div class="col-md-12 col-lg-12 col-sm-12 ">
					<div class="col-md-4 col-lg-4 col-sm-4 ">
						<h3 style=" text-align: center;">
						<a href="" id="login_link" ng-click="loginLink()">SignIn</a>
						</h3>
						</div>
						<div class="col-md-4 col-lg-4 col-sm-4 "></div>
						<div class="col-md-4 col-lg-4 col-sm-4 ">
						<h3 style=" text-align: center;">
						<a href="" class="active" id="register_link" ng-click="registerLink()">Register</a>
						</h3>
					</div>
					</div>
					</div>
					</h3>
					<hr id="signup_hr">
					<div class="row-fluid">
						<div 
						class="col-md-6 col-lg-6 col-sm-6 ">
							<a ng-click="googleLogIn()" 
							style="border-radius: 5px; "
							class="btn btn-block btn-social btn-google-plus"> 
							<i	
							class="fa fa-google-plus">
							</i> Google Sign In
							</a>
						</div>
						<div 
						class="col-md-6 col-lg-6 col-sm-6 ">
							<a 
							ng-click="loginFacebook()" 
							style="border-radius: 5px; "
							class="btn btn-block btn-social btn-facebook"> 
							<i
							class="fa fa-facebook">
							</i> Facebook Sign In
							</a>
						</div>
					</div>
					
					<div 
					class="list-inline text-center">
					<li><br><h4>OR</h4></li>
					</div>
					
					<p class="bg-danger text-center" style="font-family: Times New Roman, Times, serif;"
					 ng-show="registerError=='true'">Error while registering, Please register again!</p>
					<p class="bg-success text-center" style="font-family: Times New Roman, Times, serif;"
					 ng-show="registerError=='false'">Successfully Registered, Please validate your email 
					in order to login to your account!</p>
				

						<form ng-submit="onRegister()" novalidate autocomplete="off">
           
				            
				            <div class="form-group" ng-class="{'has-error':registerError}">
				                <label for="email" 
				                       class="control-label">Email</label>
				                <input type="email" 
				                       class="form-control" 
				                       id="email"  
				                       ng-model="registerModal.email"
				                       required autocomplete="off" readonly onfocus="this.removeAttribute('readonly');"/>
				            </div>
				            
				           
				            <div class="form-group" ng-class="{'has-error':registerError}">
				                <label for="password" 
				                		class="control-label">Password</label>
				                <input type="password" 
				                       class="form-control" 
				                       id="password" 
				                       ng-minLength="6"
                       				   ng-maxLength="25" 
                       				   ng-pattern-err-type="password_error"
                       				   ng-pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/"
				                       name="password" 
				                       ng-model="registerModal.password" 
				                       required autocomplete="off" readonly onfocus="this.removeAttribute('readonly');"/>
				            </div>
				            
				            <div class="form-group" ng-class="{'has-error':registerError}">
				                <label for="confirm password"
				                        class="control-label">Confirm Password</label>
				                <input type="password" 
				                       class="form-control" 
				                       id="confirm_password" 
				                       name="confirm_password" 
				                       ng-model="registerModal.confirmPassword"
				                       equals-to="registerModal.password" 
				                       equalsTo-err-type="confirm_password_error"
				                       required autocomplete="off" readonly onfocus="this.removeAttribute('readonly');"/>
				            </div>
				           
				            
				           
				                <button 
				                class="btn btn-primary btn-block"				                        
				                ladda="submitting"
				                data-style="expand-right"				                        
		                        type="submit">
		                        	<span ng-show="!submitting">Register</span>
		                    		<span ng-show="submitting">Registering</span>		                    
		                    	</button>
				                
				           
				            
        			</form>					

					

					
				
			
		</div>
		<div class="col-md-4 col-lg-4 col-sm-4 col-xs-4"></div>
</div>


<!--  LOGIN  -->
<div class="row" id="login_form" ng-style="{display:(loginRegisterParam==':mode=login')?'block':'none'}" >
<div class="col-md-4 col-lg-4 col-sm-4 "></div>
<div class="col-md-4 col-lg-4 col-sm-4 ">
<div>
<h3 class="text-center">
				<div class="row">
					<div class="col-md-12 col-lg-12 col-sm-12 ">
					<div class="col-md-4 col-lg-4 col-sm-4 ">
						<h3 style=" text-align: center;">
						<a href="" class="active" id="login_link"  ng-click="loginLink()">SignIn</a>
						</h3>
						</div>
						<div class="col-md-4 col-lg-4 col-sm-4 "></div>
						<div class="col-md-4 col-lg-4 col-sm-4 ">
						<h3 style=" text-align: center;">
						<a href="" id="register_link"  ng-click="registerLink()">Register</a>
						</h3>
					</div>
					</div>
					</div>
					</h3>
					<hr id="signup_hr">
					<div 
					class="row-fluid">
					
					
						<div 
						class="col-md-6 col-lg-6 col-sm-6 ">
							<a 
							ng-click="googleLogIn()" 
							style="border-radius: 5px; "
							class="btn btn-block btn-social btn-google-plus"> <i
							class="fa fa-google-plus">
							</i> Google Sign In
							</a>
						</div>
						<div 
							class="col-md-6 col-lg-6 col-sm-6 ">
							<a 
							ng-click="loginFacebook()" 
							style="border-radius: 5px; "
							class="btn btn-block btn-social btn-facebook"> 
							<i
							class="fa fa-facebook">
							</i> 
							Facebook Sign In
							</a>
						</div>
					
					</div>
					
					<div 
					class="list-inline text-center">
					<li><br><h4>OR</h4></li>
					</div>
					
					<p class="bg-danger text-center" style="font-family: Times New Roman, Times, serif;"
					ng-show="loginError=='true'">Error while login, Please check your credentials</p>
					
					
							<div style="padding: 10px; padding-bottom: 20px;">
									<form ng-submit="onLogin()"	autocomplete="off" novalidate>
										

										<div 
										class="form-group" 
										ng-class="{'has-error':loginError}">
				               				<label 
				               				for="email" 
				                     		class="control-label">Email</label>
				               				<input 
				               				type="email" 
				                   			class="form-control" 
				                       		id="email"  
				                       		ng-model="loginModal.email"
				                       		required autocomplete="off" readonly onfocus="this.removeAttribute('readonly');"/>
				            			</div>
				            
				           
				            			<div 
				           		 		class="form-group" 
				            			ng-class="{'has-error':loginError}">
				                			<label 
				                			for="password" 
				                			class="control-label">Password</label>
				                			<input 
				                			type="password" 
				                       		class="form-control" 
				                       		id="password" 
				                       		name="password" 
				                       		ng-model="loginModal.password" 
				                       		required autocomplete="off" readonly onfocus="this.removeAttribute('readonly');"/>
				            			</div>
				            

										<div>
										<div 
										style="text-align: center;">
										<a 
										style="text-decoration:none; 
										color: blue;" 
										href="#/forgotpassword/generateToken/resetPassword=false/:mode=req_email">
										Forgot your password?</a>
										</div>
										<br>
										<div 
										class="checkbox">
											<label><input 
											ng-model="loginModal.rememberme"
											style="float: left; 
											margin-right: 10px;" 
											type="checkbox"
											name="rememberme" 
											id="rememberme"> Remember me
											</label>
											</div>
											</div>
										  <div 
										  class="form-group">
				                			<button 
				                			class="btn btn-primary btn-block"
				                        	ladda="signIn"
				                        	data-style="expand-right"				                        
				                        	type="submit">
				                        <span 
				                        ng-show="!signIn">Sign In</span>
				                    	<span 
				                    	ng-show="signIn">Signing In</span>
				                    
				                    	</button>
										
										
										
										
										
									</form>
									
								</div>
					









</div>
<div class="col-md-4 col-lg-4 col-sm-4 "></div>

</div>




</div>
</div>
<br><br><br><br><br>
