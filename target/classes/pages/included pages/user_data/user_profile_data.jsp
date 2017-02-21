<!--main container start-->
<div class="container-fluid">

	
<!--main header end-->
	<div id="wrapper">
        <!-- sidebar start -->
        <div id="sidebar-wrapper">
            <div disable-all="refrainAttack" class="sidebar-nav">
				<div class="slider-head">
					<div class="leftTitle"> <span style="font-size:22px;color:white;" class="fa fa-info-circle"></span> 
					<span style="font-size:21px;">USER INFO</span></div>
				</div>
				<br/><br/><br/>
                <div ng-mouseover="mouseOverIndex=1" ng-mouseleave="mouseOverIndex=0" class="row">
                <div 
                ng-style="{background:(mouseOverIndex==1||infoMode=='profile'?'#2ef03a':'white')}"
                style="height: 50px;top:-10px;" 
                class="col-md-1 col-lg-1 col-sm-1 col-xs-1"> 
	                <div class="panel panel-default">
                    <div  style="font-size:22px;">
                    
                    </div>
                    </div>
                </div>
                 <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9"> 
                 <div ng-click="clickToNavigate('', 'profile')" 
                 style="background: #f4f4f4;cursor: pointer;border-radius: 0px;" class="panel panel-default">
                    <a  style="margin-left: 10px;font-size:22px;color:black;text-decoration: none;">
                    <span class="icon-user fa fa-user"></span> PROFILE</a>
                    </div>
                    </div>
                </div>
                
                <div ng-mouseover="mouseOverIndex=2" ng-mouseleave="mouseOverIndex=0" class="row">
                <div 
                ng-style="{background:(infoMode=='edit'||mouseOverIndex==2?'#2ef03a':'white')}"
                style="height: 50px;top:-10px;" 
                class="col-md-1 col-lg-1 col-sm-1 col-xs-1"> 
	                <div class="panel panel-default">
                    <div  style="font-size:22px;">
                    
                    </div>
                    </div>
                </div>
                 <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9"> 
                 <div ng-click="clickToNavigate('', 'edit')"
                 style="background: #f4f4f4;cursor: pointer;border-radius: 0px;"  class="panel panel-default">
                    <a style="margin-left: 10px;font-size:22px; color:black;text-decoration: none;">
                    <span  class="icon-pencil fa fa-pencil"></span> EDIT</a>
                    </div>
                    </div>
                </div>
                <div ng-mouseover="mouseOverIndex=3" ng-mouseleave="mouseOverIndex=0" class="row">
                <div 
                ng-style="{background:(infoMode=='setting'||mouseOverIndex==3?'#2ef03a':'white')}"
                style="height: 50px;top:-10px;" 
                class="col-md-1 col-lg-1 col-sm-1 col-xs-1"> 
	                <div class="panel panel-default">
                    <div  style="font-size:22px;">
                    
                    </div>
                    </div>
                </div>
                 <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9"> 
                 <div ng-click="clickToNavigate('', 'setting')"
                 style="background: #f4f4f4;cursor: pointer;border-radius: 0px;"  class="panel panel-default">
                    <a style="margin-left: 10px;font-size:22px; color:black;text-decoration: none;">
                    <span  class="icon-cog fa fa-cog"></span> SETTING</a>
                    </div>
                    </div>
                </div>
                <div ng-mouseover="mouseOverIndex=4" ng-mouseleave="mouseOverIndex=0" class="row">
                <div 
                ng-style="{background:(infoMode=='liked'||mouseOverIndex==4?'#2ef03a':'white')}"
                style="height: 50px;top:-10px;" 
                class="col-md-1 col-lg-1 col-sm-1 col-xs-1"> 
	                <div class="panel panel-default">
                    <div  style="font-size:22px;">
                    
                    </div>
                    </div>
                </div>
                 <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9"> 
                 <div ng-click="clickToNavigate('', 'liked')"
                 style="background: #f4f4f4;cursor: pointer;border-radius: 0px;" class="panel panel-default">
                    <a style="margin-left: 10px;font-size:22px; color:black;text-decoration: none;">
                    <span class="fa fa-thumbs-up"></span> LIKED</a>
                    </div>
                    </div>
                </div>
                <div ng-mouseover="mouseOverIndex=5" ng-mouseleave="mouseOverIndex=0" class="row">
                <div 
                ng-style="{background:(infoMode=='followed'||mouseOverIndex==5?'#2ef03a':'white')}"
                style="height: 50px;top:-10px;" 
                class="col-md-1 col-lg-1 col-sm-1 col-xs-1"> 
	                <div class="panel panel-default">
                    <div  style="font-size:22px;">
                    
                    </div>
                    </div>
                </div>
                 <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9"> 
                 <div ng-click="clickToNavigate('', 'followed')"
                 style="background: #f4f4f4;cursor: pointer;border-radius: 0px;"  class="panel panel-default">
                    <a style="margin-left: 10px;font-size:22px;color:black;text-decoration: none;">
                    <span class="fa fa-user-plus"></span> FOLLOWED</a>
                    </div>
                    </div>
                </div>
                
                <div ng-mouseover="mouseOverIndex=6" ng-mouseleave="mouseOverIndex=0" class="row">
                <div 
                ng-style="{background:(infoMode=='attended'||mouseOverIndex==6?'#2ef03a':'white')}"
                style="height: 50px;top:-10px;" 
                class="col-md-1 col-lg-1 col-sm-1 col-xs-1"> 
	                <div class="panel panel-default">
                    <div  style="font-size:22px;">
                    
                    </div>
                    </div>
                </div>
                 <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9"> 
                 <div ng-click="clickToNavigate('', 'attended')"
                 style="background: #f4f4f4;cursor: pointer;border-radius: 0px;" class="panel panel-default">
                    <a style="margin-left: 10px;font-size:22px;color:black;text-decoration: none;">
                    <span class="fa fa-graduation-cap"></span> ATTENDED</a>
                    </div>
                    </div>
                </div>             
                <div ng-mouseover="mouseOverIndex=7" ng-mouseleave="mouseOverIndex=0" class="row">
                <div 
                ng-style="{background:(infoMode=='reviewed'||mouseOverIndex==7?'#2ef03a':'white')}"
                style="height: 50px;top:-10px;" 
                class="col-md-1 col-lg-1 col-sm-1 col-xs-1"> 
	                <div class="panel panel-default">
                    <div  style="font-size:22px;">
                    
                    </div>
                    </div>
                </div>
                 <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9"> 
                 <div ng-click="clickToNavigate('', 'reviewed')"
                 style="background: #f4f4f4;cursor: pointer;border-radius: 0px;" class="panel panel-default">
                    <a style="margin-left: 10px;font-size:22px;color:black;text-decoration: none;">
                    <span class="fa fa-comment"></span> REVIEWED</a>
                    </div>
                  </div>
                </div>
                 <%-- <li>
                    <a style="font-size:17px;" 
                    ng-style="{background:(infoMode=='edit'?'#20F81D':''), color:(infoMode=='edit'?'white':'' )}"
                    href="/UserProfileInfo/#/edit">
                    <span  class="icon-pencil fa fa-pencil"></span> EDIT</a>
                </li>
                 <li>
                    <a style="font-size:17px;" 
                    ng-style="{background:(infoMode=='setting'?'#20F81D':''), color:(infoMode=='setting'?'white':'' )}"
                    href="/UserProfileInfo/#/setting">
                    <span  class="icon-cog fa fa-cog"></span> SETTING</a>
                </li>
                 <li>
                    <a style="font-size:17px;" 
                    ng-style="{background:(infoMode=='liked'?'#20F81D':''), color:(infoMode=='liked'?'white':'' )}"
                    href="/UserProfileInfo/#/liked">
                    <span class="fa fa-thumbs-up"></span> LIKED</a>
                </li>
                 <li>
                    <a style="font-size:17px;" 
                    ng-style="{background:(infoMode=='followed'?'#20F81D':''), color:(infoMode=='followed'?'white':'' )}"
                    href="/UserProfileInfo/#/followed">
                    <span class="fa fa-users"></span> FOLLOWED</a>
                </li>
                 <li>
                    <a style="font-size:17px;" 
                    ng-style="{background:(infoMode=='attended'?'#20F81D':''), color:(infoMode=='attended'?'white':'' )}"
                    href="/UserProfileInfo/#/attended">
                    <span class="glyphicon glyphicon-education"></span> ATTENDED</a>
                </li>
                 <li>
                    <a style="font-size:17px;" 
                    ng-style="{background:(infoMode=='reviewed'?'#20F81D':''), color:(infoMode=='reviewed'?'white':'' )}"
                    href="/UserProfileInfo/#/reviewed">
                    <span class="glyphicon glyphicon-comment"></span> REVIEWED</a>
                </li> --%>
            </div>
        </div>
        <!-- sidebar end -->

        <!-- Page Content -->
       <div ng-view>
      
       </div>
    </div>
        <!-- /#page-content-wrapper -->
    </div>

 
