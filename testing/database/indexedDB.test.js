require('fake-indexeddb/auto');

// mock DOM object
import { JSDOM } from "jsdom";
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
global.navigator = {onLine: true}

const { openDatabase, addTile, retrieveTile, fetchAndAddTiles, fetchAndAddTile} = require('../../src/scripts/indexedDB.js');
let database;

// before each test initialize the database
beforeEach(async () => {
  database = await openDatabase();
});

// clear the object stores after each test
afterEach(() => {
  for (let i = 8; i < 15; i++) {
    const transaction = database.transaction(['8'], 'readwrite');
    const objectStore = transaction.objectStore('8');

    objectStore.clear();
  }
});

// test which verifies that the database 'tiles' has been opened
test('verify tiles database opening', () => {
  openDatabase().then(db => {
    expect(db.name).toBe('tiles');
  });
});

// test which verifies that the object stores from database 'tiles' have been opened
test('verify tiles object stores creation', async () => {
  openDatabase().then(db => {
    const objectStores = db.objectStoreNames;
    for (let i = 8; i < 15; i++) {
      expect(objectStores.includes(i.toString())).toBe(true);
    }
  });
});

// test adding a tile to the database by checking the number of items in the database
test('add tile', async () => {
  const tile = { tile: 'Vector tile test 8-0-0' };
  await addTile(tile, 8, 0, 0);

  // check how many items are in the database now
  const transaction = database.transaction(['8'], 'readonly');
  const objectStore = transaction.objectStore('8');
  const count = objectStore.count();

  // count the results from the object store 0
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

// test which adds a tile and checks if the tile was added by evaluating the response message
test('add tile 2', async () => {
  const tile = { tile: 'Vector tile test 8-1-0' };
  const addTileResponse = await addTile(tile, 8, 1, 0);
  expect(addTileResponse).toBe('layer with coordinates 8-1-0 added');
});

// test which adds a tile and checks if the tile was added by evaluating the returned tile
test('retrieve tile from tiles database', async () => {
  const tile = { tile: 'Vector tile test 8-1-1'};
  await addTile(tile, 8, 1, 1);
  
  const retrievedTile = await retrieveTile(8, 1, 1);
  expect(retrievedTile).toEqual(tile);
});

// test which checks that all tiles have been added to IndexedDB from the SqLite db by checking the number of tiles present it the Indexed db
// Note: the server needs to run for this test to pass
test('add tiles from SqLite db to Indexed db', async () => {
  const database = await openDatabase();

  await fetchAndAddTiles();
  let countAllTiles = 0;

  for (let i = 8; i < 15; i++) {
    const transaction = database.transaction([i.toString()], 'readonly');
    const objectStore = transaction.objectStore(i.toString());
    const countResult = await new Promise((resolve, reject) => {
    const request = objectStore.count();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
  countAllTiles += countResult;
  }
  expect(countAllTiles).toEqual(2107);
}, 100000);

