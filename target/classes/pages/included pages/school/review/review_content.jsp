<div  class="container">
<div class="col-lg-12 col-md-12">

<div ng-show="totalReviews!=0">
<%@include  file="review_critical.jsp" %>

<%@include file="review_positive.jsp" %>
</div>

</div>
</div>
<br/>
<div ng-show="totalReviews!=0;"  id="reviewBodySection"  class="container">
<div ng-init="recent=true" class="col-lg-12 col-md-12" style="background: white;color: black;font-size: inherit;">
    <div ng-show="noOfdisplayedReviews!=0" ng-cloak class="col-lg-7 col-md-7"> <p ng-cloak>Displaying Reviews 1-{{noOfdisplayedReviews}} of {{totalReviews}}</p></div>
     <div ng-show="noOfdisplayedReviews==0" ng-cloak class="col-lg-7 col-md-7"> <p ng-cloak>Displaying Reviews {{noOfdisplayedReviews}} of {{totalReviews}}</p></div>
                   
    <div  class="col-lg-5 col-md-5" > 
    <label>SORT BY:</label>
    <a class="label label-primary" ng-show="recent==true" ng-click="orderByDays_Recent(); recent=false" id="most_recent_review">Most Recent</a>
    <a class="label label-primary" ng-show="recent==false" ng-click="orderByDays_Old(); recent=true" id="most_recent_review">Most Oldest</a>
    
    <label>FILTER BY:</label>
                        <select 
                        ng-options="item.field for item in fieldTable" 
                        ng-model="selectedRating" 
                        ng-change="ratingBy()">
                            
                         </select>
                        
      </div>
 </div>
 </div>
 <br>
 
<div  class="container">
			<div class="col-lg-12 col-md-12">
				<p ng-cloak class="text-center" style="color:orange;font-size:22px; font-variant: small-caps;font-family: Times New Roman, Times, serif;"
					 ng-show="noReviewsMade==true"><b>There are no reviews yet posted for this university...</b></p>
				<div ng-cloak style=""
				ng-style="{'background':((($index+1)%2)==0?'white':'#FDFDFD')}"
				ng-repeat="review in schoolReviews | orderBy: orderBy | filter: filterByRating | limitTo:limitReviewTo track by $index" class="review-block">
				{{displayReviews($index+1)}}
			<span  ng-cloak class="label label-warning pull-right">{{$index+1}}</span>
			<br/>
			<div style="color:black;" ng-cloak class="review-block-date pull-right">{{review.daysAgo}} days ago</div>
					<div ng-cloak class="row">
						<div class="col-sm-2">
														
							{{reviewImageLetter(review.reviewedBy)}}
							
							<span ng-cloak ng-style="{'background':((($index+1)%2)==0?'red':'blue')}"
							class="reviewer-imgName">{{reviewImageCharacter}}</span>
							
							<div style="color:black;" class="review-block-name"><a ng-cloak href="#">{{review.reviewedBy}}</a></div>
							
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
							<!-- <div class="review-block-title">this was nice in buy</div> -->
							<div ng-cloak style="color:black;font: inherit;" class="review-block-description">{{review.reviewBody}}</div>
							<br/>
						</div>
						<br/><br/>
					</div>
				
					
					<div ng-show="review.userReviewed!='${user_emailId}'"
					style="color:black;" id="footer_review">Was this review helpful?
					<a class="label label-warning"
					id="helful_review_btn:hover" 
					style="text-decoration: none;cursor: pointer;"
					ng-click="helpfulReview(review, $index+1)" 
					ng-disabled="review.disableHelpfulReview==true"
					data-toggle="tooltip" data-placement="bottom" title="Yes!"> YES </a>
					</div>
				</div>
				
				<div ng-cloak  ng-show="noReviewsMade==false" style="text-align: center;" class="form-group">
						            	<button ng-show="totalReviews != noOfdisplayedReviews"
						            	class="btn fa fa-plus-circle fa-lg"
						               	ladda="loadMoreReviewLadda"
						               	data-style="expand-right"
						               	style="color:black;background:white;z-index: 0;border:0" 
						               	data-spinner-color="rgb(32, 248, 29)"
						               	ng-click="loadMoreReviewClicked(limitReviewTo)"				                        
						               	type="submit">            	
						            	<span  
										ng-show="!loadMoreReviewLadda">Load More</span>
										<span ng-cloak 
										ng-show="loadMoreReviewLadda">Loading More</span>         	
						            	
						            	</button>
						            	</div>
			</div>
		</div>