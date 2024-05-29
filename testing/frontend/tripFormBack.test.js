// mock DOM object
import { JSDOM } from "jsdom";
import fs from "fs";

// read the HTML file 
var html = fs.readFileSync("../index.html", "utf-8");
// replace lines which import css from the HTML
html = html.replace(/@import.*;/g, '');
// set the DOM contents to the HTML
const dom = new JSDOM(html);

// mock document and window objects
global.document = dom.window.document;
global.window = dom.window;
global.navigator = {onLine: true}

// adding jQuery 
const $ = require('jquery');

const {eventListener} = require('../../src/scripts/tripFormBack.js');

// test that when the back button on the trips form shows and hides the expected items
test('test the behavior of the back button from the trip form', () => {
  eventListener();
  $('#trip-back').trigger('click');

  // check the form has been reset
  expect($('#title').val()).toBe('');
  expect($('#address').val()).toBe('');
  expect($('#description').val()).toBe('');

  // check the image names have been deleted
  expect($('#image-container p.filename').length).toBe(0);

  expect($('#add-place-form').css('display')).toBe('none');
  expect($('#trip-back').css('display')).toBe('none');
  expect($('#visited-places').css('display')).not.toBe('none');
  expect($('#attractions-container').css('display')).not.toBe('none');
});