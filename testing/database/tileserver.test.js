// mock DOM object
import { JSDOM } from "jsdom";
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

// adding jQuery 
const $ = require('jquery');

// test retrieving tile from SqLite database (requires server to be online)
test('test retrieve tile', async () => {
  const tileResponse = await fetch(`http://localhost:3000/data/tiles/${8}/${127}/${84}.pbf`);
  const contentType = tileResponse.headers.get('content-type');
  expect(contentType).toEqual('application/x-protobuf');
});

// test is a tile does not exist in the database
test('tile not found', async () => {
  const tileResponse = await fetch(`http://localhost:3000/data/tiles/${8}/${0}/${84}.pbf`);
  expect(tileResponse.status).toEqual(404);
});

// test if the coordinates for a specified zoom level can be retrieved from SqLite db
test('get zoom level tile coordinates', async () => {
  const tileResponse = await fetch(`http://localhost:3000/offline/tiles?zoom_level=${14}`);
  expect(tileResponse.status).toEqual(200);
});

// test when zoom level does not exist in the database
test('get tile coordinates for inexistent zoom level', async () => {
  const tileResponse = await fetch(`http://localhost:3000/offline/tiles?zoom_level=${20}`);
  expect(tileResponse.status).toEqual(404);
});