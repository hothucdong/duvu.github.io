var $ = require('jquery');
require('jquery-waypoints');
//var Modernizr = require('modernizr');

(function () {

	var onepage = function () {
		var pages = $('.main .section');
		$.each(pages, function (idx) {
			var page = $(this);
			page.css({
				top: idx*100 + '%'
			});
			console.log(page[0]);

		});
		pages.waypoint(function (direction) {
			console.log(direction);
		});
	};

	var paralaxScroll = function (e) {

	};

	var ready = function () {
		var main = $('.main');
		//onepage();
		main.scroll(paralaxScroll);
	};

	$(document).ready(ready);
})();