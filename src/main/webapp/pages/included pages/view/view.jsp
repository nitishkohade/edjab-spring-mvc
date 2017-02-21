
<br>
	<div class="listmapviewflip" style="background-color: #eeeeee;text-align: center;">	
		
	<div align="center">		
	<div class="listmapview" 
    style="overflow: hidden;margin-top: 0px;">
    	<div class="wrapper"> 
    		<div class="face front">Views</div> 
    		<div class="face back">Views</div> 
  		</div> 
	</div>
		</div>	
			<br><br>
			
<div class="container">
     	   	
    	<div align="center">
    	<div class="container">    	
    		<div class="col-lg-10 col-lg-offset-2 col-md-10 col-md-offset-2 col-sm-10 col-sm-offset-2 col-xs-10 col-xs-offset-2">
    		
    		<div id="front_map_view" href="#prices2" data-toggle="tab" ng-click="frontMapViewClicked()" 
    		style="background: white;padding:12px;cursor:pointer;"
    		ng-style="{'box-shadow':((frontMapView==true)?'1px 1px':'1px 3px 3px black')}"
    		class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
	    		 <span class="fa fa-map-marker fa-lg">  
	    		 Map View
			     </span>
    		</div>
    		
    		<div id="front_list_view" href="#prices3" data-toggle="tab" ng-click="frontListViewClicked()" 
    		style="background: white;padding:12px;cursor:pointer;"
    		ng-style="{'box-shadow':((frontListView==true)?'1px 1px':'1px 3px 3px black')}"
    		class="col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-4 col-sm-offset-1 col-xs-4 col-xs-offset-1">
	    		<span class="fa fa-list-ul fa-lg">
			    List View
			    </span>
    		</div>
    		
    		</div>    		
    	</div>
    	</div>
    	
    	
    	
    <br><br>
    
	    <div ng-controller="FrontListViewController" 
	    class="tab-content">
	    
		       <div 
		       class="tab-pane active ui-widget"  
		       id="prices2">	       
			        
			        	<div style="    background: white;
    					margin: -15px;" ng-show="specificLocationTab==true" ng-controller="FrontMapViewController">
						<%@ include file="../common/front_map_view/front_map_view.jsp"%>
		             	</div>
		             	<div style="    background: white;
    					margin: -15px;"
		             	ng-show="nearbyLocationTab==true" >
						<%@ include file="../common/front_map_view/front_map_view_nearby.jsp"%>
		             	</div>
		             	         
		       </div>    
								 
		       <div  
		       id="prices3" 
		       class="tab-pane ui-widget">
		               
		        <div ng-show="specificLocationTab==true">     
		        <%@ include file="../common/front_list_view/front_list_view.jsp"%>
				</div>
				<div ng-show="nearbyLocationTab==true">
				<%@ include file="../common/front_list_view/front_list_view_nearby.jsp"%>
				</div>           
		
		       </div>
	    
	    </div>    
</div>
			
			
			
			<br><br>
			
</div>