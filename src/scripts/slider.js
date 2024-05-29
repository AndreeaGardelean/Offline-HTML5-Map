import $ from 'jquery';
window.$ = $;

// keep track of image index (which image to be displayed)
let slideIndex = 1;

/**
 * The function will select all images which are bind to the sliders in action.
 * All images are then hidden from view and only the image corresponding to the index is displayed.
 *
 * @param {int} n n value which is either 1 or -1, used to increment or decrement the slider index
 * @param {string} className the class name of the images to which the slider is bind to
 * @returns exits the function when there are no images
 */
const showImage = (n, className) => {
	let i;
	let x = document.getElementsByClassName(`trip-imgs ${className}`);

	if (x.length === 0) {
		return;
	}

	if (n > x.length) {
		slideIndex = 1;
	} else if (n < 1) {
		slideIndex = x.length;
	}

	for (i = 0; i < x.length; i++) {
		x[i].style.display = 'none';
	}

	x[slideIndex - 1].style.display = 'block';
};

/**
 * Calls show image.
 *
 * @param {int} n n value which is either 1 or -1, used to increment or decrement the slide index
 * @param {string} className the class name of the images to which the slider is binded to
 */
export const nextImage = (n, className) => {
	slideIndex += n;
	showImage(slideIndex, className);
};
