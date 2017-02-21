<div class="row">
	<div class="col-md-12">
		<div class="panel with-nav-tabs">


			<div class="panel-body">
				<div class="tab-content">
					<div class="tab-pane fade in active">
						<div class="row">
							<div class="span12">
							
							<p ng-cloak class="text-center" style="color:orange;font-size:22px; font-variant: small-caps;font-family: Times New Roman, Times, serif;"
					 ng-show="noSchoolLiked==true"><b>You haven't liked any University</b></p>
				
						<span ng-init="userLikeInit('${user_emailId}')"></span>	
				
							
				<div class="container col-lg-12 col-md-12 col-sm-12">
				<div 
				ng-repeat="s in likedSchools | limitTo:5 track by $index">
				
			    <div ng-click=clickLikedSchool(s.key)
			    class="alert-success"
			    style="padding-left: 60px;padding-right: 12px; padding-top: 10px;
    			padding-bottom: 1px; 
    			cursor:pointer;
    			font-size:22px; 
    			font-variant: small-caps;
    			font-family: Times New Roman, Times, serif;">      
			       <p style="text-indent: -30px;" class="lead">
			       <span style="float:right;background: dodgerblue;color:white;">
                		<button style="border: 0;" ng-click="removeLike(s.key); $event.stopPropagation();" class="btn btn-success" aria-label="Remove">X</button>
            		</span>
			       <span class="label label-success">{{$index+1}}</span> 
			        {{s.instituteId}}
			        
			       <br/><span style="font-size:19px;">{{s.cityState}}</span>   
			      
			    	
			       </p>        
			    
			    </div>	
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