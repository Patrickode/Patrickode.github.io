/*
	Read Only by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$titleBar = null,
		$nav = $('#nav'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '1025px',  '1280px' ],
			medium:   [ '737px',   '1024px' ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Tweaks/fixes.

		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}

	// Header Panel.

		// Nav.
			var $nav_a = $nav.find('a');
			//EDIT: Also do this to local links located in other parts of this page
			var $local_a = $("*").find('a[href^="#"]');
			var topHeightCompensation;

			$local_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$local_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						// $this
						// 	.addClass('active')
						// 	.addClass('active-locked');
					// EDIT: Only "activate" the nav links; use $this's href to determine which should be activated
						$nav.find('a[href="' + $this.attr('href') + '"]').first()
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id),
						// EDIT: Cached booleans for checking if this is the top/second (about/features) section
						isTopSection = $section.attr('id') == 'about',
						isSecondSection = $section.attr('id') == 'features';

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// EDIT: Calculate the midpoint of the screen (ceils for leeway reasons), and figure out how far away 
					//		 the about section is from that. We'll add subtract that to make the about section hittable
						if (isTopSection)
							topHeightCompensation = Math.ceil(Math.max(0, Math.ceil(window.innerHeight / 2) - $section.height()));

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							// EDIT: Shrink/expand the top/bottom points of the top/second section so that the about (top)
							//		 section can still be hit, even when it's not as large as default 
							top: (isSecondSection ? `${topHeightCompensation}px` : '5vh'),
							bottom: (isTopSection ? `-${topHeightCompensation}px` : '5vh'),
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($local_a.filter('.active-locked').length == 0) {

										$local_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		// Title Bar.
			$titleBar = $(
				'<div id="titleBar">' +
					'<a href="#header" class="toggle"></a>' +
					// '<span class="title">' + $('#logo').html() + '</span>' +
					'<span class="title">Patrick Mitchell\'s Portfolio</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$header
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'header-visible'
				});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 500,
			offset: function() {

				if (breakpoints.active('<=medium'))
					return $titleBar.height();

				return 0;

			}
		});

})(jQuery);