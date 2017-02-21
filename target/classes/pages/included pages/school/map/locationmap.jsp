<br>
<div
	ng-init="initMap('${latitude}', '${longitude}', '${instituteName}')"
	class="container">
	<div class="row locationdashboard-container square">
		<div align="center">
			<h2>
				<span>Location Map</span>
			</h2>
		</div>

		<div class="row">
			<div class="col-md-12  col-lg-12  col-sm-12  col-xs-12 ">


				<div
					class="col-md-3 col-md-offset-1 col-lg-3 col-lg-offset-1 col-sm-3 col-sm-offset-1 col-xs-4">

					<button						
						id="places" class="dropdown-toggle btn fa fa-map-signs fa-lg"
						data-toggle="dropdown">
						Nearby <strong class="caret"></strong>
					</button>

					<ul style="cursor: pointer;" aria-labelledby="places"
						class="dropdown-menu">
						<li
							ng-click="NearbySchool('${latitude}', '${longitude}', 'restaurant')">
							<a> <i class="fa fa-cutlery"></i> Restaurant
						</a>
						</li>
						<li
							ng-click="NearbySchool('${latitude}', '${longitude}', 'hospital')">
							<a> <i class="fa fa-hospital-o"></i> Hospital
						</a>
						</li>

						<li
							ng-click="NearbySchool('${latitude}', '${longitude}', 'pharmacy')">
							<a> <i class="fa fa-medkit"></i> Pharmacy
						</a>
						</li>
						<li
							ng-click="NearbySchool('${latitude}', '${longitude}', 'university')">
							<a> <i class="fa fa-university"></i> University
						</a>
						</li>
						<li
							ng-click="NearbySchool('${latitude}', '${longitude}', 'shopping_mall')">
							<a> <i class="fa fa-shopping-basket"></i> Mall
						</a>
						</li>

						<li
							ng-click="NearbySchool('${latitude}', '${longitude}', 'night_club')">
							<a> <i class="fa fa-moon-o"></i> Night Club
						</a>
						</li>
						<li
							ng-click="NearbySchool('${latitude}', '${longitude}', 'movie_theater')">
							<a> <i class="fa fa-video-camera"></i> Movie Theater
						</a>
						</li>

						<li
							ng-click="NearbySchool('${latitude}', '${longitude}', 'laundry')">
							<a> <i class="fa fa-film"></i> Laundry
						</a>
						</li>
						<li
							ng-click="NearbySchool('${latitude}', '${longitude}', 'train_station')">
							<a> <i class="fa fa-train"></i> Train Station
						</a>
						</li>
						<li
							ng-click="NearbySchool('${latitude}', '${longitude}', 'airport')">
							<a> <i class="fa fa-plane"></i> Airport
						</a>
						</li>
						<li
							ng-click="NearbySchool('${latitude}', '${longitude}', 'library')">
							<a> <i class="fa fa-book"></i> Library
						</a>
						</li>
						<li
							ng-click="NearbySchool('${latitude}', '${longitude}', 'lodging')">
							<a> <i class="fa fa-bed"></i> Hotel
						</a>
						</li>

						<li ng-click="NearbySchool('${latitude}', '${longitude}', 'bank')">
							<a> <i class="fa fa-inr"></i> Bank
						</a>
						</li>
						<li
							ng-click="NearbySchool('${latitude}', '${longitude}', 'bakery')">
							<a> <i class="fa fa-birthday-cake"></i> Bakery
						</a>
						</li>
						<li ng-click="NearbySchool('${latitude}', '${longitude}', 'bar')">
							<a> <i class="fa fa-glass"></i> Bar
						</a>
						</li>
						<li
							ng-click="NearbySchool('${latitude}', '${longitude}', 'store')">
							<a> <i class="fa fa-cart-arrow-down"></i> Store
						</a>
						</li>
						<li ng-click="NearbySchool('${latitude}', '${longitude}', 'gym')">
							<a> <i class="fa fa-futbol-o"></i> Gym
						</a>
						</li>
						<li ng-click="NearbySchool('${latitude}', '${longitude}', 'zoo')">
							<a> <i class="fa fa-twitter"></i> Zoo
						</a>
						</li>

					</ul>
				</div>


				<div
					class="col-md-3 col-md-offset-1 col-lg-3 col-lg-offset-1 col-sm-3 col-sm-offset-1 col-xs-4">
					<button						
						id="radius" class="dropdown-toggle btn fa fa-street-view fa-lg"
						data-toggle="dropdown">
						Radius <strong class="caret"></strong>
					</button>

					<ul style="cursor: pointer;" aria-labelledby="radius"
						class="dropdown-menu">
						<li ng-click="radius(1000)"><a><i
								class="fa fa-map-pin fa-lg">&nbsp;&nbsp;</i> 1Km</a></li>
						<li ng-click="radius(5000)"><a><i
								class="fa fa-map-pin fa-lg">&nbsp;&nbsp;</i> 5Km</a></li>
						<li ng-click="radius(10000)"><a><i
								class="fa fa-map-pin fa-lg">&nbsp;&nbsp;</i> 10Km</a></li>
						<li ng-click="radius(50000)"><a><i
								class="fa fa-map-pin fa-lg">&nbsp;&nbsp;</i> 50Km</a></li>
						<li ng-click="radius(100000)"><a><i
								class="fa fa-map-pin fa-lg">&nbsp;&nbsp;</i> 100Km</a></li>
					</ul>
				</div>

				<div
					class="col-md-3 col-md-offset-1 col-lg-3 col-lg-offset-1 col-sm-3 col-sm-offset-1 col-xs-4">
					<button id="direction"						
						ng-click="getSchoolDirection('${latitude}', '${longitude}')"
						class="btn fa fa-map-marker fa-lg"> Direction
					</button>
				</div>

			</div>
		</div>
		<br>


		<div class="container" id="container_school_map">
			<div class="col-md-12 col-xs-12 col-lg-12 col-sm-12">

				<p ng-cloak class="bg-success text-center" id="header_school_map"
					ng-show="nearbycontent!=null">
					<b>{{nearbycontent}} Within {{radiuscontent}}km Vicinity</b>
				</p>


				<div style="width: 100%; height: 450px;" id="school_map"
					class="user-menu user-pad">
					<div class="row-fluid"></div>
				</div>
			</div>
		</div>
	</div>
</div>
