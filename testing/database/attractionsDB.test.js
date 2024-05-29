// mocking IndexedDB
require('fake-indexeddb/auto');

// mock DOM object
import { JSDOM } from "jsdom";
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

const { openDatabase, addAttraction, getAttraction} = require('../../src/scripts/attractionsDB.js');
let database;

// before each test initialize the database
beforeEach(async () => {
  database = await openDatabase();
});

// after each test delete all the data from the object stores
afterEach(() => {
  const museumsTransaction = database.transaction(['museums'], 'readwrite');
  const museumObjectStore = museumsTransaction.objectStore('museums');

  const cafeTransaction = database.transaction(['cafe'], 'readwrite');
  const cafeObjectStore = cafeTransaction.objectStore('cafe');

  const mallTransaction = database.transaction(['mall'], 'readwrite');
  const mallObjectStore = mallTransaction.objectStore('mall');

  const theatreTransaction = database.transaction(['theatre'], 'readwrite');
  const theatreObjectStore = theatreTransaction.objectStore('theatre');

  museumObjectStore.clear();
  cafeObjectStore.clear();
  mallObjectStore.clear();
  theatreObjectStore.clear();
});

// test if the database 'attractions' has been opened successfully
test('verify attractions database opening', async () => {
  openDatabase().then(db => {
    expect(db.name).toBe('attractions');
  });
});

// test if the object stores from the attractions database have been created 
test('verify attractions object stores creation', async () => {
  openDatabase().then(db => {
    const objectStores = db.objectStoreNames;
      expect(objectStores.includes('museums')).toBe(true);
      expect(objectStores.includes('cafe')).toBe(true);
      expect(objectStores.includes('mall')).toBe(true);
      expect(objectStores.includes('theatre')).toBe(true);
  });
});

// add an attraction and verify it was successful by checking the number of items in the object store
test('verify adding attraction to the database', async () => {
  const mockAttraction =
    'This is a mock attraction data to check that data can be added to the object store.'

  // add attraction to database
  await addAttraction({'key': 'cafe', 'data': mockAttraction}, 'cafe');

  // open a transaction to the database 
  const transaction = database.transaction(['cafe'], 'readonly');
  const objectStore = transaction.objectStore('cafe');

  // get the count the entries from the object store
  const count = objectStore.count();

  // count the results from the object store cafe
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