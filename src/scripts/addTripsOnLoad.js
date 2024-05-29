import { getTrips } from './tripIndexedDB';
import { createTripContainer } from './tripContainer';
import { createTripPin } from './tripLayer';
import $ from 'jquery';
window.$ = $;

/**
 * Retrieves trips from Indexed DB and adds them to the panel when the app is loaded.
 */
const addTripsOnLoad = async () => {
	// get trips from the database and add them to the panel
	const getTripsPromise = await getTrips();
	getTripsPromise.forEach((trip) => {
		const tripContainer = createTripContainer(trip, trip.id);
		tripContainer.insertBefore('#add-place-btn');

		// add trip pin to the map
		try {
			createTripPin(trip.longitude, trip.latitude, trip.id, trip.rating);
		} catch (error) {
			console.log('error while adding pin', error);
		}
	});
};

addTripsOnLoad();
