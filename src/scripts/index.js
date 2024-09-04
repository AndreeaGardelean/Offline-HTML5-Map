import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import { stylefunction } from 'ol-mapbox-style';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import { Circle } from 'ol/geom';
import { Fill, Style } from 'ol/style';
import { Feature } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Attribution, defaults as defaultControls } from 'ol/control.js';
import TileState from 'ol/TileState.js';
import { addTile, retrieveTile } from './indexedDB.js';
import { transformExtent } from 'ol/proj';
import { animateClose, closeBtn } from './panel.js';
import $ from 'jquery';
window.$ = $;

/**
 * Create layer for a vector tile for the map data with data from Indexed DB if available with fallback to the server.
 *
 * @param {String} url server url to vector tile
 * @returns returns the created layer with the vector tile
 */
const createLayer = (url) => {
	const layer = new VectorTileLayer({
		source: new VectorTileSource({
			format: new MVT(),
			url: url,

			tileLoadFunction: (tile, url) => {
				tile.setLoader(async (extent, projection) => {
					try {
						const coords = tile.getTileCoord();
						const [z, x, y] = coords;
						// get data from IndexedDB
						var data = await retrieveTile(z, x, y);
						// get data from the tiles server if there is no data in IndexedDB
						if (!data) {
							const response = await fetch(url);
							if (response.ok) {
								data = await response.arrayBuffer();
								// add the missing tile to the database
								await addTile(data, z, x, y);
							}
						}

						// add the data to the map
						const format = tile.getFormat();
						const features = format.readFeatures(data, {
							extent: extent,
							featureProjection: projection,
						});
						tile.setFeatures(features);
					} catch (error) {
						console.error('Error while fetching tiles from INDEXED DB', error);
						tile.setState(TileState.ERROR);
					}
				});
			},
		}),
	});
	return layer;
};

/**
 * Created new layer which contains OpenStreetMap and OpenMapTiles attributions/credit for using their tools and data.
 */
const attributions = new VectorTileLayer({
	source: new VectorTileSource({
		attributions: [
			`<div id='attributions'><a href='https://openmaptiles.org/'>© OpenMapTiles </a><a href='https://www.openstreetmap.org/copyright'>  © OpenStreetMap contributors</a></div>`,
		],
	}),
});

const attribution = new Attribution({
	collapsible: false,
});

// map box
var extent = transformExtent([-0.5999997, 51.28, 0.4199981, 51.6999999], 'EPSG:4326', 'EPSG:3857');

// create map
export var map = new Map({
	target: 'map',
	view: new View({
		center: fromLonLat([-0.1265, 51.483]),
		maxZoom: 15,
		zoom: 6,
		extent: extent,
	}),
	layers: [],
	controls: defaultControls({ attribution: false }).extend([attribution]),
});

// create map layer
const londonLayer = createLayer('https://offline-html5-map.onrender.com/data/tiles/{z}/{x}/{y}.pbf');

// add map layers
map.addLayer(londonLayer);
map.addLayer(attributions);

/**
 * Method which checks size of the window and close the attribution information if is less than 600px.
 */
const closeAttributions = () => {
	const isSmall = map.getSize()[0] < 600;
	attribution.setCollapsible(isSmall);
	attribution.setCollapsed(isSmall);
};

// event listener for window resizing
window.addEventListener('resize', closeAttributions);

// create a new layer for the location circle
const locationLayer = new VectorLayer({
	source: new VectorSource({
		features: [],
	}),
});

/**
 * Calculates the size of the location circle based on map resolution.
 *
 * @returns returns the size of the circle
 */
const calculateSize = () => {
	const view = map.getView();
	const resolution = view.getResolution();
	const dpi = 25 / 0.08;
	const scale = resolution * dpi * 2;
	return scale / 60;
};

/**
 * Function to update the location circle of the user.
 *
 * @param {object} position position data returned by geolocation API
 */
const updatePosition = (position) => {
	const longitude = position.coords.longitude;
	const latitude = position.coords.latitude;

	// create new location point
	const circle = new Feature({
		geometry: new Circle(fromLonLat([longitude, latitude]), calculateSize()),
	});

	// set circle style
	circle.setStyle(
		new Style({
			fill: new Fill({
				color: 'rgba(46, 204, 113, 1)',
			}),
		}),
	);

	// clear the location layer of previous location circles
	const locationSource = locationLayer.getSource();
	locationSource.clear();

	// add new location circle to the layer
	locationSource.addFeature(circle);

	// add event listener for map resolution change
	map.getView().on('change:resolution', () => {
		circle.getGeometry().setRadius(parseInt(calculateSize()));
	});
	locateMe(longitude, latitude);
};

// add location circle layer to the map
map.addLayer(locationLayer);

/**
 * Shows the locate button on the page and adds on click event functionality.
 * When the button is clicked the map will focus at the location given bu longitude and latitude.
 *
 * @param {float} longitude location longitude coordinates
 * @param {float} latitude location latitude coordinates
 */
const locateMe = (longitude, latitude) => {
	// when the 'locate' button is clicked the map will focus on the current location
	$('#locate').show();
	$('#locate').on('click', () => {
		if (window.innerWidth < 701) {
			animateClose();
			closeBtn();
		}
		const view = map.getView();
		view.setCenter(fromLonLat([longitude, latitude]));
		view.setZoom(14);
	});
};

/**
 * Function to handle errors whilst retrieving location
 * @param {error} error error message
 */
const catchError = (error) => {
	console.log(
		'Something went wrong while getting location. Cannot locate you because: ',
		error.message,
	);
};

/**
 * Add geolocation feature to the map.
 */
if ('geolocation' in navigator) {
	navigator.geolocation.watchPosition(updatePosition, catchError, {
		enableHighAccuracy: true,
	});
} else {
	console.log('Location is not supported by your browser.');
}

/**
 * Add map styling to the map from style.json
 */
fetch('json/style.json').then((response) => {
	response.json().then(function (style) {
		stylefunction(londonLayer, style, 'openmaptiles');
	});
});
