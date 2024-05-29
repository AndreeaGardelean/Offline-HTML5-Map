import { deleteTrip } from './tripIndexedDB';
import { deleteTripPin } from './tripLayer';
import $ from 'jquery';
window.$ = $;

/**
 * Delete trip container from panel when the trip trash can icon is clicked.
 * The trip is also deleted from the database and the icon associated with it.
 */
export const deleteTripEvent = () => {
	$(document).on('click', '.delete-trip', async function () {
		// get the trip id corresponding to the clicked trash can
		const trashId = $(this).attr('id');
		const tripId = trashId.split('-')[1];

		// delete from database
		const deleteResponse = await deleteTrip(tripId);
		if (deleteResponse === 'Trip deleted') {
			// remove from HTML
			$('#trip-' + tripId).remove();

			// remove the map pin
			deleteTripPin(tripId);	
		}
	});
};

deleteTripEvent();
