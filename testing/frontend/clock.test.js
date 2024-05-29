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

// adding jQuery 
const $ = require('jquery');;

// import updateClock() function
const {updateClock, interval} = require('../../src/scripts/clock');

// clear the waiting time after each run
afterEach(() => {
  clearInterval(interval);
});

test('test initial clock value', () => {
  // get the current date
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, "0");
  const minute = now.getMinutes().toString().padStart(2, "0");

  // update the clock and test if the time is the same as the current time
  updateClock();
  expect($('#clock').text()).toBe(`${hour} : ${minute}`);
});