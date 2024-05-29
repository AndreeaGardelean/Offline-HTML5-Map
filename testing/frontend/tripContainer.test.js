require('fake-indexeddb/auto');

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

const {createTripContainer, createStarContainer, tripImages} = require('../../src/scripts/tripContainer.js');

// test if star containers are created correctly
test('test creation of star container', () => {
  const stars = createStarContainer(3);
  const filledStars = stars.find('.star-fill-static.filled');
  const emptyStars = stars.find('.star-fill-static:not(.filled)');
  
  // test if the number of filled and unfilled star classes match
  expect(filledStars.length).toBe(3);
  expect(emptyStars.length).toBe(5 - 3);
});

// test if images are created
test('test images creation', () => {
  const images = ['image1.jpg', 'image2.jpg'];
  const id = 1;

  const tripImagesContainer = tripImages(images, id);

  expect(tripImagesContainer.hasClass('trip-images')).toBe(true);
  expect(tripImagesContainer.find(`.trip-imgs.${id}`).length).toBe(images.length);
  expect(tripImagesContainer.find(`.trip-imgs.${id}`).length).toBe(2);
});

// test if a trip has been created 
test('test trip container contains the correct data', () => {
  const trip = {
    'title': 'Mock trip to London',
    'images': [],
    'rating': 4,
    'address': 'London, UK',
    'description': 'The first trip to UK was to London and was very nice but expensive.'
  }; 
  const id = 1;
  const tripContainer = createTripContainer(trip, id);

  // check the trip details
  expect(tripContainer.hasClass('trip-container')).toBe(true);
  expect(tripContainer.attr('id')).toBe(`trip-${id}`);
  expect(tripContainer.find('.trip-title').text()).toBe(trip.title);
  expect(tripContainer.find('.location').text()).toBe(trip.address);
  expect(tripContainer.find('.description').text()).toBe(trip.description);

  // check the trip rating
  const starContainer = tripContainer.find('.star-container');
  expect(starContainer.children().length).toBe(5);
  expect(starContainer.find('.star-fill-static:not(.filled)').length).toBe(5-trip.rating);
  expect(starContainer.find('.star-fill-static.filled').length).toBe(trip.rating);
});