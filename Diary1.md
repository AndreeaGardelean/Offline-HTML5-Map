**08/10/2023**

  Studied service workers and cache, implemented service workers and cache by completing proof of concept program 'Hello World' which stored an HTML document in the cache and worked while offline.

**10/10/2023**

  Studied IndexedDB, completed 'To-do list' proof of concept which opens a database in the browser has the following functionalities:
  - input field to add item 
  - add task to IndexedDB when user clicks 'Add' button 
  - display newly added task on the page 
  - retrieve all tasks from the database and display on screen when page loads 
  - remove task from database when the radius button is selected 
  - remove task from screen when radius button is selected 

**11/10/2023**

  Finalised To-do proof of concept: 
  - added CSS styling 
  - when task is selected allow user to edit task 
  - when user clicks outside task text after it was focused the task will update in database and on the page <br>
  This program followed PWA methodology and provides offline capabilities by using service workers and cache, and has a manifest which allows to add the application to the home screen.

**17/10/2023**

  - Studied HTML5 canvas and its functionalities. <br>
  - Created a clock using HTML5 canvas which displays the current time and moves the seconds, minutes and hour pointers in real time.
  - Completed "Display OSM data in raw format" proof of concept, which retrieves the UK city names using Overpass API for retrieving the data over the web and Overpass QL (Query Language) to create a query for retrieving the data. The data is the displayed on the HTML document. 
  - Set up project file structure - divided the project in client-side and server-side files. 
  - Set-up the retrieval of OSM data via Overpass API functionality in server side with Node.js, also create a Node.js to run the application. 

**23-29/10/2023**

  - Studied how to create vector tiles and I have used OpenMapTiles to generate the tiles for London and England.
  - Studied how to host vector tiles, set up tilserver-gl to host the tiles using a docker container. 
  - Displayed the vector tile on the HTML page using leaflet with VectorGrid plugin, the map was displayed without styling, the data was displayed with blue lines. 
  - Tried displaying the map using other plugins but unsuccessful because most of them required to use MapTiler and Mapbox and did not align with my prerequisites. 

**1/11/2023**

  - added map styling by hand for testing 
  - added styling created by OpenMapTiles in styles.json file 
  - Tried to add map styling from style.json file in leaflet but was unsuccessful and after some research I have found that leaflet does  not provide such functionality and the styling had to be manually defined. 

  -  have done some research on other libraries and I have found OpenLayers and decided to work with this library instead. This has caused some changes to the project, the Node.js I have created was no longer practical in this case because I had issues whilst importing modules in JavaScript which were necessary for running the application. 
  - I have decided to use Vite as a server and run the server using npm. 

  - I have also decided to re-structure the file system and ordered the files based on their extension rather than functionality. This has helped me in identifying were the files are in the project.

**5/11/2023**

  - Added manifest.json to allow app download, created and registered service worker for offline functionality and added assets to cache. 
  - enabled geolocation to locate user 
  - a red circle is drawn where the user's location is 
  - updated worker to fetch assets from cache only when server is offline

**9/11/2023**

  - calculated the location dot size dynamically based on zoom level 
  - added map layers dinamically 
  - using watchPosition() for location user, this way the map can get updates as the user's location updates 
  - when the user location is identified the map will be focused on the user's location 
  - changed pointer color to green 
  - added clock on the right side panel 
  - created a basic compass using HTML canvas

**10/11/2023**

  - opened IndexedDB database for storing map data 
  - added credits to the map for using OpenStreetMap and OpenMapTiles as specified by the tools 
  - added service worker tests using mocha

**14/11/2023**

  Updated "Display raw OSM data" proof of concept to retrieve data for museums from London, this provided a better understanding of the data OSM provides.

**16/11/2023**

  Updated HTML5 canvas proof of concept to allow the user to draw on the canvas. I have miss-understood the ask and created a static application which displays a clock, which was drawn on canvas.

**17/11/2023**

  Updated compass on the right side panel. Added a window event listener for device orientation, which will rotate the pointer of the compass as the user's device orientation changes. This feature is only supported by devices which have an orientation sensor.

**21/11/2023**

  Documented how to store vector tiles in IndexedDB, and decided to convert the map data in GeoJSON format which can then be stored in the browser. This functionality requires to create my own SQLite vector tile server. The user will have the ability to download a chosen area using a download button.

**23/11/2023**

  - Created a download button to download map data. 
  - Researched how database indexing works 
  - Added a search bar to allow user to search for location or other data 
  - Added event listener to the search bar for when the user clicks on the search icon or presses the key 'Enter' 
  - converted pbf data format to GeoJSON and tried to render the GeoJSON data with openLayers but did not work. <br>
  I am exploring ways on how I can save the vector map data to IndexedDB, and since JSON is key-value ordered it would make it the appropriate format for storing it in IndexedDB

**01/12/2023**
- updated the side panel to be collapsible using a button - this was achieved using jQuery
- created a 'proof-of-concept' for rendering GeoJSON format of the map using OpenLayers
- resolved typo in 'deviceorientation' event listener
- when the compass pointer is redrawn when angle changes the image is first cleared before drawing again
- created object stores in IndexedDB for each zoom level - each object store will store the tiles at the respective zoom level