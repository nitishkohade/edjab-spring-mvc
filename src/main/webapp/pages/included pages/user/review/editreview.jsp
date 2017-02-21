<div style="box-shadow: black 1px 2px 11px;" ng-cloak ng-slide-down="widgetExpanded" lazy-render duration="0.9">
	
		
	
		<div id="edit_review_alert_box" class="alert alert-success">
					
					<p style="text-indent: -30px;" class="lead">
													<span style="float: right; color: white; text-indent: 0px;">

													</span> <span class="label label-success"> {{$index+1}} </span>
													{{ s.instituteId}} <br/> <span style="font-size: 19px;">
														{{ s.cityState}} </span> <br/>
														</p>
					
					
					<div data-toggle="tooltip" title="Click to View" 
												data-delay="50" data-placement="top"  style="margin-top: 12px;">
										
					<span class="label label-success" style="font-size: 18px;">Edit Review:</span>
					
					<br/>
					<div class="row">
												<div class="col-md-12">
					<div class="form-group">
					<textarea id="edit_review_text_area"
					class="form-control" 
						ng-init="textReview=s.body"
						ng-model="textReview"
						rows="3" 
						cols="50"
						maxlength="500">
					</textarea>
					</div>
					</div>
					</div>
					
						
						
						
						<div>
													<span class="label label-success" style="font-size: 18px;">Edit Rating:</span>


													<button  style="border:0;" 
													ng-click=clickRating(s,1) type="button" class="btn btn-sm" 
														ng-mouseenter=enter1($index+1)
    													ng-mouseleave=leave1($index+1)
														ng-class="{
															'btn-warning':hover1==($index+1)+(10*($index+1))||s.ratedNumber>=1, 
																 'btn-default':!hover1||s.ratedNumber<1
																 }"
														aria-label="Left Align">
														<span class="glyphicon glyphicon-star" aria-hidden="true">
														</span>
													</button>
													<button style="border:0;"
													ng-click=clickRating(s,2) type="button" class="btn btn-sm"
														ng-mouseenter=enter2($index+1)
    													ng-mouseleave=leave2($index+1)
														ng-class="{
														 'btn-warning':hover2==($index+2)+(10*($index+1))||s.ratedNumber>=2, 
														 'btn-default':!hover2||s.ratedNumber<2
														 }"
														aria-label="Left Align">
														<span class="glyphicon glyphicon-star" aria-hidden="true">
														</span>
													</button>
													<button style="border:0;"
													ng-click=clickRating(s,3) type="button" class="btn btn-sm"
														ng-mouseenter=enter3($index+1)
    													ng-mouseleave=leave3($index+1)
														ng-class="{
														 'btn-warning':hover3==($index+3)+(10*($index+1))||s.ratedNumber>=3, 
														 'btn-default':!hover3||s.ratedNumber<3
														 }"
														aria-label="Left Align">
														<span class="glyphicon glyphicon-star" aria-hidden="true">
														</span>
													</button>
													<button style="border:0;"
													ng-click=clickRating(s,4) type="button" class="btn btn-sm"
														ng-mouseenter=enter4($index+1)
    													ng-mouseleave=leave4($index+1)
														ng-class="{
														 'btn-warning':hover4==($index+4)+(10*($index+1))||s.ratedNumber>=4, 
														 'btn-default':!hover4||s.ratedNumber<4
														 }"
														aria-label="Left Align">
														<span class="glyphicon glyphicon-star" aria-hidden="true">
														</span>
													</button>
													<button style="border:0;"
													ng-click=clickRating(s,5) type="button" class="btn btn-sm"
														ng-mouseenter=enter5($index+1)
    													ng-mouseleave=leave5($index+1)
														ng-class="{
														 'btn-warning':hover5==($index+5)+(10*($index+1))||s.ratedNumber>=5, 
														 'btn-default':!hover5||s.ratedNumber<5
														 }"
														aria-label="Left Align">
														<span class="glyphicon glyphicon-star" aria-hidden="true">
														</span>
													</button>



												</div>
												
																								
												
										<hr>		
					<div class="row">
					<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12"  style="margin-bottom: 12px;">
					
					<div ng-click=editReview(s,textReview,$index) id="edit_review_save"
					class="col-md-5 col-lg-5 col-sm-5 col-xs-5">
						<div align="center">Save</div>						
					</div>
					
					<div ng-click=cancelReview($index+1,s) ng-disabled="saving==true" id="edit_review_cancel"
					class="col-md-5 col-md-offset-2 col-lg-5 col-lg-offset-2 col-sm-5 col-sm-offset-2 col-xs-5 col-xs-offset-2">	
						<div align="center">Cancel</div>
					</div>
					
					</div>
					</div>
					
					</div>
												
												

		</div>
	
	
</div>