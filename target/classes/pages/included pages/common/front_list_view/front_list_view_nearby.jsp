	        	
            	<div style="background: white;" ng-show="totalSchoolPerRange()!=0;"   class="container">
			<div class="col-lg-12 col-md-12" style="background: white;color: black;font-size: inherit;">
			    <div class="pull-left" style="margin-top: 10px;"
			    ng-show="noOfdisplayedSchoolPerRange!=0" 
			    ng-cloak class="col-lg-7 col-md-7 col-sm-5"> 
			    <p style="font-size: 15px;" ng-cloak>Displaying Schools 1-{{noOfdisplayedSchoolPerRange}} of {{totalSchoolPerRange()}}
			    </p>
			    </div>
			     <div class="pull-left" style="margin-top: 10px;"
			     ng-show="noOfdisplayedSchoolPerRange==0" 
			     ng-cloak class="col-lg-7 col-md-7 col-sm-5"> 
			     <p style="font-size: 15px;" ng-cloak>Displaying Schools {{noOfdisplayedSchoolPerRange}} of {{totalSchoolPerRange()}}
			     </p>
			     </div>
			     
			    <div>         
			    <div  class="pull-right col-lg-5 col-md-5 col-sm-5" > 
			    
			    <ul style="list-style: none;font-size: 15px;margin-top: 7px;">
			    <li style="display: inline-block;">
			    <p>
			    <label>Filter By:</label>
			    
				<input ng-keyup="filteringSchoolPerRange()"
				style="border-radius:0px;width:185px;height:30px;
				font-variant: small-caps;
				outline: none;
				border: 1px block ;
				font-family: Times, serif;  
				letter-spacing:2px;
				cursor: text;"
            	ng-model="filterListViewNearby"
            	placeholder="filter out schools..."
            	autocomplete="off"/>
            	</p>
			    </li>
			    
			   <li style="display: inline-block;">
			   		 <label>Sort By:</label>  
			   <span             	
            	style="color:white;border:0;font:inherit;				
				font-variant: small-caps;
				background:gold;
				font-family: Times, serif;  
				cursor: pointer;"
            	class="label">
            	<i 
            	class="fa fa-angle-down" 
            	ng-click="decreasingListViewNearby()">
            	</i>
            	<i 
            	class="fa fa-angle-up" 
            	ng-click="increasingListViewNearby()">
            	</i>
            	Rating
            	</span>
			   </li>
			   </ul>
			               
			      </div>
			      </div>
			      
			 </div>
			 
			 </div>	
				
			
				
				
				
				<br>
            	
            	
            	<div  id="container_list_view"
				class="container">
				<div class="col-lg-12 col-md-12">
				
			<!--  	<p id="header_list_view"
			 	ng-cloak class="bg-success text-center"
				 ng-show="dummyNearbyCategoryId==undefined && dummyRange==undefined"><b>Please allow this website  to track your location</b></p>
				
				<p id="header_list_view"
				id="header_list_view"
				ng-cloak class="bg-success text-center"
				 ng-show="dummyNearbyCategoryId!=undefined && dummyRange==undefined && orderRatingNearby=='-averageRating'">
				 <b>Highest Rated {{dummyNearbyCategoryId}} Universities</b></p>
				 
				 <p id="header_list_view"
				 ng-cloak class="bg-success text-center"
				 ng-show="dummyNearbyCategoryId!=undefined && dummyRange==undefined && orderRatingNearby=='averageRating'">
				 <b>Lowest Rated {{dummyNearbyCategoryId}} Universities</b></p>
				
				<p id="header_list_view"
				ng-cloak class="bg-success text-center"
				 ng-show="dummyNearbyCategoryId!=undefined && dummyRange!=undefined && orderRatingNearby=='-averageRating'">
				 <b>Highest Rated {{dummyNearbyCategoryId}} Universities within {{dummyRange}} Km in range</b></p>
				  
				  <p id="header_list_view"
				  ng-cloak class="bg-success text-center"
				 ng-show="dummyNearbyCategoryId!=undefined && dummyRange!=undefined && orderRatingNearby=='averageRating'">
				 <b>Lowest Rated {{dummyNearbyCategoryId}} Universities within {{dummyRange}} Km in range</b></p>
				
				<p id="header_list_view"
				ng-cloak class="bg-success text-center"
				 ng-show="dummyNearbyCategoryId==undefined && dummyRange!=undefined && orderRatingNearby=='-averageRating'">
				 <b>Highest Rated Universities within {{dummyRange}} Km in range</b></p>
				  
				  <p id="header_list_view"
				  ng-cloak class="bg-success text-center"
				 ng-show="dummyNearbyCategoryId==undefined && dummyRange!=undefined && orderRatingNearby=='averageRating'">
				 <b>Lowest Rated Universities within {{dummyRange}} Km in range</b></p> -->
				 
				 <p id="header_list_view"
				  ng-cloak class="bg-success text-center">
				 <b>{{listPerRangeHeaderInfo}}</b></p>
				
				
				
				<br>
				
				<p ng-cloak class="text-center" style="color:orange;font-size:22px; font-variant: small-caps;font-family: Times New Roman, Times, serif;"
					 ng-show="noSuchSchoolNearby()==true && totalSchoolPerRange()!=0"><b>No such {{"'"+filterListViewNearby+"'"}} school exists under this category</b></p>
				
				
				<p ng-cloak ng-show="totalSchoolPerRange()==0" 
				class="text-center" style="color:orange;font-size:22px; 
				font-variant: small-caps;font-family: Times New Roman, Times, serif;">
					 <b>No school found under this category</b></p>
				
				
				
				<ul ng-repeat="s in topRatedNearbySchools | filter:dummyNearbyCategoryId | filter:dummyRange
				 | filter:filterListViewNearby | orderBy:orderRatingNearby | limitTo:limitToNearby track by $index"
				class="event-list">
				

					<li style="cursor: pointer;"
					ng-click="switchToSchool(s.key)">
						{{gettingIndexNearby($index)}}
						<time ng-style="{'background-color':threeColorOption($index+1) == 2 ?'#ff7bfd':(threeColorOption($index+1) == 1 ?'#1cf21c':'blue')}">
						
						<br>
							<font 
							size="8">
								<i 
								class="fa fa-university">
								</i>
							</font>
						</time>
						<div 
						class="info">
								<h2 ng-cloak
								style="color:black;font-family: Times New Roman, Times, serif; font-family: Courier;font-variant: small-caps;font-size:18px;" 
								class="title"><span ng-style="{'background-color':threeColorOption($index+1) == 2 ?'#ff7bfd':(threeColorOption($index+1) == 1 ?'#1cf21c':'blue')}"
								class="label label-default">{{$index+1}}</span> {{s.instituteId}}
								
								<i ng-style="{'color':threeColorOption($index+1) == 2 ?'#ff7bfd':(threeColorOption($index+1) == 1 ?'#1cf21c':'blue')}"
								id="render_to_school_from_list_view" 
								style="right:5px;position: absolute;top:7px;" 
								class="fa fa-external-link fa-2x"></i>
								</h2>
								
								
								
								<p  ng-cloak
								style="color:black;font-family: Times New Roman, Times, serif; font-family: Courier;font-variant: small-caps;font-size:16px;"
								class="desc">{{s.cityState}}
								</p>
							<ul>
								<li
								id="front_list_view_bottom" 
								style="width:100%;">
									
									<div 
									id="main" 
										ng-app="stars">
										    <div star-rating stars="5" 
										    outer-star-selection="stars" 
										    outer-percent="rating=s.averageRating*20" 
										    rating-define="percent" 
										    rating-percent="100" 
										    star-radius="17" 
										    sel-color="gold" 
										    back-color="white">
										    </div>
   

</div>								
									
									
								</li>
								<li 
								id="front_list_view_bottom" 
								style="width:0%;">
									
								
									
									
									
									
								</li>
							</ul>
						</div>
						
					</li>

				
					
				</ul>
				
				</div>
				</div>
				
				<br>
				
				<div ng-show=" 
				noOfdisplayedSchoolPerRange!= totalSchoolPerRange() && totalSchoolPerRange() != 0"
				class="container">
				<div ng-hide="noOfdisplayedSchoolPerRange == 0" class="col-lg-12 col-md-12">
								
            	 <div ng-cloak style="text-align: center;" class="form-group">
            	<a 
            	class="btn"
               	ladda="loadMoreListViewLaddaNearby"
               	data-style="expand-right" 
               	data-spinner-color="rgb(32, 248, 29)"
               	style="color:black;background:white;border:0;font:inherit;" 
               	ng-click="loadMoreListViewNearbyClicked()" type="submit">  
               	<i class="fa fa-plus-circle fa-lg"></i>          	
            	<span  
				ng-show="!loadMoreListViewLaddaNearby">Load More</span>
				<span ng-cloak 
				ng-show="loadMoreListViewLaddaNearby">Loading More</span>         	
            	
            	</a>
            	</div> 
            	</div>
            	</div>
			
	