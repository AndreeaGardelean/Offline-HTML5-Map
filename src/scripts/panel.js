import $ from 'jquery';
window.$ = $;

/**
 * Actions to be performed when the panel button is clicked for devices with width > 800.
 * The actions will be performed when the panel is hidden or open when the button is clicked.
 */
const largeWindow = () => {
	if ($('#panel-content').is(':hidden')) {
		$('.panel').addClass('background-img');
		$('#panel-content').css('display', 'flex');
		$('#map').css({ width: '60vw' });
		openBtn();
	} else {
		// if panel is open when the click event is triggered close it
		$('.panel').removeClass('background-img');
		$('#panel-content').hide();
		$('#map').css({ width: '100vw' });
		closeBtn();
	}
};

/**
 * Actions to be performed when the panel button is clicked for devices with screen width < 800.
 * Actions will be performed based on the status of the panel (i.e when closed or open).
 */
const smallWindow = () => {
	$('#map').css({ width: '100vw' });
	const status = $('.panel').attr('status');
	$('#map').css({ width: '100vw' });
	// if panel position is at the bottom open it
	if (status === 'close') {
		animateOpen();
		openBtn();
	} else {
		// if panel is open when the button is clicked close it
		animateClose();
		closeBtn();
	}
};

/**
 * Event listener to click event for closing and opening the panel.
 * The actions performed when the button is clicked differ based on the device screen size.
 */
$('#close').on('click', () => {
	// if panel is hidden open it
	if (window.innerWidth > 800) {
		largeWindow();
	} else {
		smallWindow();
	}
});

/**
 * Animate the opening of the panel over 8ms and place the panel at the top of the page.
 */
export const animateOpen = () => {
	$('.panel').attr('status', 'open');
	$('.panel').animate(
		{
			top: '0%',
		},
		800,
	);
};

/**
 * Animate the closing of the panel over 8ms. Will place the panel either at the given value as a parameter or 3rem
 * at the bottom of the page.
 *
 * @param {int} maxClose optional value to specify the position of the panel
 */
export const animateClose = (maxClose) => {
	$('.panel').attr('status', 'close');
	const pos =
		window.innerHeight - 3 * parseFloat(getComputedStyle(document.documentElement).fontSize);
	$('.panel').animate(
		{
			top: maxClose || pos,
		},
		800,
	);
};

/**
 * Make the panel draggable. This allows the user to open and close the panel using touch/mouse movements.
 */
const dragPanel = () => {
	$('#close').on('touchstart', () => {
		// add drag class to the panel when touchstart happens
		$('#close').addClass('drag');

		// update the panel position when the user has movement on the panel
		$('.drag').on('touchmove', (event) => {
			event.preventDefault();
			const percent = window.innerHeight * 0.3;
			const initialTop = parseInt($('.panel').css('top'));
			const touchY = event.touches[0].clientY;
			const minY = initialTop + percent;

			const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
			const maxY = window.innerHeight - 3 * rootFontSize;

			// new panel position based on the touch movement
			let newPos = initialTop + (touchY - minY);
			newPos = Math.min(newPos, maxY);
			newPos = Math.max(newPos, 0);

			if (newPos < initialTop) {
				$('.panel')
					.stop()
					.animate({ top: 0 + 'px' }, 1000);
				openBtn();
			} else {
				$('.panel')
					.stop()
					.animate({ top: maxY + 'px' }, 1000);
				closeBtn();
			}
		});
	});
	// remove the class from the panel when the touch event finishes
	$('#close').on('touchend', () => {
		$('#close').removeClass('drag');
	});
};

/**
 * Update the arrows of the close panel button to indicate 'close panel'.
 */
export const closeBtn = () => {
	$('#close-arrow').attr('src', './icons/angles-right-solid.svg');
};

/**
 * Update the close button of the panel to indicate 'open panel'.
 */
export const openBtn = () => {
	$('#close-arrow').attr('src', './icons/angles-left-solid.svg');
};

if (window.innerWidth < 701) {
	dragPanel();
}

/**
 * Window event listener for activating the touch event on the panel.
 */
$(window).on('resize', () => {
	if (window.innerWidth < 701) {
		dragPanel();
	} else {
		$('.panel').css('top', '0%');
		$('.panel').removeClass('drag');
		$('#close').off('touchstart touchmove');
	}
});
