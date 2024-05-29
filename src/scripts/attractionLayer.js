import * as index from './index.js';
import { getAttraction } from './attractionsDB';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { animateClose } from './panel';
import { closeBtn } from './panel';
import $ from 'jquery';
window.$ = $;

var layers = [];

/**
 * Create vector layer, add attraction locations and add layer to the map.
 *
 * @param {string} attraction name of the attraction the layer contains
 */
export const createAttractionLayer = async (attraction) => {
	// create map layer
	const layer = new VectorLayer({
		source: new VectorSource({
			features: [],
		}),
		name: attraction,
		visible: false,
	});

	// add layer to the map
	index.map.addLayer(layer);
	layers.push(layer);

	// get the data from db
	const attractionData = await getAttraction(attraction);
	const data = attractionData[0].data;

	// convert the text to xml and iterate over each node, ways and relations
	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(data, 'text/xml');

	// add attractions represented by nodes to the map
	const nodes = xmlDoc.getElementsByTagName('node');
	addNodes(nodes, attraction, layer);

	// for ways and relations we get the bounds which contain the minLat and minLon
	const waysRelations = xmlDoc.getElementsByTagName('bounds');
	// add attractions represented by ways and relations to the map
	addWaysRelations(waysRelations, attraction, layer);
};

/**
 * Add icons for the attractions represented by nodes from the attractions data.
 *
 * @param {Array} nodes array with the nodes from OpenStreetMap data
 * @param {String} attraction attraction name the nodes represent
 * @param {VectorLayer} layer layer to add the icons to
 */
const addNodes = (nodes, attraction, layer) => {
	for (let i = 0; i < nodes.length; i++) {
		const elem = nodes[i];
		const latitude = parseFloat(elem.getAttribute('lat'));
		const longitude = parseFloat(elem.getAttribute('lon'));

		// add icon to the layer
		addItem(longitude, latitude, attraction, layer);
	}
};

/**
 * Add attraction icons for attractions represented by ways and relations to the layer.
 *
 * @param {Array} waysRelations  array with ways and relations from OpenStreetMap data
 * @param {String} attraction attractions the node and ways represent
 * @param {VectorLayer} layer layer to add the icons to
 */
const addWaysRelations = (waysRelations, attraction, layer) => {
	for (let i = 0; i < waysRelations.length; i++) {
		const elem = waysRelations[i];
		const latitude = parseFloat(elem.getAttribute('minlat'));
		const longitude = parseFloat(elem.getAttribute('minlon'));

		// add icon to the layer
		addItem(longitude, latitude, attraction, layer);
	}
};

/**
 * Creates a feature with an icon for the attraction it represents and adds it to the map.
 *
 * @param {int} longitude attraction longitude
 * @param {int} latitude attraction latitude
 * @param {string} attraction attraction name
 * @param {VectorLayer} layer layer to which the attraction should be added to
 */
const addItem = (longitude, latitude, attraction, layer) => {
	const icon = new Feature({
		geometry: new Point(fromLonLat([longitude, latitude])),
	});

	icon.setStyle(
		new Style({
			image: new Icon({
				src: `../icons/${attraction}.png`,
				scale: 0.02,
			}),
		}),
	);
	layer.getSource().addFeature(icon);
};

/**
 * Makes the specified layer visible and all other layers invisible.
 * Used when an attraction layer is selected from the panel.
 *
 * @param {String} visible the name of the attraction layer that should be visible
 */
export const makeVisible = (visible) => {
	layers.forEach((layer) => {
		if (layer.get('name') !== visible) {
			layer.setVisible(false);
		} else {
			if (window.innerWidth < 701) {
				animateClose(0);
				closeBtn();
			}
			layer.setVisible(true);
		}
	});
};

/**
 * Event listener for the attractions button in the panel.
 */
const eventListener = () => {
	$('#attractions').on('change', function () {
		const selectedAttraction = $(this).val();
		makeVisible(selectedAttraction);
	});
};

$(document).on('ready', eventListener());
