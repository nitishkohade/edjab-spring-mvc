<div class="col-lg-6 col-md-6">
							
				<div class="review-block" style="background: white;height: 172px;"	
				 ng-show="totalCriticalReviewsLength==0">
				
				<div style="display: inline-block;     text-align: center;
			    width: 100%;
			    background: #eae9e9;
			    font-size: 16px;" class="head caption">
					<span style="color:black"><b>Most Helpful Critical Reviews</b></span>
				</div>
												
				<p ng-cloak class="text-center" style="color:orange;font-size:22px; margin-top: 70px;
				font-variant: small-caps;font-family: Times New Roman, Times, serif;">
				<b style="font:inherit;">There are no critical reviews for this school...</b></p>
								
				</div>
								
				<div ng-show="totalCriticalReviewsLength!=0"
				style="background: white;"			
				ng-repeat="review in totalCriticalReviews | orderBy: 'ratedNumber' | limitTo:1 track by $index" class="review-block">
				
				
				<div style="display: inline-block; text-align: center;
			    width: 100%;
			    background: #eae9e9;
			    font-size: 16px;" class="head caption">
					<span ng-cloak style="color:black"><b>Most Helpful Critical Review ({{totalCriticalReviewsLength}})</b></span>
				</div>
				
				<div style="color:black;" ng-cloak class="review-block-date pull-right">{{review.daysAgo}} days ago</div>
				
					<div ng-cloak class="row">
						<div class="col-sm-2">
														
							{{reviewImageLetter(review.reviewedBy)}}
							
							<span ng-cloak class="reviewer-imgName-critical">{{reviewImageCharacter}}</span>
							<div style="color:black;" class="review-block-name"><a  ng-cloak href="#">{{review.reviewedBy}}</a></div>
							
						</div>
						
						<div class="col-sm-10">
							<div class="review-block-rate">
								<button style="border: 0;"
								ng-class="{'btn-warning':review.ratedNumber>=1}"
								type="button" class="btn btn-default btn-md" aria-label="Left Align">
								  <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
								</button>
								<button style="border: 0;"
								ng-class="{'btn-warning':review.ratedNumber>=2}"
								type="button" class="btn btn-default btn-md" aria-label="Left Align">
								  <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
								</button>
								<button style="border: 0;"
								ng-class="{'btn-warning':review.ratedNumber>=3}"
								type="button" class="btn btn-default btn-md" aria-label="Left Align">
								  <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
								</button>
								<button style="border: 0;"
								ng-class="{'btn-warning':review.ratedNumber>=4}"
								type="button" class="btn btn-default btn-md" aria-label="Left Align">
								  <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
								</button>
								<button style="border: 0;"
								ng-class="{'btn-warning':review.ratedNumber>=5}"
								type="button" class="btn btn-default btn-md" aria-label="Left Align">
								  <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
								</button>
							</div>
							<br>
							
							<div  ng-cloak style="color:black;font: inherit;" class="review-block-description">{{review.reviewBody}}</div>
							<br/>
						</div>
						<br/><br/>
					</div>
										
					<div ng-click="DisplayCriticalReviews()" ng-cloak
					style="cursor:pointer; color:#1f95d5; text-align: center;" 
					id="footer_review"><b>See {{totalCriticalReviewsLength}} critical reviews</b>
									
					</div>
										
				</div>
							
			</div>