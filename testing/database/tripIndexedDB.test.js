require('fake-indexeddb/auto');

// mock DOM object
import { JSDOM } from "jsdom";
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
global.navigator = {onLine: true}

// adding jQuery 
const $ = require('jquery');

const { openDatabase, addTrip, getTrips, deleteTrip} = require('../../src/scripts/tripIndexedDB.js');
let database;

// before each test initialize the database
beforeEach(async () => {
  database = await openDatabase();
});

// after each test delete all the data from the object store
afterEach(() => {
  const transaction = database.transaction(['trips'], 'readwrite');
  const objectStore = transaction.objectStore('trips');

  objectStore.clear();
})

// test if the database 'trips' has been opened successfully
test('verify trips database opening', async () => {
  openDatabase().then(db => {
    expect(db.name).toBe('trips');
  });
});

// test if the object store 'trips' from the database 'trips' has been created 
test('verify trips object store creation', async () => {
  openDatabase().then(db => {
    const objectStores = db.objectStoreNames;
      expect(objectStores.includes('trips')).toBe(true);
  });
});

// add a trip and verify it was successful by checking the number of items in the object store
test('verify adding trip to the database', async () => {
  const trip = {
    'title': 'First trip to London',
    'images': [],
    'rating': 4,
    'address': 'London, UK',
    'description': 'The first trip to UK was to London and was very nice but expensive.'
  };

  // add trip to database
  await addTrip(trip);

  // open a transaction to the database 
  const transaction = database.transaction(['trips'], 'readonly');
  const objectStore = transaction.objectStore('trips');

  // get the count the entries from the object store
  const count = objectStore.count();

  // count the results from the object store trips
  const countResult = await new Promise((resolve, reject) => {
    count.onsuccess = () => {
      resolve(count.result);
    };
    count.onerror = (event) => {
      reject(event.target.error);
    };
  });
  expect(countResult).toBe(1);
});

// test adding multiple trips to the database
test('add multiple trips to the database', async () => {
  for (let i = 1; i < 6; i++) {
    const trip = {
      'title': `Trip ${i}`,
      'images': [],
      'rating': i,
      'address': 'London, UK',
      'description': `A description for trip ${i}`
    };
    await addTrip(trip);
  }

  // open database transaction
  const transaction = database.transaction(['trips'], 'readonly');
  const objectStore = transaction.objectStore('trips');

  // count the number of entries in the database
  const count = objectStore.count();

  // count the results from the object store trips
  const countResult = await new Promise((resolve, reject) => {
    count.onsuccess = () => {
      resolve(count.result);
    };
    count.onerror = (event) => {
      reject(event.target.error);
    };
  });
  expect(countResult).toBe(5);
});

// test if the trips can be retrieved from the 'trips' database
test('getting items from the database', async () => {
  const trip = {
    'title': 'First trip to London',
    'images': [],
    'rating': 4,
    'address': 'London, UK',
    'description': 'The first trip to UK was to London and was very nice but expensive.'
  };
  await addTrip(trip);
  const getTripsPromise = await getTrips();

  // remove the key id from the database response object
  delete getTripsPromise[0]["id"];
  expect(getTripsPromise[0]).toEqual(trip);
});

// test if a trip can be deleted from the database by counting the entries in the object store
test('deleting trip from the database', async () => {
  const trip = {
    'title': 'First trip to London',
    'images': [],
    'rating': 4,
    'address': 'London, UK',
    'description': 'The first trip to UK was to London and was very nice but expensive.'
  };
  await addTrip(trip);
  const getTripsPromise = await getTrips();

  const tripId = getTripsPromise[0]["id"];
  await deleteTrip(tripId);

   // open database transaction
   const transaction = database.transaction(['trips'], 'readonly');
   const objectStore = transaction.objectStore('trips');
 
   // count the number of entries in the database
   const count = objectStore.count();
 
   // count the results from the object store trips
   const countResult = await new Promise((resolve, reject) => {
     count.onsuccess = () => {
       resolve(count.result);
     };
     count.onerror = (event) => {
       reject(event.target.error);
     };
   });
   expect(countResult).toBe(0);
});

