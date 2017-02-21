
          <div style="font-family: Courier, Times New Roman, serif;font-variant: small-caps;font-size:18px;" class="panel panel-info">
            <!-- <div style="text-align:center;background: #20F81D;" class="panel-heading">
              <h3 
              class="panel-title" 
              style="font-family: Courier;font-variant: small-caps;font-size:19px;">
              Nitish Kohade
              </h3>
            </div> -->
            <div class="panel-body">
              <div class="row">
                <div 
	                class="col-md-3 col-lg-3 " 
	                align="center"> 
		               
		               	<img ng-cloak ng-show="'${user_gender}'!='MALE' && '${user_gender}'!='FEMALE' && userEditArray != true"
		                alt="User Pic" 
		                src="/img/user_profile/male_profile_pic.png" 
		                class="img-circle img-responsive">
		               
		               <img ng-cloak ng-show="user_gender !='MALE' && user_gender !='FEMALE' && userEditArray == true"
		                alt="User Pic" 
		                src="/img/user_profile/male_profile_pic.png" 
		                class="img-circle img-responsive">
		               
		                <img ng-cloak ng-show="'${user_gender}'=='MALE' && userEditArray != true"
		                alt="User Pic" 
		                src="/img/user_profile/male_profile_pic.png" 
		                class="img-circle img-responsive">
		                
		                <img ng-cloak ng-show="user_gender =='MALE' && userEditArray == true"
		                alt="User Pic" 
		                src="/img/user_profile/male_profile_pic.png" 
		                class="img-circle img-responsive">
		                
		                <img ng-cloak ng-show="'${user_gender}'=='FEMALE' && userEditArray != true"
		                alt="User Pic" 
		                src="/img/user_profile/female_profile_pic.png" 
		                class="img-circle img-responsive">
		                
		                <img ng-cloak ng-show="user_gender =='FEMALE' && userEditArray == true"
		                alt="User Pic" 
		                src="/img/user_profile/female_profile_pic.png" 
		                class="img-circle img-responsive">
                </div>
                               
                <div class=" col-md-9 col-lg-9 "> 
                  <table class="table table-user-information">
                    <tbody>
                      <tr>
                        <td>First Name:</td>
                        <td><span ng-show="userEditArray != true">${user_firstName}</span>
                        <span ng-cloak  ng-show="userEditArray == true">{{user_firstName}}</span></td>
                      </tr>
                      <tr>
                        <td>Last Name:</td>
                        <td><span ng-show="userEditArray != true">${user_lastName}</span>
                        <span ng-cloak  ng-show="userEditArray == true">{{user_lastName}}</span></td>
                      </tr>
                     
                      <tr ng-show="${isFacebookUser}==true">
                      <td>Email Id:</td>
                      <td><span ng-show="userEditArray != true">${facebook_user_emailId}</span>
                        <span ng-cloak  ng-show="userEditArray == true">{{facebook_user_emailId}}</span></td>                   
                        
                      </tr>
                      <tr ng-show="${isFacebookUser}!=true">
                        <td>Email Id:</td>
                        <td>${user_emailId}</td>
                      </tr>
                      <tr>
                        <td>Date of Birth:</td>
                        <td><span ng-show="userEditArray != true">${user_dateOfBirth}</span>
                        <span ng-cloak  ng-show="userEditArray == true">{{user_dateOfBirth}}</span></td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td><span ng-show="userEditArray != true">${user_gender}</span>
                        <span ng-cloak  ng-show="userEditArray == true">{{user_gender}}</span></td>
                      </tr>
                   
                       
                            
                      <tr>
                        <td>Home Address</td>
                        <td><span ng-show="userEditArray != true">${user_street} ${user_city} ${user_indianState} ${user_country} ${user_zip}</span>
                        <span ng-cloak  ng-show="userEditArray == true">{{user_street}} {{user_city}} {{user_indianState}} {{user_country}} {{user_zip}}</span>
                        </td>
                      </tr>
                      
                      <tr>
                       <td>Contact Number</td>
                       <td><span  ng-show="userEditArray != true">${user_contactNumber}</span>
                       <span ng-cloak  ng-show="userEditArray == true">{{user_contactNumber}}</span></td>
                           
                      </tr> 
                     
                    </tbody>
                  </table>
                  
                  
                  
                </div>
              </div>
            </div>
                 <div style="background: white;" class="panel-footer">
                      
                        <span class="pull-right">
                            <a style="border: 0;margin-top:-6px;"
                            id="edit_profile_button"
                            href="/UserProfileInfo/#/edit"
                            data-original-title="Edit this user" 
                            data-toggle="tooltip" 
                            type="button" 
                            class="btn btn-sm btn-warning"><i style="font-size:20px;" class="glyphicon glyphicon-edit"></i></a>
                        </span>
                        <br/>
                    </div>
            
          </div>
        