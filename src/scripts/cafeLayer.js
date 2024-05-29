import axios from 'axios';
import { addAttraction } from './attractionsDB';
import { createAttractionLayer } from './attractionLayer';
import $ from 'jquery';
window.$ = $;

const apiURL = 'https://overpass-api.de/api/interpreter?data=';

/**
 * Makes a GET request to Overpass API using the provided overpass Query and adds the data to Indexed DB.
 *
 * @param {String} overpassQuery overpass query to retrieve data
 */
const getCafeData = async (overpassQuery) => {
	try {
		const response = await axios({
			method: 'get',
			url: apiURL + encodeURIComponent(overpassQuery),
		});
		const data = response.data;
		await addAttraction({ key: 'cafe', data: data }, 'cafe');
	} catch (error) {
		console.error('Error while retrieving data from OSM: ', error);
	}
};

/*
The query below will return internet cafes from London.
This has been generated with the help of overpass-turbo wizard.
*/
const cafeQuery = `
area(id:3600065606)->.searchArea;
node['amenity'='internet_cafe'](area.searchArea);
out geom;
`;

/**
 * Queries cafe data from IndexedDB and creates a layer with cafe icons representing the attraction locations.
 */
const createCafeLayer = async () => {
	await getCafeData(cafeQuery);
	await createAttractionLayer('cafe');
};

$(document).on('ready', createCafeLayer());
