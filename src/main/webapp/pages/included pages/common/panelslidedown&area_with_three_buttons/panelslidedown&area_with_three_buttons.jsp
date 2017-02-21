<div class="container" style="position: relative; margin-top: 100px;">
	<div align="center">
		<div style="margin: 10px; width: 65%;"
			class="btn-group btn-group-justified">

			<div ng-click="specificLocationClicked()" data-toggle="tooltip"
				data-placement="top" title="Search Schools Specific To Location"
				style="width: 100%;border: 1px solid #d2d2d2;cursor:pointer;padding:2px;" 
				ng-style="{'box-shadow':((searchByLocationExpanded==true)?'0px 3px 3px #888888':'0px 6px 7px #888888')}"
				class="btn-group">
				<div style="color: black;"> 
					<font size="3"> 
						<img src="/img/specific_location1.png" alt="Smiley face" height="60" width="60">
					</font>
					<div>
					Specific Location
					</div>
				</div>
			</div>

			<div ng-click="nearbyLocationClicked()" data-toggle="tooltip"
				data-placement="top" title="Search Schools Nearby Your Location"
				style="width: 100%;border: 1px solid #d2d2d2;cursor:pointer;padding:2px;"
				ng-style="{'box-shadow':((searchByNearbyExpanded==true)?'0px 3px 3px #888888':'0px 6px 7px #888888')}"
				class="btn-group">
				<div style="color: black;"> 
					<font size="3">
						<img src="/img/nearby1.png" alt="Smiley face" height="60" width="60">
					</font>
					<div>
					Nearby Schools
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


<div style="width: 100%; height: 100%;" class="container">
	<div style="height: 400px; background: white;">
		<div ng-slide-down="searchByLocationExpanded" lazy-render duration="1">
			<div ng-controller="CategoryAutocompleteController">
				<div style="margin-top: -23px; height: 400px;">
					<div style="padding: 20px; margin: 5px;" class="row-fluid">
						<div align="center">
							<div
								class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 
								col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1"
								style="padding: 0px; background: #eeeeee; color: black; font-size: inherit;">
								<h3 ng-cloak class="panel-title">
									<h3 ng-cloak
										style="color: black; font-variant: small-caps; font-family: Times New Roman;"
										ng-show="selectedCategory==undefined && getLocationIdToDisplay()==undefined">
										<b style="font: inherit; text-transform: lowercase;"> I am
											looking for schools under category {{selectedCategory}} and
											location {{getLocationIdToDisplay()}}</b>
									</h3>
									<h3 ng-cloak
										style="color: black; font-variant: small-caps; font-family: Times New Roman;"
										ng-show="selectedCategory!=undefined && getLocationIdToDisplay()==undefined">
										<b style="font: inherit; text-transform: lowercase;"> I am
											looking for schools under category {{selectedCategory}}</b>
									</h3>
									<h3 ng-cloak
										style="color: black; font-variant: small-caps; font-family: Times New Roman;"
										ng-show="selectedCategory==undefined && getLocationIdToDisplay()!=undefined">
										<b style="font: inherit; text-transform: lowercase;"> I am
											looking for schools under location
											{{getLocationIdToDisplay()}}</b>
									</h3>
									<h3 ng-cloak
										style="color: black; font-variant: small-caps; font-family: Times New Roman;"
										ng-show="selectedCategory!=undefined && getLocationIdToDisplay()!=undefined">
										<b style="font: inherit; text-transform: lowercase;"> I am
											Looking for schools under category {{selectedCategory}} &
											location {{getLocationIdToDisplay()}}</b>
									</h3>
								</h3>
							</div>
							<div
								class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 
							col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1"
								style="padding: 20px; background: #eeeeee; color: black; margin-top: 50px; font-size: inherit;">
								<span class="col-lg-8  col-md-8 col-sm-4"> <span
									class="pull-left"
									style="font: inherit; margin-top: 7px; background: #ffffff; color: black;">
										SEARCH BY LOCATION: </span>
								</span> <span class="col-lg-1  col-md-1 col-sm-1"> </span> <span>
									<autocomplete class="col-lg-3  col-md-3 col-sm-7"
										style="border: 0;" ng-keydown="typedKey()"
										disabled="location_specific_clicked" ng-model="result"
										click-activation=""
										attr-placeholder="type to search city, state or pin"
										data="locations" on-type="typedData" on-select="selectedData"
										category="selectedCategory"> </autocomplete>
								</span>
							</div>
							<div
								class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2
							col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1"
								style="padding: 20px; background: #eeeeee; color: black; margin-top: 50px; font-size: inherit;">
								<span class="col-lg-8  col-md-8 col-sm-4"> <span
									style="font: inherit; background: #ffffff; color: black;"
									class="pull-left">SELECT A CATEGORY: </span>
								</span> <span class="col-lg-1  col-md-1 col-sm-1"> </span> <select
									ng-disabled="category_specific_clicked"
									class="col-lg-3  col-md-3 col-sm-7"
									style="border: 0; height: 25px;"
									ng-options="d for d in locationDropdownList" ng-model="d"
									ng-click="specificLocationDropdown(d)">
									<option style="visibility: hidden;" value="">Select a
										Category</option>
								</select>
							</div>
						</div>
					</div>
					<div
						class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 
							col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1"
						style="padding: 0px; background: white; margin-top: 30px; font-size: inherit;">
						<div style="color: blue; border: 0;"
							ng-click="specificLocationRenderOnMap()" class="form-group">
							<a class="btn btn-block"
								style="border: 0; cursor: pointer; color: black;"> Render on
								Map </a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div ng-slide-down="searchByNearbyExpanded" lazy-render duration="1">
			<div ng-controller="NearbySchoolsController">
				<div style="margin-top: -23px; height: 400px;">
					<div style="padding: 20px; margin: 5px;" class="row-fluid">
						<div align="center">
							<div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 
							col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1"
								style="padding: 0px; background: #eeeeee; color: black; font-size: inherit;">
								<div style="padding: 0px;" ng-cloak class="panel-heading">
									<h3 ng-cloak class="panel-title">
										<h3 ng-cloak
											style="color: black; font-variant: small-caps; font-family: Times New Roman;"
											ng-show="getNearbyCategoryToDisplay()==undefined && range==undefined">
											<b style="font: inherit; text-transform: lowercase;"> I
												am looking for schools under category and range</b>
										</h3>
										<h3 ng-cloak
											style="color: black; font-variant: small-caps; font-family: Times New Roman;"
											ng-show="getNearbyCategoryToDisplay()!=undefined && range!=undefined">
											<b style="font: inherit; text-transform: lowercase;"> I
												am looking for schools under category
												{{getNearbyCategoryToDisplay()}} within {{range||0}} km
												range</b>
										</h3>
										<h3 ng-cloak
											style="color: black; font-variant: small-caps; font-family: Times New Roman;"
											ng-show="getNearbyCategoryToDisplay()!=undefined && range==undefined">
											<b style="font: inherit; text-transform: lowercase;"> I
												am looking for schools under category
												{{getNearbyCategoryToDisplay()}}</b>
										</h3>
										<h3 ng-cloak
											style="color: black; font-variant: small-caps; font-family: Times New Roman;"
											ng-show="getNearbyCategoryToDisplay()==undefined && range!=undefined">
											<b style="font: inherit; text-transform: lowercase;"> I
												am looking for schools within {{range||0}} km range</b>
										</h3>
									</h3>
								</div>
							</div>
							
							<form>
							<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 
							col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1"
								style="padding: 5px; background: #eeeeee; color: black; margin-top: 30px; font-size: inherit;">
								<span class="col-lg-8  col-md-8 col-sm-4"> <span
									style="background: white; margin-top: 15px;" class="pull-left">SELECT
										A RANGE: </span>
								</span> <span class="col-lg-1  col-md-1 col-sm-1"> </span>
								<div disable-all="category_specific_clicked"
									class="form-group col-lg-3  col-md-3 col-sm-7">
									<input id="nearby_range" class="form-control"
										style="margin-top: 11px; height: 35px; color: black; font-size: 15px; border: 0;"
										type="number" name="range" min="100" max="2000" step="100"
										ng-pattern="/^[1-9]{1,9}[0][0][0]?$/" ng-model="range"
										ng-max-err-type="max_number_error"
										ng-min-err-type="min_number_error"
										ng-pattern-err-type="step_number_error"
										placeholder="Search within range" disable-valid-styling="true"
										autocomplete="off">
								</div>								
							</div>
							</form>
							<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 
							col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1"
								style="padding: 20px; background: #eeeeee; color: black; margin-top: 25px; font-size: inherit;">
								<span class="col-lg-8  col-md-8 col-sm-4"> <span
									style="font: inherit; background: #ffffff; color: black;"
									class="pull-left">SELECT A CATEGORY: </span>
								</span> <span class="col-lg-1  col-md-1 col-sm-1"> </span> <select
									ng-disabled="category_specific_clicked"
									class="col-lg-3 col-md-3 col-sm-7"
									style="border: 0; height: 25px;"
									ng-options="d1 for d1 in nearbyDropdownList" ng-model="d1"
									ng-click="nearbyDropdown(d1)">
									<option style="visibility: hidden;" value="">Select a
										Category</option>
								</select>
							</div>
							<div ng-show="popupPromptMessage!=false"
								class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 
							col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1"
								style="padding: 0px; background: white; margin-top: 30px; font-size: inherit;">
								<div disable-all="category_specific_clicked"
									style="color: blue; border: 0;" data-toggle="confirmation"
									id="geolocationconfirmed" class="form-group">
									<a class="btn btn-block"
										style="border: 0; cursor: pointer; color: black;"> Render
										on Map </a>
								</div>
							</div>
							<div ng-show="popupPromptMessage==false"
								class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 
							col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1"
								style="padding: 0px; background: white; margin-top: 30px; font-size: inherit;">
								<div disable-all="category_specific_clicked"
									style="color: blue; border: 0;"
									ng-click="geolocationconfirmed()" class="form-group">
									<a class="btn btn-block"
										style="border: 0; cursor: pointer; color: black;"> Render
										on Map </a>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			ng-style="{'display':((searchByLocationExpanded==true || searchByNearbyExpanded==true)?'none':'block')}">
			<div class="out-to-be-hidden">
				<div class="container">
					<div class="row">
						<div class='col-md-3'></div>
						<div class='col-md-6'>
							<br> <br>
							<h2 style="font-family: Times New Roman, Times, serif;"
								class="out-heading">
								<font size="6"><b>FIND <span id="span-what"
										style="color: green">WHAT </span> <br>YOU ARE LOOKING FOR
								</b></font>
							</h2>
							<br> <br> <br>
						</div>
					</div>
				</div>
				<br>
				<br>
				   		
					<div class="container" style="position: relative; margin-top:90px;">
						<div align="center">
							<div style="margin:0px; width:80%;margin-top: -120px;"
								class="btn-group btn-group-justified">
								<div ng-click="specificLocationClicked()" 
								style="width: 100%;cursor:pointer;padding:30px;background: white;" 
									class="btn-group">
									<div> 
										<div>
										Specific Location
										</div>
									</div>
								</div>
								<div ng-click="specificLocationClicked()" 
									style="width:10%;visibility: hidden;cursor:pointer;padding:30px;background: white;" 
									class="btn-group">
								</div>
								<div ng-click="nearbyLocationClicked()" 
								style="width: 100%;cursor:pointer;padding:30px;background: white;"
									class="btn-group">
									<div> 
										<div>
										Nearby Schools
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				<br>
				<br>
				<br>
			</div>
		</div>
	</div>
</div>