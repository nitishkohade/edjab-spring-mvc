			
				
				<!--	header 		 -->			 
			 
			<div style="background: white;" ng-show="totalSchoolPerlocation()!=0;"   class="container">
			<div class="col-lg-12 col-md-12" style="background: white;color: black;font-size: inherit;">
			    <div class="pull-left" style="margin-top: 10px;"
			    ng-show="noOfdisplayedSchoolPerLocation!=0" 
			    ng-cloak class="col-lg-7 col-md-7 col-sm-5"> 
			    <p style="font-size: 15px;" ng-cloak>Displaying Schools 1-{{noOfdisplayedSchoolPerLocation}} of {{totalSchoolPerlocation()}}
			    </p>
			    </div>
			     <div class="pull-left" style="margin-top: 10px;"
			     ng-show="noOfdisplayedSchoolPerLocation==0" 
			     ng-cloak class="col-lg-7 col-md-7 col-sm-5"> 
			     <p style="font-size: 15px;" ng-cloak>Displaying Schools {{noOfdisplayedSchoolPerLocation}} of {{totalSchoolPerlocation()}}
			     </p>
			     </div>
			     
			    <div>         
			    <div  class="pull-right col-lg-5 col-md-5 col-sm-5" > 
			    
			    <ul style="list-style: none;font-size: 15px;margin-top: 7px;">
			    <li style="display: inline-block;">
			    <p>
			    <label>Filter By:</label>
			    
				<input ng-keyup="filteringSchoolPerLocation()"
				style="border-radius:0px;width:185px;height:30px;
				font-variant: small-caps;
				outline: none;
				border: 1px block ;
				font-family: Times, serif;  
				letter-spacing:2px;
				cursor: text;"
            	ng-model="filterListView"
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
            	class="fa fa-angle-up" 
            	ng-click="increasingListView()">
            	</i>
            	<i 
            	class="fa fa-angle-down" 
            	ng-click="decreasingListView()">
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
				
				
				
								
				<p id="header_list_view"
				ng-cloak class="bg-success text-center">
					 <b>{{listPerLocationHeaderInfo}}</b>
				</p>
				
				
				<!-- <p id="header_list_view"
				ng-cloak class="bg-success text-center" 
				ng-show="categoryId==undefined && dummyLocationId==undefined && orderRating=='-averageRating'">
					 <b>Highest Rated Universities</b></p>
				
				<p id="header_list_view"
				ng-cloak class="bg-success text-center" 
				ng-show="categoryId==undefined && dummyLocationId==undefined && orderRating=='averageRating'">
					 <b>Lowest Rated Universities</b></p>
				
				
				<p id="header_list_view"
				ng-cloak class="bg-success text-center" 
				ng-show="categoryId!=undefined && dummyLocationId==undefined && orderRating=='-averageRating'">
					 <b>Highest Rated {{categoryId}} Universities</b></p>
				
				<p id="header_list_view"
				ng-cloak class="bg-success text-center" 
				ng-show="categoryId!=undefined && dummyLocationId==undefined && orderRating=='averageRating'">
					 <b>Lowest Rated {{categoryId}} Universities</b></p>
				
				<p id="header_list_view"
				ng-cloak class="bg-success text-center" 
				ng-show="categoryId==undefined && dummyLocationId!=undefined && orderRating=='-averageRating'">
					 <b>Highest Rated Universities in {{dummyLocationId}} city </b></p>
				
				<p id="header_list_view"
				ng-cloak class="bg-success text-center" 
				ng-show="categoryId==undefined && dummyLocationId!=undefined && orderRating=='averageRating'">
					 <b>Lowest Rated Universities in {{dummyLocationId}} city</b></p>
				
				<p id="header_list_view"
				ng-cloak class="bg-success text-center" 
				ng-show="categoryId!=undefined && dummyLocationId!=undefined && orderRating!='-averageRating'">
					 <b>Highest Rated {{categoryId}} Universities in {{dummyLocationId}} city</b></p>
				
				<p id="header_list_view"
				ng-cloak class="bg-success text-center" 
				ng-show="categoryId!=undefined && dummyLocationId!=undefined && orderRating!='averageRating'">
					 <b>Lowest Rated {{categoryId}} Universities in {{dummyLocationId}} city</b></p>
				 -->
				
				<p ng-cloak class="text-center" style="color:orange;font-size:22px; font-variant: small-caps;font-family: Times New Roman, Times, serif;"
					 ng-show="noSuchSchool()==true && totalSchoolPerlocation()!=0"><b>No such {{"'"+filterListView+"'"}} school exists under this category</b></p>
				
				
				
				<p ng-cloak ng-show="totalSchoolPerlocation()==0" 
				class="text-center" style="color:orange;font-size:22px; 
				font-variant: small-caps;font-family: Times New Roman, Times, serif;">
					 <b>No school found under this category</b></p>
				
				<ul ng-animate="'animate'" 
				ng-repeat="s in topRatedSchools | filter:selectedCategory | filter:locationId | filter:filterListView | orderBy:orderRating | limitTo:limitTo track by $index"
				class="event-list">
				

					<li style="cursor: pointer;"
					ng-click="switchToSchool(s.key)" ng-show="s.locationId==locationId">
						{{gettingIndex($index)}} 
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
				noOfdisplayedSchoolPerLocation!= totalSchoolPerlocation() && totalSchoolPerlocation() != 0" class="container">
				<div ng-hide="noOfdisplayedSchoolPerLocation == 0" class="col-lg-12 col-md-12">
								
            	 <div ng-cloak style="text-align: center;" class="form-group">
            	<a 
            	class="btn"
               	ladda="loadMoreListViewLadda"
               	data-style="expand-right" 
               	data-spinner-color="rgb(32, 248, 29)"
               	style="color:black;background:white;border:0;font:inherit;" 
               	ng-click="loadMoreListViewClicked()" type="submit">  
               	<i class="fa fa-plus-circle fa-lg"></i>          	
            	<span  
				ng-show="!loadMoreListViewLadda">Load More</span>
				<span ng-cloak 
				ng-show="loadMoreListViewLadda">Loading More</span>         	
            	
            	</a>
            	</div> 
            	</div>
            	</div>
			

	