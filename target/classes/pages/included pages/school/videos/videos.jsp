

<div class="container video_container">
	<h2>
		<span>Videos</span>
	</h2>
	<div class="row user-menu-container square">

		<div class="row">
			<div class="col-md-12">
				<div class="panel with-nav-tabs panel-warning">

					<p id="video_container_1a" ng-cloak class="text-center"
						ng-show="noSchoolVideos==true">
						<b>There are no Videos for this	university...</b> 
						<br>
						<br>
					</p>

					<div ng-cloak ng-init="getSchoolVideos('${instituteId}')"
						class="panel-body">
						<div class="tab-content">

							<div class="tab-pane fade in active" id="tab1warning">
								<div class="container mt40">
									<div id="insert_video_section" class="row">
										<span ng-cloak
											ng-repeat="video in videosToSchool | limitTo:limitVideoTo track by $index">

											<article class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
												<div class="panel panel-default">
													<div class="panel-body">

														<div class="embed-responsive embed-responsive-16by9">
															<iframe ng-src="{{video.videoUrl}}" height="200"
																width="100%" allowfullscreen></iframe>
														</div>


													</div>

													<div id="video_container_helpful"
														ng-style="{'background':((($index+1)%2)==0?'#49E203':'#3EC700')}"
														ng-show="video.uploadedBy!='${user_emailId}'"
														class="panel-footer">
														<h4>
															<a	title="Nature Portfolio"> Is This Helpful? </a>
														</h4>
														<i ng-click="helpfulVideo(video, $index+1)"
															ng-style="{'background':((($index+1)%2)==0?'#49E203':'#3EC700')}"
															ng-disabled="video.disableHelpfulVideo==true"
															style="color: white; margin-top: -38px; background: #6EFF2C;"
															class="pull-right btn btn-success fa fa-thumbs-up fa-lg">
														</i>
													</div>

												</div>
											</article>

										</span>

									</div>
									<div id="video_loadmore"
									ng-cloak ng-show="noSchoolVideos==false"
									 class="form-group">
										<button class="btn fa fa-plus-circle fa-lg"
											ladda="loadMoreVideoLadda" data-style="expand-right"
											data-spinner-color="rgb(32, 248, 29)"
											ng-click="loadMoreVideoClicked(limitVideoTo)" type="submit">
											<span ng-show="!loadMoreVideoLadda">Load More</span> <span
												ng-cloak ng-show="loadMoreVideoLadda">Loading More</span>

										</button>
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