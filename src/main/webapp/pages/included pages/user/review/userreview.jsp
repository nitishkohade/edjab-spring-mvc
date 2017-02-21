<div class="row">
	<div class="col-md-12">
		<div class="panel with-nav-tabs">


			<div class="panel-body">
				<div class="tab-content">
					<div class="tab-pane fade in active">
						<div class="row">
							<div class="span12">

								<p ng-cloak class="text-center"
									id="user_review_no_reviews"
									ng-show="noSchoolReviewed==true">
									<b>You haven't reviewed yet...</b>
								</p>

								<span ng-init="userReviewInit('${user_emailId}')"></span>

								<div class="container col-lg-12 col-md-12 col-sm-12 col-xs-12">
																			
										<div ng-slide-down="!widgetExpanded" lazy-render duration="0.9" 
											ng-repeat="s in reviewedSchools | limitTo:5 track by $index">
											
											<span id="review_slide{{$index+1}}" style="display: none;"							
											ng-click="widgetExpanded = !widgetExpanded"> 												
											</span>
											
											{{action($index+1)}}
											<div style="background:white;color:black; box-shadow: black 1px 2px 11px;" ng-style="{'display':(widgetExpanded==true?'none':'block')}" 
											ng-slide-down="!widgetExpanded" lazy-render duration="0.6"																			
												class="alert alert-success"
												id="user_review_alert_box">
												<p style="text-indent: -30px;" class="lead">
													<span style="float: right; color: white; text-indent: 0px;">

														<button style="border: 0;" id="{{$index+1}}" ng-click=action($index+1)
															class="btn btn-success" aria-label="Review Action">
															<i class="glyphicon glyphicon-wrench"></i>
														</button>
													</span> <span class="label label-success"> {{$index+1}} </span>
													 {{s.instituteId}} <br/> <span style="font-size: 19px;">
														 {{s.cityState}} </span> <br/>
												<div>
													<span class="label label-success" style="font-size: 18px;">Your
														Rating:</span>


													<button style="border:0;"
													type="button" class="btn btn-sm"
														ng-class="s.ratedNumber>=1?'btn-warning':'btn-default'"
														aria-label="Left Align">
														<span class="glyphicon glyphicon-star" aria-hidden="true">
														</span>
													</button>
													<button style="border:0;" 
													type="button" class="btn btn-sm"
														ng-class="s.ratedNumber>=2?'btn-warning':'btn-default'"
														aria-label="Left Align">
														<span class="glyphicon glyphicon-star" aria-hidden="true">
														</span>
													</button>
													<button style="border:0;"
													type="button" class="btn btn-sm"
														ng-class="s.ratedNumber>=3?'btn-warning':'btn-default'"
														aria-label="Left Align">
														<span class="glyphicon glyphicon-star" aria-hidden="true">
														</span>
													</button>
													<button style="border:0;"
													type="button" class="btn btn-sm"
														ng-class="s.ratedNumber>=4?'btn-warning':'btn-default'"
														aria-label="Left Align">
														<span class="glyphicon glyphicon-star" aria-hidden="true">
														</span>
													</button>
													<button style="border:0;"
													type="button" class="btn btn-sm"
														ng-class="s.ratedNumber>=5?'btn-warning':'btn-default'"
														aria-label="Left Align">
														<span class="glyphicon glyphicon-star" aria-hidden="true">
														</span>
													</button>



												</div>
												<br />
												<div class="row">
												<div class="col-md-12">
													<span class="label label-success" style="font-size: 18px;">Your
														Review:</span> <br/> 
														<span>	
														
														<div class="form-group">																													
															<textarea disabled 
															rows="3" 
															cols="50"
															class="form-control"
															id="user_review_text_area" 
															maxlength="500">{{s.body}}</textarea>
															</div>															
														</span>
														</div>
												</div>
												</p>

											</div>
											<%@include file="editreview.jsp" %>
											<br/>
											
											
											
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