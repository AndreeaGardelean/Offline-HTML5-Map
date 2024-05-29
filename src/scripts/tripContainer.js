import { nextImage } from './slider';
import $ from 'jquery';
window.$ = $;

/**
 * Creates the trip container with HTML elements for holding trip data.
 *
 * @param {JSON} trip trip data in JSON format
 * @returns returns a div containing the trip information put together.
 */
export const createTripContainer = (trip, id) => {
	// container for the whole trip data
	const tripContainer = $('<div>');
	tripContainer.addClass('trip-container');
	tripContainer.attr('id', `trip-${id}`);

	// container for box selection for each trip
	const tripContainerHeader = $('<div>');
	tripContainerHeader.addClass('trip-container-header');

	tripContainerHeader.append(tripCheckBox(id));
	tripContainerHeader.append(
		`<img class=delete-trip id=trash-${id} src='./icons/trash-can-regular.svg'>`,
	);

	tripContainer.append(tripContainerHeader);

	// trip title
	tripContainer.append(`<p class='trip-title'>${trip.title}</p>`);

	// add trip images to trip container
	tripContainer.append(tripImages(trip.images, id));

	// draw trip star ratings
	tripContainer.append(createStarContainer(trip.rating));

	// trip location
	tripContainer.append(`<p class='location'>${trip.address}</p>`);

	tripContainer.append(`<p class='description'>${trip.description}</p>`);
	tripContainer.css({ 'box-shadow': 'rgba(17, 17, 26, 0.1) 0px 1px 0px', width: '65%' });

	return tripContainer;
};

/**
 * Creates and returns a div which contains 5 other divs (they will later be converted to stars).
 * Out of these 5 divs rating stars will be yellow representing trip rating.
 *
 * @param {int} rating trip rating between 1-5
 * @returns return a div containing 5 stars
 */
export const createStarContainer = (rating) => {
	// container for trip ratings
	const starContainer = $('<div>');
	starContainer.addClass('star-container');

	// draw full star
	for (let i = 0; i < rating; i++) {
		const star = `<div class='star-outline-static'>
                  <div class='star-fill-static filled'></div>
                  </div>`;
		starContainer.append(star);
	}

	// draw empty star
	for (let i = 0; i < 5 - rating; i++) {
		const star = `<div class='star-outline-static'>
                  <div class='star-fill-static'></div>
                  </div>`;
		starContainer.append(star);
	}

	return starContainer;
};

/**
 * Create a container for holding trip images.
 *
 * @param {Array} images array with images URL
 * @param {int} id trip id
 * @returns returns a div containing the images as a slider
 */
export const tripImages = (images, id) => {
	// container for trip images
	const tripImagesContainer = $(`<div class='trip-images'></div>`);

	if (images.length > 1) {
		// left image navigation button
		tripImagesContainer.append(imageSlider(id, -1, 'left'));
	}

	// the first image should not be hidden
	tripImagesContainer.append(`<img class='trip-imgs ${id}' src=${images[0]}>`);

	// images excluding the first one
	const imgs = images.slice(1, images.length);
	imgs.forEach((image) => {
		tripImagesContainer.append(`<img class='trip-imgs ${id}' src=${image} hidden>`);
	});

	if (images.length > 1) {
		// right image navigation button
		tripImagesContainer.append(imageSlider(id, 1, 'right'));
	}

	return tripImagesContainer;
};

/**
 * Creates image slider. Adds 2 arrows to the trip image container which are used to 'swipe' the images.
 *
 * @param {int} id the id of the trip
 * @param {int} next value -1 or 1 indicates if it should display the next image or the previous image
 * @param {string} direction arrow direction (left or right)
 * @returns returns the navigation buttons with the click event attached
 */
const imageSlider = (id, next, direction) => {
	// create image sliders
	const nav = $(
		`<img class='img-nav ${direction}' id='${id} ${direction}' src='./icons/angle-left-solid.svg'>`,
	);

	// add event handler when image slider is clicked
	// left image slider handler
	nav.on('click', () => {
		const id = nav.attr('id').split(' ')[0];
		nextImage(next, id);
	});

	return nav;
};

const tripCheckBox = (id) => {
	const box = $('<div>');
	box.addClass('trip-box');
	box.attr('id', `trip-box-${id}`);

	return box;
};

const tripCheckBoxEvent = () => {
	$(document).on('click', '.trip-box', function () {
		// get the trip id corresponding to the clicked box
		const trashId = $(this).attr('id');
		const tripId = trashId.split('-')[2];

		$(`#trip-box-${tripId}`).toggleClass('selected-trip');
	});
};

tripCheckBoxEvent();
