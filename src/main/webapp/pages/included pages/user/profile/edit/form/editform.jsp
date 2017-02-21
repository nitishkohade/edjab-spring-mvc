

<center>
	<div class="col-md-12">
		<div class="panel panel-default">
			<!-- <div style="background: #20F81D;" class="panel-heading">
						<center>
							<h3 style="color:white;" class="panel-title">Edit Profile</h3>
						</center>
					</div> -->
			<div ng-cloak class="panel-body">

				<form ng-submit="onUserEdit()" novalidate autocomplete="off">
					<div class="row">


						<div class="col-xs-4 col-md-4 col-lg-4 col-sm-4">
							<div
								ng-init="userProfile.firstName=showValue('${user_firstName}', 'first')"
								ng-class="{'has-error':fieldError}" class="form-group">
								<label class="control-label" for="firstName"> First Name</label>
								<input style="height: 44px;" type="firstName"
									class="form-control" id="edit_firstName" name="firstName"
									placeholder="First Name" required autocomplete="off"
									ng-maxLength="50" ng-pattern="/^[a-zA-Z ]*$/"
									ng-pattern-err-type="name_pattern_error"
									ng-maxLength-err-type="name_max_error"
									ng-model="userProfile.firstName" />
							</div>
						</div>
						<div class="col-xs-4 col-md-4 col-lg-4 col-sm-4">
							<div
								ng-init="userProfile.middleName=showValue('${user_middleName}', 'middle')"
								class="form-group">
								<label class="control-label" for="middleName"> Middle
									Name</label> <input style="height: 44px;" type="middleName"
									class="form-control" id="edit_middleName" name="middleName"
									autocomplete="off" placeholder="Middle Name" ng-maxLength="50"
									ng-pattern="/^[a-zA-Z ]*$/"
									ng-pattern-err-type="name_pattern_error"
									ng-maxLength-err-type="name_max_error"
									ng-model="userProfile.middleName" disable-valid-styling="true" />
							</div>
						</div>
						<div class="col-xs-4 col-md-4 col-lg-4 col-sm-4 pull-right">
							<div
								ng-init="userProfile.lastName=showValue('${user_lastName}', 'last')"
								class="form-group">
								<label class="control-label" for="lastName"> Last Name</label> <input
									style="height: 44px;" type="lastName" class="form-control"
									id="edit_lastName" name="lastName" autocomplete="off"
									placeholder="Last Name" ng-maxLength="50"
									ng-pattern="/^[a-zA-Z ]*$/"
									ng-pattern-err-type="name_pattern_error"
									ng-maxLength-err-type="name_max_error"
									ng-model="userProfile.lastName" disable-valid-styling="true" />
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-4">
							<div
								ng-init="userProfile.gender=showValue('${user_gender}', 'gender')"
								ng-class="{'has-error':fieldError}" class="form-group">
								<label class="control-label" for="Gender"> Gender </label>
								<div ng-class="{'has-error':fieldError}" data-toggle="buttons">
									<label style="border: 0;background: #efefef;"
										ng-click="userProfile.gender='MALE'"
										class="btn btn-default user_info_gender"> <input
										disable-valid-styling="true" ng-model="userProfile.gender"
										class="form-control" ng-required="!userProfile.gender"
										type="radio" autocomplete="off"> <span
										ng-style="{'background':(userProfile.gender=='MALE'?'#58F624':'')}"
										class="user_info_radio_dot"></span> <span
										class="user_info_gender_word">Male</span>
									</label> <label style="border: 0;background: #efefef;"
										ng-click="userProfile.gender='FEMALE'"
										class="btn btn-default user_info_gender"> <input
										disable-valid-styling="true" ng-model="userProfile.gender"
										class="form-control" ng-required="!userProfile.gender"
										type="radio" autocomplete="off"> <span
										ng-style="{'background':(userProfile.gender=='FEMALE'?'#58F624':'')}"
										class="user_info_radio_dot"></span> <span
										style="margin-left: 12px;" class="user_info_gender_word">Female</span>
									</label>
								</div>
							</div>
						</div>
						<div class="col-sm-6 col-md-6 col-lg-4">
							<div
								ng-init="userProfile.dateOfBirth=showValue('${user_dateOfBirth}', 'date')"
								class="form-group">

								<label class="control-label" for="dateOfBirth"> Date of
									Birth</label>

								<div class="col-xs-12 col-lg-12 pl-ziro">

									<input style="height: 44px;" class="form-control" type="date"
										 placeholder="dd-mm-yyyy" 
										 max="{{currentDate | date: 'yyyy-MM-dd'}}"
										   min="{{'1900-01-01' | date: 'yyyy-MM-dd'}}"
										id="edit_datepicker" disable-valid-styling="true"
										ng-maxLength-err-type="name_max_length"
										ng-model="userProfile.dateOfBirth">

								</div>
							</div>
						</div>
						<div ng-class="{'has-error':fieldError}" class="col-sm-6 col-md-6 col-lg-4">
							<div
								ng-init="userProfile.contactNumber=showValue('${user_contactNumber}', 'contact')"
								ng-class="{'has-error':fieldError}" class="form-group">
								<label class="control-label" for="contactNumber">
									Contact Number</label> <input style="height: 44px;" id="edit_contact"
									class="form-control" required autocomplete="off"
									placeholder="Contact Number" ng-maxLength="10" ng-minLength="10"
									ng-pattern="/^[0-9]*$/"
									ng-pattern-err-type="contact_pattern_error"
									ng-maxLength-err-type="contact_max_error"
									ng-minLength-err-type="contact_min_error"
									ng-model="userProfile.contactNumber">
							</div>
						</div>
					</div>




					<div class="row">
						<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
							<div
								ng-init="userProfile.street=showValue('${user_street}', 'street')"
								class="form-group">
								<label class="control-label" for="adddressLine1"> Street</label>
								<input style="height: 44px;" type="text" class="form-control"
									id="edit_addressLine1" name="addressLine1"
									placeholder="Street address, P.O. box, company name, c/o"
									autocomplete="off" ng-maxLength="100"
									disable-valid-styling="true"
									ng-maxLength-err-type="address_max_error"
									ng-model="userProfile.street" />
							</div>
						</div>
						
						<div ng-init="isFacebookUser('${isFacebookUser}')" ng-show="${isFacebookUser}==true" class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
							<div
								ng-init="userProfile.fb_emailId=showValue('${facebook_user_emailId}', 'fb_emailId')"
								class="form-group">
								<label class="control-label" for="FB_emailId"> EmailId</label>
								<input style="height: 44px;" type="email" class="form-control"
									id="edit_emailId" name="fb_emailId"
									placeholder="Email Id"
									 autocomplete="off" ng-maxLength="200"
									disable-valid-styling="true"
									ng-maxLength-err-type="email_max_length"
									ng-maxLength-err-type="fb_user_emailId_error"
									ng-model="userProfile.fb_emailId" />
									
							</div>
						</div>
						

					</div>



					<div class="row">
						<div class="col-md-3 col-sm-3 col-lg-3">
							<div ng-init="userProfile.city=showValue('${user_city}', 'city')"
								ng-class="{'has-error':fieldError}" class="form-group">
								<label class="control-label" for="city"> City</label> <input
									type="city" name="city" style="height: 44px;"
									class="form-control" id="edit_city" required autocomplete="off"
									ng-maxLength="50" placeholder="City"
									ng-pattern="/^[a-zA-Z ]*$/"
									ng-pattern-err-type="city_pattern_error"
									ng-maxLength-err-type="city_max_error"
									ng-model="userProfile.city" />
							</div>
						</div>
						<div class="col-md-3 col-sm-3 col-lg-3">
							<div
								ng-init="userProfile.indianState=showValue('${user_indianState}', 'state')"
								ng-class="{'has-error':fieldError}" class="form-group">
								<label class="control-label" for="state"> State</label> <input
									style="height: 44px;" id="edit_state" class="form-control"
									required autocomplete="off" ng-maxLength="50"
									placeholder="State" ng-pattern="/^[a-zA-Z ]*$/"
									ng-pattern-err-type="state_pattern_error"
									ng-maxLength-err-type="state_max_error"
									ng-model="userProfile.indianState" />
							</div>
						</div>
						<div class="col-md-3 col-sm-3 col-lg-3">
							<div
								ng-init="userProfile.country=showValue('${user_country}', 'country')"
								ng-class="{'has-error':fieldError}" class="form-group">

								<label class="control-label" for="country"> Country</label> <select
									required class="form-control" style="height: 44px;"
									ng-model="userProfile.country" id="edit_user_info_country">
									<option value="" disabled selected>Country</option>

									<option value="afganistan">Afghanistan</option>
									<option value="albania">Albania</option>
									<option value="algeria">Algeria</option>
									<option value="american samoa">American Samoa</option>
									<option value="andorra">Andorra</option>
									<option value="angola">Angola</option>
									<option value="anguilla">Anguilla</option>
									<option value="argentina">Argentina</option>
									<option value="armenia">Armenia</option>
									<option value="aruba">Aruba</option>
									<option value="australia">Australia</option>
									<option value="austria">Austria</option>
									<option value="azerbaijan">Azerbaijan</option>
									<option value="bahamas">Bahamas</option>
									<option value="bahrain">Bahrain</option>
									<option value="bangladesh">Bangladesh</option>
									<option value="barbados">Barbados</option>
									<option value="belarus">Belarus</option>
									<option value="belgium">Belgium</option>
									<option value="belize">Belize</option>
									<option value="benin">Benin</option>
									<option value="bermuda">Bermuda</option>
									<option value="bhutan">Bhutan</option>
									<option value="bolivia">Bolivia</option>
									<option value="bonaire">Bonaire</option>
									<option value="botswana">Botswana</option>
									<option value="brazil">Brazil</option>
									<option value="brunei">Brunei</option>
									<option value="Bulgaria">Bulgaria</option>
									<option value="burkina faso">Burkina Faso</option>
									<option value="burundi">Burundi</option>
									<option value="cambodia">Cambodia</option>
									<option value="cameroon">Cameroon</option>
									<option value="canada">Canada</option>
									<option value="canary islands">Canary Islands</option>
									<option value="cape verde">Cape Verde</option>
									<option value="cayman islands">Cayman Islands</option>
									<option value="chad">Chad</option>
									<option value="channel islands">Channel Islands</option>
									<option value="chile">Chile</option>
									<option value="china">China</option>
									<option value="christmas island">Christmas Island</option>
									<option value="cocos island">Cocos Island</option>
									<option value="colombia">Colombia</option>
									<option value="comoros">Comoros</option>
									<option value="congo">Congo</option>
									<option value="cook islands">Cook Islands</option>
									<option value="costa rica">Costa Rica</option>
									<option value="cote dIvoire">Cote D'Ivoire</option>
									<option value="croatia">Croatia</option>
									<option value="cuba">Cuba</option>
									<option value="curaco">Curacao</option>
									<option value="cyprus">Cyprus</option>
									<option value="czech republic">Czech Republic</option>
									<option value="denmark">Denmark</option>
									<option value="djibouti">Djibouti</option>
									<option value="dominica">Dominica</option>
									<option value="dominican republic">Dominican Republic</option>
									<option value="east timor">East Timor</option>
									<option value="ecuador">Ecuador</option>
									<option value="egypt">Egypt</option>
									<option value="el salvador">El Salvador</option>
									<option value="equatorial guinea">Equatorial Guinea</option>
									<option value="eritrea">Eritrea</option>
									<option value="estonia">Estonia</option>
									<option value="ethiopia">Ethiopia</option>
									<option value="falkland islands">Falkland Islands</option>
									<option value="faroe islands">Faroe Islands</option>
									<option value="fiji">Fiji</option>
									<option value="finland">Finland</option>
									<option value="france">France</option>
									<option value="french guiana">French Guiana</option>
									<option value="french polynesia">French Polynesia</option>
									<option value="gabon">Gabon</option>
									<option value="gambia">Gambia</option>
									<option value="georgia">Georgia</option>
									<option value="germany">Germany</option>
									<option value="ghana">Ghana</option>
									<option value="gibraltar">Gibraltar</option>
									<option value="great britain">Great Britain</option>
									<option value="greece">Greece</option>
									<option value="greenland">Greenland</option>
									<option value="grenada">Grenada</option>
									<option value="guadeloupe">Guadeloupe</option>
									<option value="guam">Guam</option>
									<option value="guatemala">Guatemala</option>
									<option value="guinea">Guinea</option>
									<option value="guyana">Guyana</option>
									<option value="haiti">Haiti</option>
									<option value="hawaii">Hawaii</option>
									<option value="honduras">Honduras</option>
									<option value="hong kong">Hong Kong</option>
									<option value="hungary">Hungary</option>
									<option value="iceland">Iceland</option>
									<option value="india">India</option>
									<option value="indonesia">Indonesia</option>
									<option value="iran">Iran</option>
									<option value="iraq">Iraq</option>
									<option value="ireland">Ireland</option>
									<option value="isle of man">Isle of Man</option>
									<option value="israel">Israel</option>
									<option value="italy">Italy</option>
									<option value="jamaica">Jamaica</option>
									<option value="japan">Japan</option>
									<option value="jordan">Jordan</option>
									<option value="kazakhstan">Kazakhstan</option>
									<option value="kenya">Kenya</option>
									<option value="kiribati">Kiribati</option>
									<option value="korea north">Korea North</option>
									<option value="korea sout">Korea South</option>
									<option value="kuwait">Kuwait</option>
									<option value="kyrgyzstan">Kyrgyzstan</option>
									<option value="laos">Laos</option>
									<option value="latvia">Latvia</option>
									<option value="lebanon">Lebanon</option>
									<option value="lesotho">Lesotho</option>
									<option value="liberia">Liberia</option>
									<option value="libya">Libya</option>
									<option value="liechtenstein">Liechtenstein</option>
									<option value="lithuania">Lithuania</option>
									<option value="luxembourg">Luxembourg</option>
									<option value="macau">Macau</option>
									<option value="macedonia">Macedonia</option>
									<option value="madagascar">Madagascar</option>
									<option value="malaysia">Malaysia</option>
									<option value="malawi">Malawi</option>
									<option value="maldives">Maldives</option>
									<option value="mali">Mali</option>
									<option value="malta">Malta</option>
									<option value="marshall islands">Marshall Islands</option>
									<option value="martinique">Martinique</option>
									<option value="mauritania">Mauritania</option>
									<option value="mauritius">Mauritius</option>
									<option value="mayotte">Mayotte</option>
									<option value="mexico">Mexico</option>
									<option value="midway islands">Midway Islands</option>
									<option value="moldova">Moldova</option>
									<option value="monaco">Monaco</option>
									<option value="mongolia">Mongolia</option>
									<option value="montserrat">Montserrat</option>
									<option value="morocco">Morocco</option>
									<option value="mozambique">Mozambique</option>
									<option value="myanmar">Myanmar</option>
									<option value="nambia">Nambia</option>
									<option value="nauru">Nauru</option>
									<option value="nepal">Nepal</option>
									<option value="netherlands">Netherlands</option>
									<option value="nevis">Nevis</option>
									<option value="new caledonia">New Caledonia</option>
									<option value="new zealand">New Zealand</option>
									<option value="nicaragua">Nicaragua</option>
									<option value="niger">Niger</option>
									<option value="nigeria">Nigeria</option>
									<option value="niue">Niue</option>
									<option value="norfolk island">Norfolk Island</option>
									<option value="norway">Norway</option>
									<option value="oman">Oman</option>
									<option value="pakistan">Pakistan</option>
									<option value="palau island">Palau Island</option>
									<option value="palestine">Palestine</option>
									<option value="panama">Panama</option>
									<option value="papua new guinea">Papua New Guinea</option>
									<option value="paraguay">Paraguay</option>
									<option value="peru">Peru</option>
									<option value="phillipines">Philippines</option>
									<option value="pitcairn island">Pitcairn Island</option>
									<option value="poland">Poland</option>
									<option value="portugal">Portugal</option>
									<option value="puerto rico">Puerto Rico</option>
									<option value="qatar">Qatar</option>
									<option value="reunion">Reunion</option>
									<option value="romania">Romania</option>
									<option value="russia">Russia</option>
									<option value="rwanda">Rwanda</option>
									<option value="saipan">Saipan</option>
									<option value="samoa">Samoa</option>
									<option value="samoa american">Samoa American</option>
									<option value="san marino">San Marino</option>
									<option value="saudi arabia">Saudi Arabia</option>
									<option value="senegal">Senegal</option>
									<option value="serbia">Serbia</option>
									<option value="seychelles">Seychelles</option>
									<option value="sierra leone">Sierra Leone</option>
									<option value="singapore">Singapore</option>
									<option value="slovakia">Slovakia</option>
									<option value="slovenia">Slovenia</option>
									<option value="solomon islands">Solomon Islands</option>
									<option value="somalia">Somalia</option>
									<option value="south africa">South Africa</option>
									<option value="spain">Spain</option>
									<option value="sri Lanka">Sri Lanka</option>
									<option value="sudan">Sudan</option>
									<option value="suriname">Suriname</option>
									<option value="swaziland">Swaziland</option>
									<option value="sweden">Sweden</option>
									<option value="switzerland">Switzerland</option>
									<option value="syria">Syria</option>
									<option value="tahiti">Tahiti</option>
									<option value="taiwan">Taiwan</option>
									<option value="tajikistan">Tajikistan</option>
									<option value="tanzania">Tanzania</option>
									<option value="thailand">Thailand</option>
									<option value="togo">Togo</option>
									<option value="tokelau">Tokelau</option>
									<option value="tonga">Tonga</option>
									<option value="tunisia">Tunisia</option>
									<option value="turkey">Turkey</option>
									<option value="turkmenistan">Turkmenistan</option>
									<option value="tuvalu">Tuvalu</option>
									<option value="uganda">Uganda</option>
									<option value="ukraine">Ukraine</option>
									<option value="uraguay">Uruguay</option>
									<option value="uzbekistan">Uzbekistan</option>
									<option value="vanuatu">Vanuatu</option>
									<option value="vatican city state">Vatican City State</option>
									<option value="venezuela">Venezuela</option>
									<option value="vietnam">Vietnam</option>
									<option value="virgin islands (brit)">Virgin Islands
										(Brit)</option>
									<option value="virgin islands (usa)">Virgin Islands
										(USA)</option>
									<option value="wake island">Wake Island</option>
									<option value="yemen">Yemen</option>
									<option value="zaire">Zaire</option>
									<option value="zambia">Zambia</option>
									<option value="zimbabwe">Zimbabwe</option>

								</select>
							</div>
						</div>
						<div class="col-md-3 col-sm-3 col-lg-3">
							<div ng-init="userProfile.zip=showValue('${user_zip}', 'zip')"
								ng-class="{'has-error':fieldError}" class="form-group">
								<label class="control-label" for="zip"> Zip Code</label> <input
									name="zip" id="edit_zip" class="form-control"
									style="height: 44px;" required autocomplete="off"
									ng-maxLength="10" placeholder="Zip Code"
									ng-pattern="/^[0-9]*$/" ng-pattern-err-type="zip_pattern_error"
									ng-maxLength-err-type="zip_max_error"
									ng-model="userProfile.zip" />
									
							</div>
						</div>

					</div>


					<br>
						<hr>
					<!-- <button id="user_info_edit_save"
							style="width:45%;height:70px;margin-top:0px;" 
							type="submit" 
							ladda="saving" 
							data-style="expand-right" 							 
							data-spinner-color="rgb(32, 248, 29)"
							class="col-md-6 btn  btn-lg btn-block" role="button">
							<span ng-show="!saving">Save</span>         <span ng-cloak 
				                    ng-show="saving">Saving</span>
							</button>
							
							<a ng-disabled="saving==true" id="user_info_edit_reset"
							style="width:45%;margin-top:0px;height:70px;cursor: pointer;" 							 
							class="col-md-6 btn  btn-lg btn-block pull-right" role="button" ng-click="userEditReset()">
							<span style="position:relative;top:12px;"> Reset </span></a> -->
					<div class="row">
					<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12"  style="margin-bottom: 12px;">
					
					<div ng-mousedown="mouseOnSave=true" ng-mouseup="mouseOnSave=false" 
					ng-click="save_user_profile()" 
					ng-style="{'box-shadow':((mouseOnSave == true)?'':'1px 2px 10px')}"
					style="cursor: pointer;background:white;padding: 15px;color:black;font-size: 20px;"
					class="col-md-5 col-lg-5 col-sm-5 col-xs-5">
						<div ladda="saving"
							data-style="expand-right" data-spinner-color="green"> 
							<span ng-show="!saving">Save</span> 
							<span ng-cloak ng-show="saving">Saving</span>
						</div>						
					</div>
					
					<div ng-mousedown="mouseOnReset=true" ng-mouseup="mouseOnReset=false" 
					ng-disabled="saving==true" ng-click="userEditReset()" 
					ng-style="{'box-shadow':((mouseOnReset == true)?'':'1px 2px 10px')}"
					style="cursor: pointer;background:white;padding: 15px;color:black;font-size: 20px;"
					class="col-md-5 col-md-offset-2 col-lg-5 col-lg-offset-2 col-sm-5 col-sm-offset-2 col-xs-5 col-xs-offset-2">	
						<div>Reset</div>
					</div>
					
					</div>
					</div>
					<button id="edit_user_profile_save" style="display: none;" type="submit"></button>

				</form>
			</div>
		</div>

	</div>
</center>
