import * as index from './index.js';
import { animateClose, closeBtn } from './panel';
import $ from 'jquery';
window.$ = $;

/**
 * Event which allows the user to select a location on the map when the 'location' button is clicked in the form.
 * The panel wil also be place 30% at the bottom of the page to allow the user to interact with the map if in mobile mode.
 */
export const eventListener = () => {
	$('#manual-location').on('click', () => {
		if (window.innerWidth < 700) {
			const maxClose = window.innerHeight * 0.7;
			animateClose(maxClose);
			closeBtn();
		}
		// get the map coordinates when a click event happens.
		index.map.on('click', (event) => {
			index.map.forEachFeatureAtPixel(event.pixel, (feature) => {
				const attributes = feature.getProperties();
				const name = attributes.name;
				const coords = event.coordinate;
				if (name) {
					$('#address').val(name);
				} else {
					$('#address').val(coords);
				}
			});
		});
	});
};

eventListener();
