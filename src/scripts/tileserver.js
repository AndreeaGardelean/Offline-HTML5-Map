const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const filepath = '../../data/tiles.mbtiles';
const db = new sqlite3.Database(filepath);

// Header to enable CORS
const header = {
	'Access-Control-Allow-Origin': 'https://offline-map.onrender.com',
	'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
	'Content-Type': 'application/x-protobuf',
	'Content-Encoding': 'gzip',
};

const offlineHeaders = {
	'Access-Control-Allow-Origin': 'https://offline-map.onrender.com',
	'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
	'Content-Type': 'application/json',
};

/**
 * Route which handles vector tile requests from database
 */
app.get('/data/tiles/:z/:x/:y.pbf', (req, res) => {
	const z = req.params.z;
	const x = req.params.x;
	const y = (1 << z) - 1 - req.params.y;

	const query = `SELECT tile_data FROM tiles WHERE zoom_level= ? AND tile_column = ? AND tile_row = ?`;
	db.get(query, z, x, y, (err, row) => {
		if (err) {
			console.error(
				'Error whilst reading tile: ',
				err,
				' with params:',
				req.params.z,
				req.params.x,
				req.params.y,
			);
			res
				.status(404)
				.send(
					'Error whilst reading tile: ',
					err.message,
					' with params:',
					req.params.z,
					req.params.x,
					req.params.y,
				);
		}
		if ((!err && !row) || (err && err.errno == 1)) {
			console.log(`Tile with coordinates: z=${z}, x=${x}, y=${y} does not exist`);
			res.status(404).send('Tile does not exist');
			return;
		}
		res.set(header);
		res.status(200).send(row.tile_data);
	});
});

/**
 * Route which returns the x-y coordinates of the existing tiles for the specified zoom level
 */
app.get('/offline/tiles', (req, res) => {
	const z = req.query.zoom_level;

	// query to select the x-y coordinates for the specified zoom level
	const query = `SELECT tile_column, tile_row FROM tiles WHERE zoom_level=${z}`;
	db.all(query, (err, rows) => {
		if (err) {
			console.error('Error whilst querying data for offline use', err);
			return res.status(500).send('Error whilst querying data for offline use', err);
		}
		if ((!err && rows.length == 0) || (err && err.errno == 1)) {
			console.log(`Tiles for zoom level: z=${z} does not exist`);
			res.status(404).send(`Tiles for zoom level: z=${z} does not exist`);
			return;
		}
		res.set(offlineHeaders);
		res.status(200).send(rows);
	});
});

// The Node.js server listens to port 3000
const portNumber = 3000;
app.listen(portNumber, () => {
	console.log('Listening to port:', portNumber);
});
