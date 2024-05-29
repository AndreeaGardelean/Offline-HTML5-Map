import $ from 'jquery';
window.$ = $;

/**
 * Adds an event listener to the back icon from the trips form.
 */
export const eventListener = () => {
	$('#trip-back').on('click', () => {
		// reset form entries before returning to panel
		$('#add-place-form')[0].reset();
		$('#image-container p.filename').remove();

		// hide the form and the back button and display the trips panel again
		$('#panel-header').show();
		$('#add-place-form').hide();
		$('#trip-back').hide();
		$('#visited-places').show();
		$('#attractions-container').show();
	});
};

eventListener();
