import { jsPDF } from 'jspdf';

/**
 * Event trigerred when 'Download trips'button is clicked.
 * Added animation feature for visual feedback.
 * Create a pdf containing all the trip informations of the selected trips.
 */
const downloadTrips = () => {
	$('#download-trips').on('click', () => {
		animateDownloadTrips();

		const tripIds = getSelectedTrips();

		// create document and set document size
		const doc = new jsPDF('p', 'pt', 'a4', true);

		// get page dimensions
		const pageWidth = doc.internal.pageSize.getWidth();
		const pageHeight = doc.internal.pageSize.getHeight();

		// y position of the elements on the page
		var y = 20;

		/**
		 * Check if page is full, then create another page if that is true.
		 *
		 * @param {int} curHeight height to check the page height against
		 */
		const checkPage = (curHeight) => {
			if (pageHeight < curHeight) {
				y = 20;
				doc.addPage();
			}
		};

		/**
		 * Update the y position for the next element.
		 */
		const updateY = () => {
			y += 20;
		};

		tripIds.forEach((tripId) => {
			// get and add trip title
			checkPage(y + 10);
			var tripTitle = $(`#trip-${tripId} .trip-title`).text();
			doc.text(tripTitle, 10, y);
			updateY();

			// get and add trip images for the current trip
			$(`#trip-${tripId} .trip-images img.trip-imgs`).each(function () {
				var src = $(this).attr('src');

				checkPage(y + 200);
				doc.addImage(src, 'JPEG', 100, y, pageWidth - 200, 200, undefined, 'FAST');
				y += 220;
			});

			// get trip rating and add star images to the doc to represent the rating
			const stars = $(`#trip-${tripId} .star-container .filled`).length;
			doc.text(`Rating: ${stars}`, 10, y);
			updateY();
			updateY();

			// get and add trip location
			var tripLocation = $(`#trip-${tripId} .location`).text();
			checkPage(y + 10);
			doc.text(tripLocation, 10, y);
			updateY();

			// get and add trip description
			var tripDescription = $(`#trip-${tripId} .description`).text();
			// split the description over multiple lines
			const description = doc.splitTextToSize(tripDescription, pageWidth - 10);

			// add each split line to the pdf
			for (var i = 0; i < description.length; i++) {
				checkPage(y + 10);
				doc.text(description[i], 10, y);
				if (i < description.length - 1) {
					updateY();
				}
			}
			updateY();

			// add line under the trip
			doc.line(0, y, pageWidth, y);
			checkPage(y);
			updateY();
			doc.addPage();
			y = 20;
		});

		// save the pdf
		doc.save('trips.pdf');
	});
};

/**
 * Animate the button 'Download trips'.
 */
const animateDownloadTrips = () => {
	$('#download-trips').animate(
		{
			fontSize: '1.5rem',
		},
		300,
		() => {
			$('#download-trips').animate(
				{
					fontSize: '1rem',
				},
				300,
			);
		},
	);
};

/**
 * Get the id of the selected trips.
 */
const getSelectedTrips = () => {
	const selectedTripIds = [];

	//  get the ids of the selected trips
	$('.selected-trip').each(function () {
		const id = $(this).attr('id').split('-');
		selectedTripIds.push(id[id.length - 1]);
	});
	return selectedTripIds;
};

downloadTrips();
