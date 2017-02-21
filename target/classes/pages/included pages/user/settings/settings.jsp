
<div class="row">
	<div class="col-md-12">
		<div class="panel with-nav-tabs">

			<div class="user_setting_breadcrumb">
				<a ng-class="{current:(userSettingSub==true)}"
					ng-click="userSettingSubscription()">News Letter Subscription</a> <a
					ng-class="{current:(userSettingPass==true)}"
					ng-click="userSettingPassword()">Change Password</a> <a
					ng-class="{current:(userSettingDel==true)}"
					ng-click="userSettingDeleteAccount()">Deactivate Account</a>
			</div>

			<div class="panel-body">
				<div class="tab-content">
					<div class="tab-pane fade in active">
						<div class="row">
							<div class="span12">
								<div class="thumbnail center well well-small text-center">
									<div ng-show="userSettingSub==true">



										<br /> <b
											style="font:inherit;color: black; font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 23px;">
											Subscribe to our Newsletter and stay tuned.</b> <br />
										<br />


										<form role="form"
											ng-submit="onUpdateSubPlan(userSettingSubPlan)" novalidate
											autocomplete="off">
											<div
												ng-init="userSettingSubPlan=showSubPlan('${user_subscriptionFrequency}')"
												ng-class="{'has-error':fieldError}" class="form-group">
												<label style="font:inherit;font-size: 20px;" class="control-label"
													for="Subscription"> Select Frequency </label>
												<div ng-class="{'has-error':fieldError}"
													data-toggle="buttons">
													
													<label style="width: 100px;border: 0;" ng-click="userSettingSubPlan='WEEKLY'"
														class="btn btn-default user_setting_sub"> <input
														disable-valid-styling="true" ng-model="userSettingSubPlan"
														class="form-control" ng-required="!userSettingSubPlan"
														type="radio" autocomplete="off"> <span
														ng-style="{'background':(userSettingSubPlan=='WEEKLY'?'#58F624':'')}"
														class="user_setting_radio_dot"></span> <span
														style="margin-left: 12px;"
														class="user_setting_gender_word">Weekly</span>
													</label> 
													<label style="border: 0;" ng-click="userSettingSubPlan='MONTHLY'"
														class="btn btn-default user_setting_sub"> <input
														disable-valid-styling="true" ng-model="userSettingSubPlan"
														class="form-control" ng-required="!userSettingSubPlan"
														type="radio" autocomplete="off"> <span
														ng-style="{'background':(userSettingSubPlan=='MONTHLY'?'#58F624':'')}"
														class="user_setting_radio_dot"></span> <span
														style="margin-left: 19px;"
														class="user_setting_gender_word">Monthly</span>
													</label>
													
													<br><br>
													
													<span style="background: #efefef;color:black;" class="label label-default">OR</span>
											
														<br><br>			
																							
													</label> 
													<label style="border: 0;"
													ng-click="userSettingSubPlan='UNSUBSCRIBE'"
														class="btn btn-default user_setting_sub"> <input
														disable-valid-styling="true" ng-model="userSettingSubPlan"
														class="form-control" ng-required="!userSettingSubPlan"
														type="radio" autocomplete="off"> <span
														ng-style="{'background':(userSettingSubPlan=='UNSUBSCRIBE'?'#58F624':'')}"
														class="user_setting_radio_dot"></span> <span
														style="margin-left: 19px;"
														class="user_setting_gender_word">Unsubscribe</span>
													</label>
													
													
													
													
												</div>
											</div>
											

											<button
												style="border: 0;border-radius:0px; font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 20px; margin-top: 25px; position: relative;"
												id="subscription_notified" class="btn btn-lg btn-block"
												ladda="changeSubPlan" data-style="expand-right"
												data-spinner-color="rgb(32, 248, 29)" type="submit">
												<span ng-show="!changeSubPlan">subscribe</span> <span
													ng-cloak ng-show="changeSubPlan">subscribing</span>
											</button>
										</form>
										
										

									</div>

									<div ng-show="userSettingPass==true">

										<br />

										<div class="row">
											<div class="col-md-4 col-md-offset-4">
												<div class="panel panel-default">
													<div class="panel-heading">
														<h3
															style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 20px;"
															class="panel-title">Change Password</h3>
													</div>
													<div class="panel-body">

														<fieldset>
															<form
																ng-submit="onUpdatePassword(currentPassword, newPassword)"
																novalidate autocomplete="off">

																<div class="form-group"
																	ng-class="{'has-error':fieldError_p}">
																	<label
																		style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
																		for="current password" class="control-label">current
																		Password</label> <input type="password"
																		ng-keydown="passwordError=null" class="form-control"
																		id="current_password" ng-minLength="6"
																		ng-maxLength="25" ng-pattern-err-type="password_error"
																		ng-pattern="/^(?=.*[A-Z])(?=.*\d).+$/"
																		name="current_password" ng-model="currentPassword"
																		required autocomplete="off" readonly
																		onfocus="this.removeAttribute('readonly');" />
																</div>

																<div class="form-group"
																	ng-class="{'has-error':fieldError_p}">
																	<label
																		style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
																		for="new password" class="control-label">New
																		Password</label> <input type="password"
																		ng-keydown="passwordError=null" class="form-control"
																		id="new_password" ng-minLength="6" ng-maxLength="25"
																		ng-pattern-err-type="password_error"
																		ng-pattern="/^(?=.*[A-Z])(?=.*\d).+$/"
																		name="new_password" ng-model="newPassword" required
																		autocomplete="off" readonly
																		onfocus="this.removeAttribute('readonly');" />
																</div>

																<div class="form-group"
																	ng-class="{'has-error':fieldError_p}">
																	<label
																		style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
																		for="confirm password" class="control-label">Confirm
																		New Password</label> <input type="password"
																		ng-keydown="passwordError=null" class="form-control"
																		id="confirm_password" name="confirm_password"
																		ng-model="confirmNewPassword" equals-to="newPassword"
																		equalsTo-err-type="confirm_password_error" required
																		autocomplete="off" readonly
																		onfocus="this.removeAttribute('readonly');" />
																</div>


																<button
																	style="border: 0;font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 20px; margin-top: 25px; position: relative;"
																	id="user_setting_password" class="btn btn-lg btn-block"
																	ladda="changePassword" data-style="expand-right"
																	data-spinner-color="rgb(32, 248, 29)" type="submit">
																	<span ng-show="!changePassword">update</span> <span
																		ng-cloak ng-show="changePassword">Updating</span>
																</button>
															</form>



														</fieldset>


													</div>

												</div>

											</div>
										</div>


									</div>

									<div ng-show="userSettingDel==true">
										<br />

										<div class="row">
											<div class="col-md-4 col-md-offset-4">
												<div class="panel panel-default">
													<div class="panel-heading">
														<h3
															style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 20px;"
															class="panel-title">Deactivate Account</h3>
													</div>
													<div class="panel-body">

														<fieldset>
															<form
																ng-submit="onDeactivateAccount(confirmDeactivatePassword)"
																novalidate autocomplete="off">

																<div class="form-group"
																	ng-class="{'has-error':fieldError_deactivate}">
																	<label
																		style="font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 18px;"
																		for="current password" class="control-label">Confirm 
																		Password</label> 
																		<input type="password" 
																		 class="form-control" 
																		id="current_password" ng-minLength="6" 
																		ng-maxLength="25" ng-pattern-err-type="password_error" 
																		ng-pattern="/^(?=.*[A-Z])(?=.*\d).+$/" 
																		name="current_password" ng-model="confirmDeactivatePassword" 
																		required autocomplete="off" readonly 
																		onfocus="this.removeAttribute('readonly');" /> 
																</div>
																
																<button
																	style="border: 0;font-variant: small-caps; font-family: Courier, Times New Roman, Times, serif; font-size: 20px; margin-top: 25px; position: relative;"
																	id="user_setting_password" class="btn btn-lg btn-block"
																	ladda="deactivateAccountLadda" data-style="expand-right"
																	data-spinner-color="rgb(32, 248, 29)" type="submit">
																	<span ng-show="!deactivateAccountLadda">Deactivate</span> <span
																		ng-cloak ng-show="deactivateAccountLadda">Deactivating</span>
																</button>
															</form>



														</fieldset>


													</div>

												</div>

											</div>
										</div>


									</div>
								</div>
							</div>
						</div>
					</div>


				</div>
			</div>
		</div>
	</div>
</div>