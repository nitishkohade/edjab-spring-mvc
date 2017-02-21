$(document).ready(function(){
	 $('.test').click(function(){
	        $('.tooltip-inner', $('.test').next()).html( 'New_value!');
	         
	    });
	    
	    
	    
	    $('[data-toggle="tooltip"]').tooltip();
	    $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
	        $('.tooltip').addClass('animated rubberBand');
	    });
})