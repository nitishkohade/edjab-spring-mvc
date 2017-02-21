angular.module("ngEdjab.linkDashboard",[])

.controller("LinkDashboardController", ['$scope', '$timeout', '$document',
                                        function($scope, $timeout, $document){

	$timeout(function(){
		
		$(window).scroll(function sticky_relocate() {
		    var window_top = $(window).scrollTop() + 60;
		    var div_top = $('#sticky_dashboard_anchor').offset().top;
		    if (window_top > div_top) {
		        $('#sticky_dashboard').addClass('stick');
		    } else {
		        $('#sticky_dashboard').removeClass('stick');
		    }
		});
		
	},2)
	

}])



