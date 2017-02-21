
<div class="user_comment_container container">
	<h2>
		<span>Reviews</span>
	</h2>
	<div ng-init="schoolReviewContent('${instituteId}')"
		class="row user_comment_container_1a square">
		<div class="row">
			<div class="form-group col-md-12">
				<%@ include file="review_content.jsp"%>

				<hr>
				<div class="form-group">

					<div id="reviewSection" ng-click="reviewToSchool()">
						<a id="leave_review_btn"
							ng-style="{'box-shadow':(widgetExpanded==true)?'1px 1px 3px':'1px 3px 9px'}"
							class="ripple label label-default col-lg-12 col-md-12 col-sm-12 col-xs-12">
							Leave a Review </a>
					</div>

					<div ng-slide-down="widgetExpanded" lazy-render duration="0.4"
						class="col-md-12">
						<div class="well well-sm">


							<div class="row" id="post-review-box">
								<div style="margin-top: 30px;" class="col-md-12">
									<div class="form-group"
										ng-class="{'has-error':reviewTextError}">
										<textarea maxlength="500" ng-model="reviewText"
											class="form-control animated has-error" cols="50"
											id="new-review" name="comment"
											placeholder="Enter your review here..." rows="5">
                        </textarea>
									</div>
									<div class="text-right">
										<br>
										<button ng-mouseenter="enter=1" ng-mouseleave="enter=0"
											ng-click="schoolStarRating=1"
											style="border: 0; border-radius: 1px;"
											ng-class="{'btn-warning':enter==1||enter==2||enter==3||enter==4||enter==5|| 
    				schoolStarRating==1||schoolStarRating==2||schoolStarRating==3||schoolStarRating==4||schoolStarRating==5}"
											type="button" class="btn btn-default btn-lg"
											aria-label="Left Align">
											<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
										</button>
										<button ng-mouseenter="enter=2" ng-mouseleave="enter=0"
											ng-click="schoolStarRating=2"
											style="border: 0; border-radius: 1px;"
											ng-class="{'btn-warning':enter==2||enter==3||enter==4||enter==5||
    				schoolStarRating==2||schoolStarRating==3||schoolStarRating==4||schoolStarRating==5}"
											type="button" class="btn btn-default btn-lg"
											aria-label="Left Align">
											<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
										</button>
										<button ng-mouseenter="enter=3" ng-mouseleave="enter=0"
											ng-click="schoolStarRating=3"
											style="border: 0; border-radius: 1px;"
											ng-class="{'btn-warning':enter==3||enter==4||enter==5||schoolStarRating==3||schoolStarRating==4||schoolStarRating==5}"
											type="button" class="btn btn-default btn-lg"
											aria-label="Left Align">
											<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
										</button>
										<button ng-mouseenter="enter=4" ng-mouseleave="enter=0"
											ng-click="schoolStarRating=4"
											style="border: 0; border-radius: 1px;"
											ng-class="{'btn-warning':enter==4||enter==5||schoolStarRating==4||schoolStarRating==5}"
											type="button" class="btn btn-default btn-lg"
											aria-label="Left Align">
											<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
										</button>
										<button ng-mouseenter="enter=5" ng-mouseleave="enter=0"
											ng-click="schoolStarRating=5"
											style="border: 0; border-radius: 1px;"
											ng-class="{'btn-warning':enter==5||schoolStarRating==5}"
											type="button" class="btn btn-default btn-lg"
											aria-label="Left Align">
											<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
										</button>
										<br> <br>

										<button ng-disabled="disableCancel"
											ng-click="schoolStarRating=0; reviewTextError=false;reviewText=null;reviewToSchool()"
											style="background: white; color: black; border: 0;"
											col-md-offset-1 class="btn fa fa-times-circle fa-lg">
											Cancel</button>
										<button ladda="submitReview" data-style="expand-right"
											data-spinner-color="rgb(32, 248, 29)"
											ng-click="saveSchoolReview(schoolStarRating, reviewText, '${instituteId}')"
											style="background: white; color: black; border: 0;"
											class="btn fa fa-check-circle fa-lg">
											<span ng-show="!submitReview">Save</span> <span ng-cloak
												ng-show="submitReview">Saving</span>
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

