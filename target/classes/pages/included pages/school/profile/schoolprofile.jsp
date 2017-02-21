<div id="school_profile_area" class="container profile_container">
	<div class="row user-menu-container square body">
		<div align="center">
			<h2>
				<b>${instituteName}</b>
			</h2>
		</div>
		<div class="col-md-8 user-menu user-pad">
			<div class="row coralbg white">
				<div class="col-md-5 col-lg-5 col-sm-5 col-xs-5 user-pad profile_container_1a">
					<div ng-init="getProfileImage('${profileImageUrl}', '/img/school/Institute1.jpg')"
						class="user-image">
						<img ng-cloak ng-show="true" ng-src='{{profileUrl}}'
							alt="" class="img-responsive thumbnail">
					</div>
				</div>
				<div class="col-md-7 col-lg-7 col-sm-7 col-xs-7 profile_container_1b">
					<div class="user-pad">
						<span>
							<p class="label">Address:</p>
							<span style="position: relative;">${school_street}</span> <br />
							<p style="top: 5px; position: relative;"
								class="label">Country:</p>
							<span style="top: 9px; position: relative;">${school_country}</span>
							<p style="top: 5px; position: relative;"
								class="label">Contact:</p>
							<span style="font-size: 14px; top: 9px; position: relative;">${school_contactNumber}
							</span> <br />
							<p style="top: 10px; position: relative;"
								class="label">Email:</p>
							<a	style="top: 13px;"
								href="mailto:${school_email}?Subject=Hello%20School"
								target="_top"> &nbsp;${school_email} </a> <br />
							<p ng-init="schoolURL('${urlsList}')"
								style="top: 15px; position: relative;"
								class="label">Website:</p>
							<a ng-repeat="url in school_urls" ng-cloak
								style="top: 17px;"
								href={{url}}> <span ng-show="($index+1)>1">, </span>page{{$index+1}}
							</a>
							<p ng-init="schoolCategory('${categoriesList}')"
								style="top: 15px; position: relative;"
								class="label">Category:</p>

							<a ng-repeat="cat in school_categories" ng-cloak
								style="font-size: 14px; top: 17px;">
								<span ng-show="($index+1)>1">, </span>{{cat}}
							</a>
						</span>
					</div>
					<div>
						<div class="col-sm-12 col-md-12  col-lg-12 divider text-center">
							<div
								ng-init="default_UserToLike('${user_emailId}', '${instituteId}')"
								ng-controller="UserToLikeController">
								<div ng-cloak ng-show="l" ng-init="noOfLikes='${likes}'"
									ng-click="userToLike('${instituteId}')"
									class="col-sm-4 col-md-4 col-lg-4 emphasis">
									<h4 style="color: black;">{{noOfLikes}}</h4>
									<!-- <p><label>Like</label></p> -->
									<span style="background: #f4f4f4; border: 0; color: #000000;"
										data-toggle="tooltip" data-placement="bottom"
										title="Please like" class="btn"> <span
										class="fa fa-thumbs-up fa-2x"></span>
									</span>
								</div>
								<div ng-cloak ng-show="lr"
									ng-click="userToUnLike('${instituteId}')"
									class="col-sm-4 col-md-4 col-lg-4 emphasis">
									<h4 style="color: black;">{{noOfLikes}}</h4>
									<!-- <p><label>Like</label></p> -->
									<span style="background: #f4f4f4; border: 0; color: #000000;"
										data-toggle="tooltip" data-placement="bottom"
										title="Please unlike" class="btn"> <span
										class="fa fa-thumbs-down fa-2x"></span>
									</span>
								</div>
							</div>
							<div
								ng-init="default_UserToAttend('${user_emailId}', '${instituteId}')"
								ng-controller="UserToAttendController">
								<div ng-cloak ng-show="a" ng-init="noOfAttendees='${attendees}'"
									ng-click="userToAttend('${instituteId}')"
									class="col-sm-4 col-md-4 col-lg-4 emphasis">
									<h4 style="color: black;">{{noOfAttendees}}</h4>
									<!-- <p><label>Attend</label></p> -->
									<span style="background: #f4f4f4; border: 0; color: #000000;"
										data-toggle="tooltip" data-placement="bottom"
										title="attended ?" class="btn"> <span
										class="fa fa-graduation-cap fa-2x"></span>
									</span>
								</div>
								<div ng-cloak ng-show="ar"
									ng-click="userToUnAttend('${instituteId}')"
									class="col-sm-4 col-md-4 col-lg-4 emphasis">
									<h4 style="color: black;">{{noOfAttendees}}</h4>
									<!-- <p><label>Attend</label></p> -->
									<span style="background: #f4f4f4; border: 0; color: #000000;"
										data-toggle="tooltip" data-placement="bottom"
										title="Never attended ?" class="btn"> <span
										class="fa fa-university fa-2x"></span>
									</span>
								</div>
							</div>
							<div
								ng-init="default_UserToFollow('${user_emailId}', '${instituteId}')"
								ng-controller="UserToFollowController">
								<div ng-cloak ng-show="f" ng-init="noOfFollowers='${followers}'"
									ng-click="userToFollow('${instituteId}')"
									class="col-sm-4 col-md-4 col-lg-4 emphasis">
									<h4 style="color: black;">{{noOfFollowers}}</h4>
									<!-- <p><label>Follow</label></p> -->
									<span style="background: #f4f4f4; border: 0; color: #000000;"
										data-toggle="tooltip" data-placement="bottom"
										title="Please follow" class="btn"> <span
										class="fa fa-user-plus fa-2x"></span>
									</span>
								</div>
								<div ng-cloak ng-show="fr"
									ng-click="userToUnFollow('${instituteId}')"
									class="col-sm-4 col-md-4 col-lg-4 emphasis">
									<h4 style="color: black;">{{noOfFollowers}}</h4>
									<!-- <p><label>Follow</label></p> -->
									<span style="background: #f4f4f4; border: 0; color: #000000;"
										data-toggle="tooltip" data-placement="bottom" title="unfollow"
										class="btn"> <span class="fa fa-user fa-2x"></span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-md-4 col-lg-4 col-sm-4 col-xs-4 user-menu user-pad">
			<div class="user-menu-content">
				<div align="center">
					<h2 class="bold padding-bottom-7" style="color: black;">${averageRating}</h2>
					<div ng-init="getRating('${averageRating}')" class="star-ctr">
						<ul>
							<li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li>
							<li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li>
							<li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li>
							<li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li>
							<li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li>
						</ul>
					</div>
					<div class="col-md-offset-2">

						<div class="pull-left">
							<div class="pull-left" style="width: 35px; line-height: 1;">
								<div style="height: 9px; margin: 5px 0;">
									5 <span class="glyphicon glyphicon-star"></span>
								</div>
							</div>
							<div class="pull-left" style="width: 180px;">
								<div class="progress" style="height: 13px; margin: 8px 0;">
									<div class="progress-bar progress-bar-success"
										role="progressbar" aria-valuenow="5" aria-valuemin="0"
										aria-valuemax="5" style="width: ${percent5Star}%"></div>
								</div>
							</div>
						</div>
						<div class="pull-left">
							<div class="pull-left" style="width: 35px; line-height: 1;">
								<div style="height: 9px; margin: 5px 0;">
									4 <span class="glyphicon glyphicon-star"></span>
								</div>
							</div>
							<div class="pull-left" style="width: 180px;">
								<div class="progress" style="height: 13px; margin: 8px 0;">
									<div class="progress-bar progress-bar-primary"
										role="progressbar" aria-valuenow="4" aria-valuemin="0"
										aria-valuemax="5" style="width: ${percent4Star}%"></div>
								</div>
							</div>
						</div>
						<div class="pull-left">
							<div class="pull-left" style="width: 35px; line-height: 1;">
								<div style="height: 9px; margin: 5px 0;">
									3 <span class="glyphicon glyphicon-star"></span>
								</div>
							</div>
							<div class="pull-left" style="width: 180px;">
								<div class="progress" style="height: 13px; margin: 8px 0;">
									<div class="progress-bar progress-bar-info" role="progressbar"
										aria-valuenow="3" aria-valuemin="0" aria-valuemax="5"
										style="width: ${percent3Star}%"></div>
								</div>
							</div>
						</div>
						<div class="pull-left">
							<div class="pull-left" style="width: 35px; line-height: 1;">
								<div style="height: 9px; margin: 5px 0;">
									2 <span class="glyphicon glyphicon-star"></span>
								</div>
							</div>
							<div class="pull-left" style="width: 180px;">
								<div class="progress" style="height: 13px; margin: 8px 0;">
									<div class="progress-bar progress-bar-warning"
										role="progressbar" aria-valuenow="2" aria-valuemin="0"
										aria-valuemax="5" style="width: ${percent2Star}%"></div>
								</div>
							</div>
						</div>
						<div class="pull-left">
							<div class="pull-left" style="width: 35px; line-height: 1;">
								<div style="height: 9px; margin: 5px 0;">
									1 <span class="glyphicon glyphicon-star"></span>
								</div>
							</div>
							<div class="pull-left" style="width: 180px;">
								<div class="progress" style="height: 13px; margin: 8px 0;">
									<div class="progress-bar progress-bar-danger"
										role="progressbar" aria-valuenow="1" aria-valuemin="0"
										aria-valuemax="5" style="width: ${percent1Star}%"></div>
								</div>
							</div>
						</div>
						<div class="pull-left col-md-offset-3 rotate">
							<button id="dragToReviewSection" data-toggle="tooltip"
								data-placement="bottom" title="Total Reviewers"
								style="color: black; background: white; border: 0;" class="btn">
								<span class="fa fa-user fa-lg"></span>
							</button>
							<span style="font-size: 16px; color: black;" class="label">${reviews}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>