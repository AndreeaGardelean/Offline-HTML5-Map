const dbName = 'attractions';
const dbVersion = 1;
let database;

/**
 * Open database for attractions data.
 *
 * @returns return a Promise which resolves to an instance of the database or reason of failure
 */
export const openDatabase = () => {
	database = new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, dbVersion);

		// handler in the case an error occurs whilst opening database
		request.onerror = (event) => {
			reject('Error while opening attractions database: ', event.target.error);
		};

		// handler to be executed when database opening is successful
		request.onsuccess = (event) => {
			resolve(event.target.result);
		};

		// event handler for when database version number is updated or new database is opened
		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			// creating an object store in database
			db.createObjectStore('museums', { keyPath: 'key', autoIncrement: false });
			db.createObjectStore('cafe', { keyPath: 'key', autoIncrement: false });
			db.createObjectStore('mall', { keyPath: 'key', autoIncrement: false });
			db.createObjectStore('theatre', { keyPath: 'key', autoIncrement: false });
		};
	});
	return database;
};

/**
 * Add attraction data to database.
 *
 * @param {xml} data attraction data in XML format
 * @param {string} name name of the attraction
 * @returns return a Promise which resolve with a success message or reason of failure
 */
export const addAttraction = (data, name) => {
	return new Promise((resolve, reject) => {
		database.then((db) => {
			if (!db) {
				reject('Database not open for adding attraction.');
				return;
			}

			const transaction = db.transaction([name], 'readwrite');
			const objectStore = transaction.objectStore(name);

			const addAttractionTransaction = objectStore.put(data);

			addAttractionTransaction.onsuccess = (event) => {
				resolve(event.target.result);
			};

			addAttractionTransaction.onerror = (error) => {
				reject('Error whilst adding attraction to IndexedDB', error);
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
 * Retrieve an attraction from IndexedDB and return a promise when the transaction succeeds.
 *
 * @returns return a promise
 */
export const getAttraction = (name) => {
	return new Promise((resolve, reject) => {
		database.then((db) => {
			if (!db) {
				reject('Attractions database not open to retrieve attraction!');
				return;
			}
			const transaction = db.transaction([name], 'readonly');
			const objectStore = transaction.objectStore(name);

			const attractionRequest = objectStore.getAll();

			attractionRequest.onsuccess = (event) => {
				const attraction = event.target.result;

				resolve(attraction);
			};

			attractionRequest.onerror = function (event) {
				reject('Error retrieving attraction from IndexedDB:', event.target.error);
			};
		});
	});
};

openDatabase();
