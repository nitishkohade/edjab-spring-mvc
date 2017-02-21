angular.module('ngEdjab.activationvalidated',[])

.factory('popupMessage', ['$rootScope', 'GetContextPath',
                           function($rootScope, GetContextPath){
	
	
				
			
			var CookieToolkit = function( text, acceptText, denyText ) {
				this.text = text;
				this.acceptText = acceptText;
				this.denyText = denyText;
				this.element = null;
				this.init();
			};

			CookieToolkit.prototype = {
				init: function() {
					this.create();
					this.load();
					this.actions();
				},
				load: function() {
					
						this._show();
										
				},
				actions: function() {										
						var self = this;
						document.querySelector( "#closeRegistrationPopup" )
						.addEventListener( "click", function( e ) {
							e.preventDefault();
							
							self._hide();
						}, false);

						
				},
				create: function() {
					var element = document.createElement( "div" );
					this.element = element;
					var html = "<div style='font-family: Times New Roman, Times, serif; font-family: Courier;font-variant:cursive;font-size:19px;' id='cookie-toolkit-wrap'><div id='cookie-toolkit-text'>" + this.text + "<br></div>";

					element.id = "cookie-toolkit";
					html += "<div><button style='display:none;' type='button' id='closeRegistrationPopup'></button>";
					
					html += "<div id='cookie-toolkit-btns'><img src="+GetContextPath.getContextPath()+"/img/registration/registrationValidationProgress.gif width='132' height='32'>";
					html += "</div>";
					html += "</div>";

					element.innerHTML = html;

					document.body.appendChild( element );

				},
				_show: function() {
					var self = this;
					self.element.style.display = "block";
					setTimeout(function() {
						self.element.className = "visible";
					}, 500);
				},
				_hide: function() {
					var self = this;
					self.element.className = "";
					setTimeout(function() {
						self.element.style.display = "none";
					}, 500);
				}
			};

			function popup(){
						var toolkit = new CookieToolkit( "Please wait while your account is being activated!", "", "" );
			}
	
	return {
		popupShow:popup
	}
	}])



.controller('ActivationValidated',['$scope', '$http', '$timeout', 'toaster', 'popupMessage', "ngProgressFactory", "GetContextPath",  
                                     function($scope, $http, $timeout, toaster, popupMessage, ngProgressFactory, GetContextPath){
	
	var progress = ngProgressFactory.createInstance();
	
	progress.setColor('orange');
	progress.start();
	
	var popupNum = 0;
	
	$scope.pop = function(){
		
		popupNum++
			if(popupNum==1){
				popupMessage.popupShow();
			}
				
	}
	
		
	
			
	
	$scope.emailId 	= null;	
	$scope.token 	= null;
	
	$scope.activationResult = undefined;
	
	
	
			$scope.$watch('token', function(newValue, oldValue){
				
				
				if($scope.emailId!=null && $scope.token!=null){
					
					var input = {
								'userId':$scope.emailId.toLowerCase(), 
								'registrationToken':$scope.token
								}
					
					$http.post(GetContextPath.getContextPath()+"/ActivationValidated", input).success(function(result){
					
					
					if(result=="200"){
						
						$("#closeRegistrationPopup").click();
						progress.complete();
						$timeout(function(){
						
						$scope.activationResult = "200";
			    		toaster.pop('success', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Your account is activated successfully</li></ul>', 5000, 'trustedHtml');
						}, 1000)
   		
			    	}
			    	
			    	if(result=="400"){
			    		
			    		$("#closeRegistrationPopup").click();
			    		progress.complete();
			    		$timeout(function(){
			    			$scope.activationResult = "400";    	
				        	toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Email ID and token doesn\'t match, please request for another token... </li></ul>', 5000, 'trustedHtml');
		    			
			    		}, 1000)
			    		
			    	}
			    	if(result=="500"){
			    		    	
			    		$("#closeRegistrationPopup").click();
			    		progress.reset();
			    		$timeout(function(){
			    		$scope.activationResult = "500";
			        	toaster.pop('error', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Server error, please reset again, sorry for this inconvenience</li></ul>', 5000, 'trustedHtml');
			    		}, 1000)
			    	}
					
				})
				.error(function(result){
					
					$("#closeRegistrationPopup").click();
					progress.reset();
					$timeout(function(){
					$scope.activationResult = "error"
					toaster.pop('warning', "", '<ul class=\'list-inline\'><li style="font-variant: cursive; font-family: Courier, Times New Roman, Times, serif;">Bad request, please validate again!</li></ul>', 5000, 'trustedHtml');
					}, 1000)			
				})
				}
				
			})
			
}])

