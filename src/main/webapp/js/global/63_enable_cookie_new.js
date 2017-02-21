(function() {
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
			if( navigator.cookieEnabled == false) {
				this._show();
				//localStorage.getItem( "cookie-toolkit-accepted" ) === null
			}
		},
		actions: function() {
			var accept = document.querySelector( "#cookie-toolkit-accept" ),
				deny = document.querySelector( "#cookie-toolkit-deny" ),
				self = this;

				accept.addEventListener( "click", function( e ) {
					e.preventDefault();
					//localStorage.setItem( "cookie-toolkit-accepted", "yes" );
					self._hide();
				}, false);

				deny.addEventListener( "click", function( e ) {
					e.preventDefault();
					//localStorage.setItem( "cookie-toolkit-accepted", "no" );
					self._hide();
				}, false);
		},
		create: function() {
			var element = document.createElement( "div" );
			this.element = element;
			var html = "<div style='font-family: Times New Roman, Times, serif; font-family: Courier;font-variant: small-caps;font-size:16px;' id='cookie-toolkit-wrap'><div id='cookie-toolkit-text'>" + this.text + "</div>";

			element.id = "cookie-toolkit";
			html += "<div id='cookie-toolkit-btns'><button style='font-family: Times New Roman, Times, serif; font-family: Courier;font-variant: small-caps;font-size:16px;' type='button' id='cookie-toolkit-accept'>" + this.acceptText + "</button>";
			html += "<button style='font-family: Times New Roman, Times, serif; font-family: Courier;font-variant: small-caps;font-size:16px;' type='button' id='cookie-toolkit-deny'>" + this.denyText + "</button></div>";
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

	document.addEventListener( "DOMContentLoaded", function() {
		var toolkit = new CookieToolkit( "Cookies are disabled in your browser, please enable cookie!", "Sure", "No Way" );
	});
})();