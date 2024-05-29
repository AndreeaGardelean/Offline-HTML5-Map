import * as index from './index.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { animateClose } from './panel';
import { closeBtn } from './panel';
import $ from 'jquery';
window.$ = $;

/**
 * Create a layer for adding trips location pin to the map
 */
export const tripsLocationLayer = new VectorLayer({
	source: new VectorSource({
		features: [],
	}),
});

// add pin layer to the map
index.map.addLayer(tripsLocationLayer);

/**
 * Adds a trip pin to the tripsLocationLayer at position corresponding to coordinates longitude and latitude.
 *
 * @param {int} longitude longitude coordinate
 * @param {int} latitude latitude coordinate
 * @param {int} id pin id corresponding to the unique trip id from Indexed DB
 */
export const createTripPin = (longitude, latitude, id, rating) => {
	const icons = [
		'./icons/0star.png',
		'./icons/1star.png',
		'./icons/2star.png',
		'./icons/3star.png',
		'./icons/4star.png',
		'./icons/5star.png',
	];
	const pin = new Feature({
		geometry: new Point([longitude, latitude]),
	});

	pin.setId(id);

	pin.setStyle(
		new Style({
			image: new Icon({
				src: icons[rating],
				scale: 0.02,
			}),
		}),
	);

	tripsLocationLayer.getSource().addFeature(pin);
};

/**
 * Given an id, delete the pin with the given id.
 *
 * @param {int} id unique trip id associated with a pin
 */
export const deleteTripPin = (id) => {
	const source = tripsLocationLayer.getSource();
	// iterate through the features of the tripsLocationLayer
	source.getFeatures().forEach((feature) => {
		if (feature.getId() === parseInt(id)) {
			source.removeFeature(feature);
		}
	});
};

/**
 * Add a map click event handler.
 * When this event is fired we will iterate through all the features of the map
 * and if this feature has an id value this means is a pin.
 * In such case the pin is highlighted on the map by increasing its size
 * and the trip with the id the same as the pin's will also be highlighted on the map.
 */
index.map.on('click', (event) => {
	index.map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
		const id = feature.getId();
		if (layer === tripsLocationLayer && id) {
			// when pin is selected highlight the trip on the map
			highlightTrip(feature, id);

			// un-highlight any other trips from the map and panel
			const source = tripsLocationLayer.getSource();
			unHighlightTrip(source, id);
		}
	});
});

/**
 * Highlights the trip on the map by increasing the size of the selected pin and
 * adds a box shadow to the trip div in the panel.
 *
 * @param {Feature} feature OpenLayers feature
 * @param {int} id unique trip id
 */
const highlightTrip = (feature, id) => {
	const style = feature.getStyle();
	const icon = style.getImage();
	icon.setScale(0.03);
	feature.setStyle(style);

	const tripContainerHeight = $(`#trip-${id}`).height();

	// open the panel slightly such that the first trip is visible
	if (window.innerWidth < 700) {
		const maxClose = window.innerHeight * 0.8 - tripContainerHeight;
		animateClose(maxClose);
		closeBtn();
	}

	$('#visited-places').prepend($(`#trip-${id}`));
	$(`#trip-${id}`).css(
		'box-shadow',
		'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
	);
};

/**
 * 'Un-highlight' is responsible for making the trip pins on the map to the initial size
 * and will add the initial box shadow to the trip div in the panel.
 *
 * @param {VectorLayer} layer OpenLayers vector layer
 * @param {int} id unique trip id
 */
const unHighlightTrip = (source, id) => {
	source.forEachFeature((feature) => {
		if (feature.getId() !== id) {
			const style = feature.getStyle();
			const icon = style.getImage();
			icon.setScale(0.02);
			feature.setStyle(style);
			$(`#trip-${feature.getId()}`).css('box-shadow', 'rgba(17, 17, 26, 0.1) 0px 1px 0px');
		}
	});
};
