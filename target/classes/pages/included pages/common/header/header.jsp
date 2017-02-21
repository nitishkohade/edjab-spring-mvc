<%-- <nav 
style="font-family: Times New Roman, Times, serif; font-family: Courier;font-variant: small-caps;font-size:16px;"
class="navbar navbar-default navbar-fixed-top" role="navigation"
	id="slide-nav">

	<div class="navbar-header">
		<a id="headeredjablogo"
			style="margin-left: 10px; position: relative; top: 4px;"
			href="/" title="EdJab.com"
			rel="home"> <img src="/img/logo.jpg" width="210"
			height="50" />
		</a>

		<a class="navbar-toggle"> <span class="sr-only"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</a>

	</div>
	<div style="text-align: center; height: 70px;" id="slidemenu">

		<form ng-controller="TechnicalHeaderAutocompleteController"
			class="navbar-form navbar-left" role="form">
			<div style="margin-top:5px;" class="form-group">
				<headerautocomplete ng-model="result" click-activation=""
					attr-placeholder="type to search schools..." data="schools"
					on-type="typedData" on-select="selectedData">
				</headerautocomplete>
			</div>
		</form>
	<div ng-controller="LoginRegisterController">
			<div ng-cloak ng-show="'${user_emailId}' == ''">
			
				<ul class="nav navbar-nav navbar-right" 
					style="margin-right: 10px; height: 70px;margin-top: 3px;">
					<li style="top: 6px;">
						<div class="ui-group-buttons">
							<a style="    border-radius: 0px;border:0;background: white;color: black;" type="button" href="/register"
							class="btn btn-primary btn-lg"> Signup </a>
							<div class="or or-lg"></div>
							<a style="    border-radius: 0px;border:0;background: white;color: black;" type="button" href="/login"
								class="btn btn-success btn-lg"> Login </a>
						</div>						
					</li>
				</ul>
			</div>
			<div ng-cloak ng-show="'${user_emailId}' != ''">
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown"
						style="top: 2px; left: 16px; background: #EEEEEE; border-radius: 9px;">
						<div style="padding-right: 5px; padding-bottom: 3px;"
							class="ui-group-buttons">
							<a ng-cloak ng-show="user_gender!='MALE' && user_gender !='FEMALE' && userEditArray==true"
								id="welcome_user_button" href="" class="dropdown-toggle"
								data-toggle="dropdown"> <img style="top: 14px;"
								src="/img/user_profile/male_profile_pic.png" height="50"
								width="50"> <strong
								style="text-decoration: none; color: white; margin-left: -14px;"
								class="caret"> </strong>
							</a>
							
							<a ng-cloak ng-show="'${user_gender}'!='MALE' && '${user_gender}'!='FEMALE' && userEditArray!=true"
								id="welcome_user_button" href="" class="dropdown-toggle"
								data-toggle="dropdown"> <img style="top: 14px;"
								src="/img/user_profile/male_profile_pic.png" height="50"
								width="50"> <strong
								style="text-decoration: none; color: white; margin-left: -14px;"
								class="caret"> </strong>
							</a>
							
							<a ng-cloak ng-show=" user_gender =='MALE' && userEditArray==true"
								id="welcome_user_button" href="" class="dropdown-toggle"
								data-toggle="dropdown"> <img style="top: 14px;"
								src="/img/user_profile/male_profile_pic.png" height="50"
								width="50"> <strong
								style="text-decoration: none; color: white; margin-left: -14px;"
								class="caret"> </strong>
							</a>
							
							<a ng-cloak ng-show="'${user_gender}'=='MALE' && userEditArray!=true"
								id="welcome_user_button" href="" class="dropdown-toggle"
								data-toggle="dropdown"> <img style="top: 14px;"
								src="/img/user_profile/male_profile_pic.png" height="50"
								width="50"> <strong
								style="text-decoration: none; color: white; margin-left: -14px;"
								class="caret"> </strong>
							</a>
							
							<a ng-cloak ng-show=" user_gender =='FEMALE' && userEditArray==true"
								id="welcome_user_button" href="" class="dropdown-toggle"
								data-toggle="dropdown"> <img style="top: 14px;"
								src="/img/user_profile/female_profile_pic.png" height="50"
								width="50"> <strong
								style="text-decoration: none; color: white; margin-left: -14px;"
								class="caret"> </strong>
							</a>


							<a ng-cloak ng-show="'${user_gender}'=='FEMALE' && userEditArray!=true"
								id="welcome_user_button" href="" class="dropdown-toggle"
								data-toggle="dropdown"> <img style="top: 14px;"
								src="/img/user_profile/female_profile_pic.png" height="50"
								width="50"> <strong
								style="text-decoration: none; color: white; margin-left: -14px;"
								class="caret"> </strong>
							</a>


							<ul style="border-radius: 6px; width: 230px;"
								class="dropdown-menu" role="menu" aria-labelledby="dLabel">

								<li>
								<div style="text-align: center;background: #eeeeee;margin-top: -5px;">
								<a id="user_dropdown" ng-show="userEditArray==true"
									style="font-size: 20px; color: black;background: #eeeeee;">
									{{user_firstName+" "+user_lastName}}
								</a>
								</div>			  
									<div style="text-align: center;background: #eeeeee;margin-top: -5px;"
									 ng-show="'${user_firstName}' == '' && '${user_lastName}' == '' ">
										<a id="user_dropdown" ng-show="userEditArray!=true"
											style="text-align: center; font-size: 20px; color: black;"> Welcome
										</a>
									</div>
									<div ng-show="'${user_firstName}' != '' || '${user_lastName}' != '' ">
										<div style="text-align: center;background: #eeeeee;margin-top: -5px;">										  
											<a id="user_dropdown" ng-show="userEditArray!=true"
											style="text-align: center; font-size: 23px; color: black;background: #eeeeee;">
											<b style="font:inherit;"><i>${user_firstName} ${user_lastName}</i></b>
											</a>	
										</div>	
									</div>
									<ul style="list-style-type: none; display: inline;">
										<li style="display: inline;">
										<img ng-cloak 
										style="top: 14px;margin-left: -20px;margin-top:-15px;" 
										ng-show=" user_gender !='MALE' && user_gender !='FEMALE' && userEditArray==true"
										src="/img/user_profile/male_profile_pic.png" height="140"
										width="130">
										
										<img ng-cloak 
										style="top: 14px;margin-left: -20px;margin-top:-15px;" 
										ng-show="'${user_gender}'!='MALE' && '${user_gender}'!='FEMALE' && userEditArray!=true"
										src="/img/user_profile/male_profile_pic.png" height="140"
										width="130">
										
										<img ng-cloak
										style="top: 14px;margin-left: -20px;margin-top:-15px;" 
										ng-show=" user_gender =='MALE' && userEditArray==true"
										src="/img/user_profile/male_profile_pic.png" height="140"
										width="130">
										
										<img ng-cloak
										style="top: 14px;margin-left: -20px;margin-top:-15px;" 
										ng-show="'${user_gender}'=='MALE' && userEditArray!=true"
										src="/img/user_profile/male_profile_pic.png" height="140"
										width="130">
										
										<img ng-cloak
										style="top: 14px;margin-left: -20px;margin-top:-15px;" 
										ng-show=" user_gender =='FEMALE' && userEditArray==true"
										src="/img/user_profile/female_profile_pic.png" height="140"
										width="130">
										</li>
										
										<img ng-cloak
										style="top: 14px;margin-left: -20px;margin-top:-15px;" 
										ng-show="'${user_gender}'=='FEMALE' && userEditArray!=true"
										src="/img/user_profile/female_profile_pic.png" height="140"
										width="130">
										</li>


										<li style="display: inline;"><a id="user_dropdown"
											style="color: grey;" class="action-icon edit-link"
											href="/UserProfileInfo/#/profile"
											data-toggle="tooltip" title="" data-placement="top"
											data-original-title="View Profile">
												<button
													style="width: 26px;border:0;padding:3px; text-align: center; color: white; background: #aea5a5;">
													<i style="font-size: 19px; margin-left: 0px;"
														class="icon-user fa fa-user"></i>
												</button>
										</a></li>
										<li style="display: inline;"><a id="user_dropdown"
											style="color: grey;" class="action-icon edit-link"
											href="/UserProfileInfo/#/edit"
											data-toggle="tooltip" title="" data-placement="top"
											data-original-title="Edit Profile">
												<button
													style="width: 25px;border:0;padding:3px; text-align: center; color: white; background: #aea5a5;">
													<i style="font-size: 19px; margin-left: 0px;"
														class="icon-pencil fa fa-pencil"></i>
												</button>
										</a></li>
										<li style="display: inline;"><a id="user_dropdown"
											style="color: grey;" class="action-icon settings-link"
											href="/UserProfileInfo/#/setting"
											data-toggle="tooltip" title="" data-placement="top"
											data-original-title="Settings">
												<button
													style="width: 25px;border:0;padding:3px; text-align: center; color: white; background: #aea5a5;">
													<i style="font-size: 19px; margin-left: 0px;"
														class="icon-cog fa fa-cog"></i>
												</button>
										</a></li>
									</ul>


									<hr style="margin-top: 4px; border-top: 1px solid grey;">
								</li>

								<li><a id="user_dropdown" id="welcome_liked_button"
									href="/UserProfileInfo/#/liked">
										<i style="color: white; font-size: 16px;width: 25px;    padding: 5px;    background: #aea5a5;"
										class="fa fa-thumbs-up"> </i> <span style="font-size: 19px;">Liked</span>
								</a></li>
								<li><a id="user_dropdown"
									href="/UserProfileInfo/#/followed">
										<i style="color: white; font-size: 15px;width: 25px;    padding: 5px;    background: #aea5a5;" 
										class="fa fa-user-plus">
									</i> <span style="font-size: 19px;">Followed</span>
								</a></li>
								<li><a id="user_dropdown"
									href="/UserProfileInfo/#/attended">

										<i style="color: white; font-size: 14px;width: 25px;    padding: 5px;    background: #aea5a5;"
										class="fa fa-graduation-cap"> </i> <span
										style="font-size: 19px;">Attended</span>
								</a></li>
								<li><a id="user_dropdown"
									href="/UserProfileInfo/#/reviewed">
										<i style="color: white; font-size: 15px;width: 25px;    padding: 5px;    background: #aea5a5;"
										class="fa fa-comment"> </i> <span
										style="font-size: 19px;">Reviewed</span>
								</a></li>
								<li class="divider"></li>
								<li><a style="cursor: pointer;" id="user_dropdown" ng-click="removeRemembermeCookie()">
										<button
											style="width: 26px;border:0;padding: 3px; text-align: center; color: white; background: #aea5a5;">
											<i style="font-size: 18px;" class="fa fa-sign-out">
											</i>
										</button> <span style="font-size: 19px;">Logout</span>
								</a></li>
							</ul>
						</div>
					</li>
					<li>
						<button style="visibility: hidden; border-radius: 25px;"
							class="btn-primary btn-lg pull-right"></button>
					</li>
				</ul>

			</div>
			
	</div>
	</div>

</nav>
 --%>
 
 
 <nav style="min-height:51px;background: white;
    box-shadow: 1px 7px 10px grey;" class="[ navbar navbar-fixed-top ][ navbar-bootsnipp animate ]" role="navigation">
    	<div>
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="[ navbar-header ]">
				<button type="button" class="[ navbar-toggle ]" data-toggle="collapse" data-target="#header-collapse-expand">
					
					<span class="[ icon-bar ]"></span>
					<span class="[ icon-bar ]"></span>
					<span class="[ icon-bar ]"></span>
				</button>
				<div class="[ animbrand ]">
										
					<a class="[ navbar-brand ][ animate ]" id="headeredjablogo"
						style="margin-top: -11px;
						    margin-bottom: -12px;
						    position: fixed;
						    left: 15px;
						    padding: 15px 5px;"
						href="/" title="EdJab.com"
						rel="home"> <img style="margin-left:-15px;" src="/img/logo.jpg" width="210"
						height="40" />
					</a>
					
				</div>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="[ collapse navbar-collapse ]" id="header-collapse-expand">
				<ul style="background:whitesmoke; position: fixed;right: 16px;" class="[ nav navbar-nav navbar-right ]">
				<li class="[ visible-xs ]">
							<div  id="scrollable-dropdown-menu" class="[ input-group ]">
								<input style="border:0;" type="text" class="[ form-control typeahead ]" placeholder="Search for Colleges" 
								autocomplete="off">
								<span class="[ input-group-btn ]">
									<button style="border: 0;" class="[ btn btn-primary ]" type="submit"><span class="[ glyphicon glyphicon-search ]"></span></button>
									<button style="border: 0;" class="[ btn btn-danger ]" type="reset"><span class="[ glyphicon glyphicon-remove ]"></span></button>
								</span>
							</div>
					</li>
				<li style="box-shadow: -1px 0px 0px #bebebe;" 
				class="[ hidden-xs ]">
				
				<a style="color: black;" href="#toggle-search" class="[ animate ]">
				<i class="fa fa-search fa-lg" aria-hidden="true"></i>
				SEARCH
				</a>
				
				</li>				
				<li style="border-right: 1px solid #bebebe;box-shadow: -1px 0px 0px #bebebe;">
				
				<a ng-cloak ng-show="'${user_emailId}' == ''" style="color: black;" class="animate" href="/login">
				<i class="fa fa-sign-in fa-lg" aria-hidden="true"></i>
				LOGIN
				</a>
				
				<div ng-cloak ng-show="'${user_emailId}' != ''"  ng-controller="LoginRegisterController">
				
				<div >
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown"
						style="left: 16px; background: #f5f5f5; border-radius: 0px;">
						<div style="padding-right: 5px;"
							class="ui-group-buttons">
							<a ng-cloak ng-show="user_gender!='MALE' && user_gender !='FEMALE' && userEditArray==true"
								id="welcome_user_button" href="" class="dropdown-toggle"
								data-toggle="dropdown"> <img style="top: 14px;"
								src="/img/user_profile/male_profile_pic.png" height="50"
								width="50"> <strong
								style="text-decoration: none; color: white; margin-left: -14px;"
								class="caret"> </strong>
							</a>
							
							<a ng-cloak ng-show="'${user_gender}'!='MALE' && '${user_gender}'!='FEMALE' && userEditArray!=true"
								id="welcome_user_button" href="" class="dropdown-toggle"
								data-toggle="dropdown"> <img style="top: 14px;"
								src="/img/user_profile/male_profile_pic.png" height="50"
								width="50"> <strong
								style="text-decoration: none; color: white; margin-left: -14px;"
								class="caret"> </strong>
							</a>
							
							<a ng-cloak ng-show=" user_gender =='MALE' && userEditArray==true"
								id="welcome_user_button" href="" class="dropdown-toggle"
								data-toggle="dropdown"> <img style="top: 14px;"
								src="/img/user_profile/male_profile_pic.png" height="50"
								width="50"> <strong
								style="text-decoration: none; color: white; margin-left: -14px;"
								class="caret"> </strong>
							</a>
							
							<a ng-cloak ng-show="'${user_gender}'=='MALE' && userEditArray!=true"
								id="welcome_user_button" href="" class="dropdown-toggle"
								data-toggle="dropdown"> <img style="top: 14px;"
								src="/img/user_profile/male_profile_pic.png" height="50"
								width="50"> <strong
								style="text-decoration: none; color: white; margin-left: -14px;"
								class="caret"> </strong>
							</a>
							
							<a ng-cloak ng-show=" user_gender =='FEMALE' && userEditArray==true"
								id="welcome_user_button" href="" class="dropdown-toggle"
								data-toggle="dropdown"> <img style="top: 14px;"
								src="/img/user_profile/female_profile_pic.png" height="50"
								width="50"> <strong
								style="text-decoration: none; color: white; margin-left: -14px;"
								class="caret"> </strong>
							</a>


							<a ng-cloak ng-show="'${user_gender}'=='FEMALE' && userEditArray!=true"
								id="welcome_user_button" href="" class="dropdown-toggle"
								data-toggle="dropdown"> <img style="top: 14px;"
								src="/img/user_profile/female_profile_pic.png" height="50"
								width="50"> <strong
								style="text-decoration: none; color: white; margin-left: -14px;"
								class="caret"> </strong>
							</a>


							<ul style="border-radius: 0px; width: 230px;"
								class="dropdown-menu" role="menu" aria-labelledby="dLabel">

								<li>
								<div style="text-align: center;background: #eeeeee;margin-top: -5px;">
								<a id="user_dropdown" ng-show="userEditArray==true"
									style="font-size: 20px; color: black;background: #eeeeee;">
									{{user_firstName+" "+user_lastName}}
								</a>
								</div>			  
									<div style="text-align: center;background: #eeeeee;margin-top: -5px;"
									 ng-show="'${user_firstName}' == '' && '${user_lastName}' == '' ">
										<a id="user_dropdown" ng-show="userEditArray!=true"
											style="text-align: center; font-size: 20px; color: black;"> Welcome
										</a>
									</div>
									<div ng-show="'${user_firstName}' != '' || '${user_lastName}' != '' ">
										<div style="text-align: center;background: #eeeeee;margin-top: -5px;">										  
											<a id="user_dropdown" ng-show="userEditArray!=true"
											style="text-align: center; font-size: 23px; color: black;background: #eeeeee;">
											<b style="font:inherit;"><i>${user_firstName} ${user_lastName}</i></b>
											</a>	
										</div>	
									</div>
									<ul style="list-style-type: none; display: inline;">
										<li style="display: inline;">
										<img ng-cloak 
										style="top: 14px;margin-left: -20px;margin-top:-15px;" 
										ng-show=" user_gender !='MALE' && user_gender !='FEMALE' && userEditArray==true"
										src="/img/user_profile/male_profile_pic.png" height="140"
										width="130">
										
										<img ng-cloak 
										style="top: 14px;margin-left: -20px;margin-top:-15px;" 
										ng-show="'${user_gender}'!='MALE' && '${user_gender}'!='FEMALE' && userEditArray!=true"
										src="/img/user_profile/male_profile_pic.png" height="140"
										width="130">
										
										<img ng-cloak
										style="top: 14px;margin-left: -20px;margin-top:-15px;" 
										ng-show=" user_gender =='MALE' && userEditArray==true"
										src="/img/user_profile/male_profile_pic.png" height="140"
										width="130">
										
										<img ng-cloak
										style="top: 14px;margin-left: -20px;margin-top:-15px;" 
										ng-show="'${user_gender}'=='MALE' && userEditArray!=true"
										src="/img/user_profile/male_profile_pic.png" height="140"
										width="130">
										
										<img ng-cloak
										style="top: 14px;margin-left: -20px;margin-top:-15px;" 
										ng-show=" user_gender =='FEMALE' && userEditArray==true"
										src="/img/user_profile/female_profile_pic.png" height="140"
										width="130">
										</li>
										
										<img ng-cloak
										style="top: 14px;margin-left: -20px;margin-top:-15px;" 
										ng-show="'${user_gender}'=='FEMALE' && userEditArray!=true"
										src="/img/user_profile/female_profile_pic.png" height="140"
										width="130">
										</li>


										<li style="display: inline;"><a id="user_dropdown"
											style="color: grey;" class="action-icon edit-link"
											href="/UserProfileInfo/#/profile"
											data-toggle="tooltip" title="" data-placement="top"
											data-original-title="View Profile">
												<button
													style="width: 26px;border:0;padding:3px; text-align: center; color: white; background: #aea5a5;">
													<i style="font-size: 19px; margin-left: 0px;"
														class="icon-user fa fa-user"></i>
												</button>
										</a></li>
										<li style="display: inline;"><a id="user_dropdown"
											style="color: grey;" class="action-icon edit-link"
											href="/UserProfileInfo/#/edit"
											data-toggle="tooltip" title="" data-placement="top"
											data-original-title="Edit Profile">
												<button
													style="width: 25px;border:0;padding:3px; text-align: center; color: white; background: #aea5a5;">
													<i style="font-size: 19px; margin-left: 0px;"
														class="icon-pencil fa fa-pencil"></i>
												</button>
										</a></li>
										<li style="display: inline;"><a id="user_dropdown"
											style="color: grey;" class="action-icon settings-link"
											href="/UserProfileInfo/#/setting"
											data-toggle="tooltip" title="" data-placement="top"
											data-original-title="Settings">
												<button
													style="width: 25px;border:0;padding:3px; text-align: center; color: white; background: #aea5a5;">
													<i style="font-size: 19px; margin-left: 0px;"
														class="icon-cog fa fa-cog"></i>
												</button>
										</a></li>
									</ul>


									<hr style="margin-top: 4px; border-top: 1px solid grey;">
								</li>

								<li><a id="user_dropdown" id="welcome_liked_button"
									href="/UserProfileInfo/#/liked">
										<i style="color: white; font-size: 16px;width: 25px;    padding: 5px;    background: #aea5a5;"
										class="fa fa-thumbs-up"> </i> <span style="font-size: 19px;">Liked</span>
								</a></li>
								<li><a id="user_dropdown"
									href="/UserProfileInfo/#/followed">
										<i style="color: white; font-size: 15px;width: 25px;    padding: 5px;    background: #aea5a5;" 
										class="fa fa-user-plus">
									</i> <span style="font-size: 19px;">Followed</span>
								</a></li>
								<li><a id="user_dropdown"
									href="/UserProfileInfo/#/attended">

										<i style="color: white; font-size: 14px;width: 25px;    padding: 5px;    background: #aea5a5;"
										class="fa fa-graduation-cap"> </i> <span
										style="font-size: 19px;">Attended</span>
								</a></li>
								<li><a id="user_dropdown"
									href="/UserProfileInfo/#/reviewed">
										<i style="color: white; font-size: 15px;width: 25px;    padding: 5px;    background: #aea5a5;"
										class="fa fa-comment"> </i> <span
										style="font-size: 19px;">Reviewed</span>
								</a></li>
								<li class="divider"></li>
								<li><a style="cursor: pointer;" id="user_dropdown" ng-click="removeRemembermeCookie()">
										<button
											style="width: 26px;border:0;padding: 3px; text-align: center; color: white; background: #aea5a5;">
											<i style="font-size: 18px;" class="fa fa-sign-out">
											</i>
										</button> <span style="font-size: 19px;">Logout</span>
								</a></li>
							</ul>
							</div>
						</div>
					</li>
					<li ng-cloak ng-show="'${user_emailId}' != ''">
						<button style="visibility: hidden; border-radius: 25px;"
							class="btn-primary btn-lg pull-right"></button>
					</li>
				</ul>

			</div>
			
				
			</div>
		
		<div style="border-top: 2px solid white;" class="[ bootsnipp-search animate ]">
			<div class="[ container ]">
					<div  id="scrollable-dropdown-menu" class="[ input-group ]">
					<input type="text" class="[ form-control typeahead ]" placeholder="Search for Colleges" 
						autocomplete="off">
						
						<span class="[ input-group-btn ]">
							<button style="border: 0;" class="[ btn btn-danger ]" type="reset">
							<span class="[ glyphicon glyphicon-remove ]"></span></button>
						</span>
						
					</div>
			</div>
		</div>
	</nav>