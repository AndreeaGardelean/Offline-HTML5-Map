require('fake-indexeddb/auto');

// mock DOM object
import { JSDOM } from "jsdom";
import fs from "fs";

// read the HTML file 
var html = fs.readFileSync("../index.html", "utf-8");
// replace lines which import css from the HTML
html = html.replace(/@import.*;/g, '');
// set the DOM contents to the HTML
const dom = new JSDOM(html, { runScripts: "dangerously" });

// mock document and window objects
global.document = dom.window.document;
global.window = dom.window;
global.navigator = {onLine: true}

// adding jQuery 
const $ = require('jquery');

const {updateProgressBar, downloadVisibility, eventListener} = require('../../src/scripts/download.js');
const  { fetchAndAddTiles } = require("../../src/scripts/indexedDB.js");

// mock fetchAndAddTiles
jest.mock("../../src/scripts/indexedDB", () => ({
  fetchAndAddTiles: jest.fn()
}));

// reset the progress bar value before each test
beforeEach(() => {
  $('#download-progress').val(0);
  global.navigator = {onLine: true};
});

// test if the progress bar value is updated
test('test progress bar updates', () => {
  updateProgressBar();
  expect($('#download-progress').val()).toBe(100/2107);
});

// test the value of the progress bar after multiple updates
test('test progress bar updates 2', () => {
  var expectedVal = 0;
  for(let i = 0; i < 10; i++) {
    updateProgressBar();
    expectedVal += (100/2107);
  }
  expect($('#download-progress').val()).toBe(expectedVal);
});

// when the navigator online is set to true the download button should be not hidden
test('test the download button is visible when online', () => {
  downloadVisibility();
  expect($('#download').css('display')).not.toBe('none');
});

// when the navigator online is set to false the download button should be hidden
test('test the download button is hidden when offline', () => {
  global.navigator = {onLine: false};
  downloadVisibility();
  expect($('#download').css('display')).toBe('none');
});

// check if fetchAndAddTiles is triggered
test('test the event listener triggers fetchAndAddTiles', () => {
  global.navigator = {onLine: true};
  eventListener();
  $('#download-btn').click();
  expect(fetchAndAddTiles).toHaveBeenCalled();
});