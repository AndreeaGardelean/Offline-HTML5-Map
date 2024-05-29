import { updateProgressBar } from './download';
import $ from 'jquery';
window.$ = $;

const dbName = 'tiles';
const dbVersion = 1;
let database;
var objectStores = [];

/**
 * Open database and create object stores for each zoom level.
 * The zoom levels are from 8 to 14.
 */
export const openDatabase = () => {
	return (database = new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, dbVersion);

		// handler in the case an error occurs whilst opening database
		request.onerror = (event) => {
			reject('Error while opening database: ', event.target.error);
		};

		// handler to be executed when database opening is successful
		request.onsuccess = (event) => {
			resolve(event.target.result);
		};

		// event handler for when database version number is updated or new database is opened
		request.onupgradeneeded = (event) => {
			const db = event.target.result;

			for (var z = 8; z < 15; z++) {
				// creating an object store in database
				const objectStore = db.createObjectStore(z.toString(), {
					keyPath: ['x', 'y'],
					autoIncrement: false,
				});
				// creating object store indexes for fast access
				objectStore.createIndex('xyIndex', ['x', 'y'], { unique: true });
				objectStores.push(objectStore);
			}
		};
	}));
};

/**
 * Add a vector tile (in pbf format) in the Indexed DB for offline access.
 *
 * @param {x-protobuf} tile map tile in protobuf format
 * @param {int} z zoom level the tile corresponds to
 * @param {int} x tile x-coordinate
 * @param {int} y tile y-coordinate
 */
export const addTile = (tile, z, x, y) => {
	return new Promise((resolve, reject) => {
		database
			.then((db) => {
				if (!db) {
					reject('DB not open for adding tile!');
				}

				// create transaction
				const transaction = db.transaction([z.toString()], 'readwrite');
				const objectStore = transaction.objectStore(z.toString());

				const data = { x: x, y: y, tile: tile };
				const addItem = objectStore.put(data);

				addItem.onsuccess = () => {
					resolve(`layer with coordinates ${z}-${x}-${y} added`);
				};

				addItem.onerror = (event) => {
					reject(`Failed to add tile ${(z, x, y)}: `, event.target.error);
				};

				transaction.oncomplete = () => {
					resolve('Transaction complete!');
				};

				transaction.onerror = (event) => {
					reject('Transaction error in addTile: ', event.target.error);
				};
			})
			.catch((error) => {
				resolve('Error whilst adding tile to IndexedDB', error);
			});
	});
};

/**
 * Retrieve the vector tile with the given coordinates from IndexedDB.
 *
 * @param {int} z zoom level
 * @param {int} x tile x-coordinate
 * @param {int} y tile y-coordinate
 * @returns returns a Promise with the vector tile or rejection reason
 */
export const retrieveTile = (z, x, y) => {
	return new Promise((resolve, reject) => {
		database
			.then((db) => {
				if (!db) {
					reject('Database not open for retrieving items!');
				}

				// creating an object store transaction and request for reading data
				const transaction = db.transaction([z.toString()], 'readonly');
				const objectStore = transaction.objectStore(z.toString());
				const objectIndex = objectStore.index('xyIndex');
				const request = objectIndex.openCursor([x, y]);

				request.onerror = () => {
					resolve(null);
				};

				request.onsuccess = (event) => {
					const result = event.target.result;
					if (result) {
						resolve(result.value.tile);
					} else {
						resolve(null);
					}
				};
			})
			.catch((error) => {
				reject('Database promise error in retrieving items', error);
			});
	});
};

/**
 * Function will be executed when the 'Download' button is clicked.
 * The function requests the tile coordinates from the tiles server, for every zoom level 8-14.
 * The server returns an array with the coordinates for all tiles, then a new request is made
 * to retrieve the tile corresponding to the coordinates and add it to IndexedDB.
 */
export const fetchAndAddTiles = async () => {
	return new Promise(async (resolve, reject) => {
		for (let z = 8; z < 15; z++) {
			// request the tile coordinates for the zoom level
			try {
				const tileCoordinatesFetch = await fetch(
					`http://localhost:3000/offline/tiles?zoom_level=${z}`,
				);
				const tileCoordinates = await tileCoordinatesFetch.json();

				// iterate over the coordinates for the z zoom level
				tileCoordinates.forEach(async (coord) => {
					const x = coord.tile_column;
					const y = (1 << z) - 1 - coord.tile_row;

					// request the tile with the coordinates from server
					try {
						await fetchAndAddTile(z, x, y, 0);
					} catch (error) {
						reject(`ERROR while fetching tile for IndexedDB: ${error}`);
					}
				});
			} catch (error) {
				reject(`ERROR in fetching tile coordinates: ${error}`);
			}
		}
		resolve(200);
	});
};

/**
 * Fetches the tile with the specified coordinates from the server.
 * If the fetch request is successful the tile will be added to IndexedDB.
 * If the fetch request fails it retries to fetch the tile again by recursively calling itself at most 3 times.
 *
 * @param {int} z zoom level of requested tile
 * @param {int} x x coordinate of requested tile
 * @param {int} y y coordinate of requested tile
 * @param {int} retry the number of previous fetch retries
 * @returns exits when a tile does not exist in the database
 */
export const fetchAndAddTile = async (z, x, y, retry) => {
	const url = `http://localhost:3000/data/tiles/${z}/${x}/${y}.pbf`;
	// try to fetch the tile
	try {
		const tileResponse = await fetch(url);
		if (!tileResponse.ok) {
			return;
		}
		const tile = await tileResponse.arrayBuffer();
		// try to add the tile to db
		try {
			const addTileResponse = await addTile(tile, z, x, y);
			// if the tile was added to the db update progress bar
			if (addTileResponse === `layer with coordinates ${z}-${x}-${y} added`) {
				updateProgressBar();
			}
			// error for adding tile to db
		} catch (error) {
			return;
		}
		// error for tile retrieval
	} catch (error) {
		// retry to fetch the tile only 3 times in 2 seconds
		if (retry < 3) {
			setTimeout(() => {
				fetchAndAddTile(z, x, y, retry + 1);
			}, 3000);
		}
	}
};

// try to open IndexedDB for tiles
try {
	database = openDatabase();
} catch (error) {
	console.log(`ERROR: ${error}`);
}
