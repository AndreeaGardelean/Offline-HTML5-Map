const dbName = 'trips';
const dbVersion = 1;
let database;

/**
 * Open database and create object store for trips.
 * @returns returns a Promise which resolves to the database instance or reason for rejection.
 */
export const openDatabase = () => {
	database = new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, dbVersion);

		// handler in the case an error occurs whilst opening database
		request.onerror = (event) => {
			reject('Error while opening trips database: ', event.target.error);
		};

		// handler to be executed when database opening is successful
		request.onsuccess = (event) => {
			resolve(event.target.result);
		};

		// event handler for when database version number is updated or new database is opened
		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			db.createObjectStore('trips', { keyPath: 'id', autoIncrement: true });
		};
	});
	return database;
};

/**
 * Add trip data to database.
 *
 * @param {JSON} trip JSON containing trip details
 * @returns returns a Promise which resolves to the id of the trip or with reason for rejection/failure.
 */
export const addTrip = (trip) => {
	return new Promise((resolve, reject) => {
		database.then((db) => {
			if (!db) {
				reject('Database not open for adding trip.');
				return;
			}

			const transaction = db.transaction(['trips'], 'readwrite');
			const objectStore = transaction.objectStore('trips');

			const addTripTransaction = objectStore.add(trip);

			addTripTransaction.onsuccess = (event) => {
				resolve(event.target.result);
			};

			addTripTransaction.onerror = (error) => {
				reject('Error whilst adding trip to IndexedDB', error);
			};

			transaction.oncomplete = () => {
				resolve('Transaction complete!');
			};

			transaction.onerror = (event) => {
				reject('Transaction error: ', event.target.error);
			};
		});
	});
};

/**
 * Retrieve all trips from Indexed db and return a promise when the transaction succeeds.
 *
 * @returns return a Promise with the trips or reason for rejection/failure.
 */
export const getTrips = () => {
	return new Promise((resolve, reject) => {
		database.then((db) => {
			if (!db) {
				reject('Trip database not open to retrieve trips!');
				return;
			}
			const transaction = db.transaction(['trips'], 'readonly');
			const objectStore = transaction.objectStore('trips');

			const tripsRequest = objectStore.getAll();

			tripsRequest.onsuccess = (event) => {
				const trips = event.target.result;

				resolve(trips);
			};

			tripsRequest.onerror = function (event) {
				reject('Error retrieving trips from IndexedDB:', event.target.error);
			};
		});
	});
};

/**
 * Delete a trip from the database with the given id.
 *
 * @param {int} id unique trip id
 * @returns returns a Promise which resolves with a message informing if the deletion was successful or reason of failure
 */
export const deleteTrip = (id) => {
	return new Promise((resolve, reject) => {
		database.then((db) => {
			if (!db) {
				reject('Trip database not open to delete trips!');
				return;
			}
			const transaction = db.transaction(['trips'], 'readwrite');
			const objectStore = transaction.objectStore('trips');

			const tripsRequest = objectStore.delete(parseInt(id));

			tripsRequest.onsuccess = (event) => {
				resolve(`Trip deleted`);
			};

			tripsRequest.onerror = function (event) {
				reject('Error deleting trip in IndexedDB:', event.target.error);
			};
		});
	});
};

openDatabase();
