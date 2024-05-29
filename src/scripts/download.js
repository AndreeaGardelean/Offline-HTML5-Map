import { fetchAndAddTiles } from './indexedDB';
import $ from 'jquery';
window.$ = $;

/**
 * Hide or show download button based on internet connection.
 */
export const downloadVisibility = () => {
	if (!navigator.onLine) {
		$('#download-map').hide();
	} else {
		$('#download-map').show();
	}
};

/**
 * Event listener for download button triggering the fetchAndAddTiles.
 */
export const eventListener = () => {
	$('#download-map').on('click', async () => {
		// animate the download button to provide visual feedback the button is pressed
		// the function will increase the size of the button to 24px over a period od 3 seconds
		// then will decrease the size to the initial size of 18px and display the progress bar
		$('#download-map').animate(
			{
				fontSize: '1.5rem',
			},
			300,
			() => {
				$('#download-map').animate(
					{
						fontSize: '1rem',
					},
					300,
				);
				$('#download-progress').show();
			},
		);
		await fetchAndAddTiles();
	});
};

/**
 * Update the progress bar as each tile gets added to the database.
 */
export const updateProgressBar = () => {
	let curVal = $('#download-progress').val();
	let increment = 100 / 2107;
	curVal += increment;
	$('#download-progress').val(curVal);
};

downloadVisibility();
eventListener();
