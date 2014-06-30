document.addEventListener('DOMContentLoaded', function (event) {
	var $header = document.querySelector('.header');
	var $overlay = document.querySelector('.header .overlay');
	var $content = document.querySelector('.content');

	updateHeader($header, $overlay);

	window.onscroll = function (e) { updateHeader($header, $overlay); };

	window.onresize = function (e) {
		console.log('Window Resize Event');

		var css = window.getComputedStyle($header);
		var newMax = parseInt(css.maxHeight);
		var newMin = parseInt(css.minHeight);

		if ((newMax !== updateHeader.maxHeight) || (newMin !== updateHeader.minHeight)) {
			updateHeader.maxHeight = newMax;
			updateHeader.minHeight = newMin;
			updateHeader($header, $overlay);
		}	
	}
});

function updateHeader ($header, $overlay) {
	if (!updateHeader.maxHeight || !updateHeader.minHeight) {
		var css = window.getComputedStyle($header);
		updateHeader.maxHeight = parseInt(css.maxHeight);
		updateHeader.minHeight = parseInt(css.minHeight);
	}

	var h = updateHeader.maxHeight - window.pageYOffset;
	if (h < 0) h = 0;

	$header.style.height = h+'px';
	$overlay.style.height = $header.style.height;
	$overlay.style.opacity = window.pageYOffset / (updateHeader.maxHeight - updateHeader.minHeight);
}

function trackOutboundLink (url, target) {
	ga('send', 'event', 'outbound', 'click', url, {
		'hitCallback': function() { window.open(url, target); }
   	});
}