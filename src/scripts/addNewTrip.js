import { animateOpen } from './panel';
import { createTripContainer } from './tripContainer';
import { addTrip } from './tripIndexedDB';
import { createTripPin } from './tripLayer';
import $ from 'jquery';
window.$ = $;

// event triggered when an image is uploaded in the picker
$('#file-input').on('change', (event) => {
	const files = event.target.files;

	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		$('#image-container').append(`<p class='filename'>${file.name}</p>`);
	}
});

// event handler when the 'add new trip' button is clicked in the panel
$('#add-place-btn').on('click', () => {
	$('#attractions-container').hide();
	animateOpen();
	$('#panel-header').hide();
	$('#visited-places').hide();
	$('#add-place-form').css('display', 'flex');
	$('#add-place-form').show();
	$('#trip-back').show();
});

// event handler for when the 'Save trip' button is clicked in the form
$('#submit').on('click', async (event) => {
	event.preventDefault();
	// retrieve form data
	const checkedStars = $(`#star-ratings input[name='stars']:checked`);
	const rating = checkedStars.length > 0 ? checkedStars.attr('id') : 0;
	const title = $('#title').val();
	const address = $('#address').val();
	const description = $('#description').val();

	const [longitude, latitude] = address.split(',');

	// get submitted images URL
	getImages($('#file-input').prop('files')).then(async (imagesURL) => {
		const tripData = {
			title: title,
			images: imagesURL,
			rating: rating,
			address: address,
			description: description,
			longitude: longitude,
			latitude: latitude,
		};

		// reset form entries after form is submitted
		$('#add-place-form')[0].reset();
		$('#image-container p.filename').remove();

		// hide the form and display the panel again
		$('#add-place-form').hide();
		$('#trip-back').hide();

		// save data to IndexedDB
		const tripId = await addTrip(tripData);

		// create and add trip to the panel
		const trip = createTripContainer(tripData, tripId);
		trip.insertBefore('#add-place-btn');

		// add trip pin to the map
		try {
			createTripPin(tripData.longitude, tripData.latitude, tripId, tripData.rating);
		} catch (error) {
			console.log('error while adding pin', error);
		}

		$('#panel-header').show();
		$('#visited-places').show();
		$('#attractions-container').show();
		$('#panel-header').show();
	});
});

/**
 * The function will get an array with the name of the submitted trip images and returns an URL for each image in the array.
 *
 * @param {Array} images array which contains the submitted images
 * @returns returns an array with the url of the images
 */
const getImages = (images) => {
	return new Promise((resolve, reject) => {
		const imagesURL = [];

		for (var i = 0; i < images.length; i++) {
			const file = images[i];
			const reader = new FileReader();

			reader.onload = (event) => {
				const imgURL = event.target.result;
				imagesURL.push(imgURL);
				if (imagesURL.length === images.length) {
					resolve(imagesURL);
				}
			};

			reader.onerror = (error) => {
				reject(error);
			};
			reader.readAsDataURL(file);
		}
	});
};
