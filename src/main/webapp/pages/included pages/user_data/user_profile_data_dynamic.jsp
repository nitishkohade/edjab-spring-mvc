 <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
						<div class="mainHead"><span id="menu-toggle">
						<i 
						style="cursor: pointer;
						font-size:22px;
						color:white;" 
						ng-click="menuToggle()" 
						class="fa fa-sliders">
						
						</i></span></div>
							<ol disable-all="refrainAttack" style="font-size:13px;" class="breadcrumb">                    
								<li><a style="color:#FE9F0D;" 
								    ng-style="{color:(infoMode=='profile'?'orange':'' ), 'font-size':(infoMode=='profile'? 18+'px':'')}"
								href="/UserProfileInfo/#/profile">Profile</a></li>
								<li><a style="color:#FE9F0D;" 
									ng-style="{color:(infoMode=='edit'?'orange':'' ), 'font-size':(infoMode=='edit'? 18+'px':'')}"
								href="/UserProfileInfo/#/edit">Edit</a></li>
								<li><a style="color:#FE9F0D;" 
									ng-style="{color:(infoMode=='setting'?'orange':'' ), 'font-size':(infoMode=='setting'? 18+'px':'')}"
								href="/UserProfileInfo/#/setting">Setting</a></li>
								<li><a style="color:#FE9F0D;" 
									ng-style="{color:(infoMode=='liked'?'orange':'' ), 'font-size':(infoMode=='liked'? 18+'px':'')}"
								href="/UserProfileInfo/#/liked">Liked</a></li>
								<li><a style="color:#FE9F0D;" 
									 ng-style="{color:(infoMode=='followed'?'orange':'' ), 'font-size':(infoMode=='followed'? 18+'px':'')}"
								href="/UserProfileInfo/#/followed">Followed</a></li>
								<li><a style="color:#FE9F0D;" 
									 ng-style="{color:(infoMode=='attended'?'orange':'' ), 'font-size':(infoMode=='attended'? 18+'px':'')}"
								href="/UserProfileInfo/#/attended">Attended</a></li>
								<li><a style="color:#FE9F0D;" 
									ng-style="{color:(infoMode=='reviewed'?'orange':'' ), 'font-size':(infoMode=='reviewed'? 18+'px':'')}"
								href="/UserProfileInfo/#/reviewed">Reviewed</a></li>
							</ol> 
                    </div>
                </div>
				<!--table structure start-->
				<div class="tbleBase">
					<div class="panel">
						<div class="panel-heading">
							<h2 style="color:white;font-family: Times New Roman, Times, serif; font-family: Courier;font-variant: small-caps;font-size:18px;">
							<span ng-bind="infoModeName"></span>
							</h2>
						</div>
					</div>
					
					<div ng-cloak ng-show="infoMode=='profile'">
										 
						<%@include file="../user/profile/userprofile.jsp" %>
										
					</div>
					
					<div ng-cloak ng-show="infoMode=='edit'">
					
					
						<%@include file="../user/profile/edit/form/editform.jsp" %>
					
					
					</div>
					
					<div ng-cloak ng-show="infoMode=='setting'">
					
					
					<%@include file="../user/settings/settings.jsp" %>
				
					
					</div>
							
					<div  ng-cloak ng-show="infoMode=='liked'">
					
					
					<%@include file="../user/like/userlike.jsp" %>
				
					
					</div>
					
					<div  ng-cloak ng-show="infoMode=='followed'">
					
					
					<%@include file="../user/follow/userfollow.jsp" %>
				
					
					</div>
					
					<div  ng-cloak ng-show="infoMode=='attended'">
					
					
					<%@include file="../user/attend/userattend.jsp" %>
				
					
					</div>
					
					<div  ng-cloak ng-show="infoMode=='reviewed'">
					
					
					<%@include file="../user/review/userreview.jsp" %>
				
					
					</div>
					
				</div>
			</div>
			
			<br>
			
		
        
        <font 
size="4">
	<div 
	style="background: black;width: 100%;font-family: Times New Roman, Times, serif; font-family: Courier;font-variant: small-caps;" 
	class="footer navbar-inverse">
		<div style="width: 100%;"
		class="container text-center">
			<div 
			class="row">
				<div 
				class="col-lg-12">
					<ul 
					class="nav nav-pills nav-justified">
						<li>
							<a 
							data-toggle="modal"
							data-target="#footer_about_modal"
							id="footer_about_u" 
							href="">
							<b 
							style="color:#FD7F10;">
							About
							</b>
							</a>
						</li>
						<li>
							<a 
							href="/ContactMe"
							id="footer_contact_u"  
							href="">
							<b 
							style="color:#FD7F10;">
							Contact
							</b>
							</a>
						</li>
						<li>
							<a 
							data-toggle="modal"
							data-target="#footer_terms_modal"
							id="footer_terms_u"  
							href="">
							<b 
							style="color:#FD7F10;">
							Terms of Service
							</b>
							</a>
						</li>
					</ul>
					<div					 
					class="row">
						<a style="color:#FD7F10;"><i> | </i></a> 
						<a style="color:#FD7F10;"><i class="fa fa-facebook"> | </i></a> 
						<a style="color:#FD7F10;"><i class="fa fa-google-plus"> | </i></a> 
						<a style="color:#FD7F10;"><i class="fa fa-linkedin"> | </i></a> 
						<a style="color:#FD7F10;"><i class="fa fa-twitter"> | </i></a>
					</div>
					<hr style="border-top: 1px solid #FD7F10;">
					<a 
					id="footer_copyright" 
					href="">
						<b 
						style="color:#FD7F10;text-decoration: none;">
						copyright @2015 edJab. All Right Reserved
						</b>
					</a>
								<br><br><br>
					
				</div>
			</div>
		</div>
	</div>
</font>

<font size="4">
<div
style="font-family: Times New Roman, Times, serif; font-family: Courier;font-variant: small-caps;">
<div class="row">
				<div 
				class='col-md-2'>
				</div>
				<div 
				class='col-md-8'>
					<div 
					class="modal fade" 
					id="footer_about_modal"
					tabindex="-1" 
					role="dialog" 
					aria-labelledby="myModalLabel"
					aria-hidden="true">
						<center>
							<div 
							class="modal-dialog">
								<div 
								class="modal-content">
									<div 
									class="modal-header">
										<button 
										type="button" 
										class="close" 
										data-dismiss="modal">
											<span 
											aria-hidden="true">
											×
											</span>
											<span 
											class="sr-only">
											Close
											</span>
										</button>

									</div>
									<div 
									class="modal-body">

										Please write something about edjab


									</div>
									<div 
									class="modal-footer">
										<button 
										type="button" 
										class="btn btn-default"
										data-dismiss="modal">
										Close
										</button>
									</div>
								</div>
							</div>
						</center>
					</div>
				</div>
</div>




<div class="row">
				<div 
				class='col-md-2'>
				</div>
				<div 
				class='col-md-8'>
					<div 
					class="modal fade" 
					id="footer_terms_modal"
					tabindex="-1" 
					role="dialog" 
					aria-labelledby="myModalLabel"
					aria-hidden="true">
						<center>
							<div 
							class="modal-dialog">
								<div 
								class="modal-content">
									<div 
									class="modal-header">
										<button 
										type="button" 
										class="close" 
										data-dismiss="modal">
											<span 
											aria-hidden="true">
											×
											</span>
											<span 
											class="sr-only">
											Close
											</span>
										</button>

									</div>
									<div 
									class="modal-body">

										Please write something for terms .....


									</div>
									<div 
									class="modal-footer">
										<button 
										type="button" 
										class="btn btn-default"
										data-dismiss="modal">
										Close
										</button>
									</div>
								</div>
							</div>
						</center>
					</div>
				</div>
</div>



</div>
</font>


	<!--table structure end-->
        </div>
        
        
      