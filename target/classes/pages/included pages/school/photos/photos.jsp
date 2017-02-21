<br>
<div class="container image_container">
	<h2>
		<span>Images</span>
	</h2>
	<div class="row user-menu-container square">
		<div class="row">
			<div class="col-md-12">
				<div class="panel with-nav-tabs panel-warning">
					<p id="image_container_1a" ng-cloak class="text-center"
					ng-show="noSchoolImages==true">
						<b> There are no Images for this university...</b>
						<br>
						<br>
					</p>
					<div ng-cloak ng-init="getSchoolImages('${instituteId}')"
						class="panel-body">
						<div class="tab-content">
							<div class="tab-pane fade in active" id="tab1warning">
								<div class="container mt40">
									<section class="row">
										<span
											ng-repeat="photo in imagesToSchool | limitTo:limitImageTo track by $index"">
											<article class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
												<div class="panel panel-default">
													<div class="panel-body">
														<a class="zoom" data-type="image"> <img
															src={{photo.imageUrl}} height="200" width="100%" />
														</a>
													</div>
													<div id="image_container_helpful"
														ng-style="{'background':((($index+1)%2)==0?'#49E203':'#3EC700')}"
														ng-show="photo.uploadedBy!='${user_emailId}'"
														class="panel-footer">
														<h4>
															<a	title="Nature Portfolio"> Is This Helpful? </a>
														</h4>
														<i ng-click="helpfulPhoto(photo, $index+1)"
															ng-style="{'background':((($index+1)%2)==0?'#49E203':'#3EC700')}"
															ng-disabled="photo.disableHelpfulPhoto==true"
															style="color: white; margin-top: -38px;"
															class="pull-right btn btn-success fa fa-thumbs-up fa-lg">
														</i>
													</div>
												</div>
											</article>
										</span>
									</section>
								</div>
							</div>
						</div>
					</div>
					<div id="image_loadmore"
					ng-cloak ng-show="noSchoolImages==false"
					class="form-group">
						<button class="btn fa fa-plus-circle fa-lg"
							ladda="loadMoreImageLadda" data-style="expand-right"
							data-spinner-color="rgb(32, 248, 29)"
							ng-click="loadMoreImageClicked(limitImageTo)" type="submit">
							<span ng-show="!loadMoreImageLadda">Load More</span> <span
								ng-cloak ng-show="loadMoreImageLadda">Loading More</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>