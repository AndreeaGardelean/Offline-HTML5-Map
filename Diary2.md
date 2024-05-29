04/01/2024
- set up a tile server using NodeJS to read tiles from the tiles.mbtiles file such that the project no longer relies on the third party tileserver-gl for serving tiles 
- updated vector tile source URL in OpenLayers to connect to the NodeJS tile server for reading the data 
- implemented an endpoint for reading the tiles from tiles.mbtiles using mbtiles library for online use

08/01/2024
- added an event listener for the 'Download' button, allowing users to click it to download map tiles and store them in the database 
- created endpoint for reading tiles for offline use 
- uncompressed the retrieved map tile data and converted it to a Vector tile using the mapbox plugin (for offline use) 
- added vector tiles to IndexedDB for the first 11 zoom levels 

09/01/2024
- bug fix: the tiles are added to the database before the database is open. This was solved by wrapping the openDatabase function in a promise, and the tiles will be added only when the function returned the promise 
- created a function for retrieving map tiles from IndexedDB based on requested coordinates

12/01/2024
- created a custom function to serve as a layer source URL in OpenLayers, to intercept tile requests, enabling retrieval of the requested tile coordinates. The returned URL varies depending on whether the user is online or offline (if online return the server URL, if offline returns the function for retrieving tile from IndexedDB) 
- the tiles would not get rendered because of the error: 'Pbf unimplemented type 4' -- this occurred because the tiles were not stored in the correct format in IndexedDB. Converted the tiles data to an array buffer to check then but still no success
- updated the range of requested tiles for adding to IndexedDB 
- the tiles are no longer unzipped when retrieved form the database for performance issues and it is not necessary 

18/01/2024
- implemented custom tileLoadFunction allowing to customise how the vector tiles are loaded on the map -- allowing to decide the source of the vector tiles based on the internet connectivity 
- updated documentation 
- modified the server endpoint for offline tiles to send to the client the existing tile coordinates from tiles.mbtiles for the specified zoom level 
- changed the approach for requesting tiles for offline access - when the download button is clicked the method fetchAndAddTiles is triggered. Then contacts the offline endpoint of the server returning the coordinates of the existing tiles for the specified zoom level. The client then iterates over the coordinates and requests, from the server, the tiles with the given coordinates. This process will be executed for zoom level 0 to 14. Each returned tile is then added to IndexedDB 
- refactored the method of retrieving the tiles from tiles.mbtiles file, no longer uses the 'mbtiles' library, is manually implemented using sqlite3 library, providing more flexibility and control over how the tile is retrieved 

24/01/2024
- updated application design with a wider side panel and new colour scheme 
- implemented responsive design to ensure scalability across various devices
Re-imagined the application's purpose to enable users to save visited locations on the map. Users can now add photos, descriptions of their experiences, and ratings for each location. Additionally, the application facilitates selecting a location directly by selecting on the map.  

25/01/2024
- implemented 'Locate me' feature -- when the button is clicked the map will zoom in on the user's location. The functionality is not available when offline or geolocation service is unavailable. 
- default focus of the map is London, users are restricted from zooming out beyond the London area 
- bug fix: users cannot zoom the map over zoom level 14 -- if is over 14 the map becomes blank 
- bug fix: when the location is updated the previous location dot on the map is deleted to prevent clutter 
- created a form for users to enter trip information, including the ability to upload images from their device and provide a rating 
- the form is only visible when the 'Add new trip' button is clicked, upon submission the form fields data is retrieved, the form fields are reset, and the form is hidden 

31/01/2024
- created trip container within the panel to display each trip 
- completed front-end design for trip container 
- when an image is uploaded the image name will be displayed in the image picker providing, users the ability to preview their uploads effortlessly

01/02/2024
- upon submission of the trip form, a trip container with the submitted data is created and appended to the panel 
- opened a new IndexedDB database dedicated to storing user trips 
- upon form submission the trip data is added to IndexedDB, when the app loads the trips are retrieved from IndexedDB and displayed in the panel

07/02/2024
- added tests for indexedDB.js, tripIndexedDB.js and tileserver.js 
- refactored functions handling indexedDB to return promises upon completion 
- bug fixe: - when offline the service worker did not render the css -- the issue was fixed by adding an import statement to the index.html file 
- added a progress bar to indicate the progress of the map download

09/02/2024
- bug fix: at level 14 when server requests failed during map download a retry mechanism has been implemented. The failed tile request is retried one more time. 
- If an error occurred when fetching the tile, the service worker would intercept this. Issue fixed by instructing the service worker to ignore requests from the URL containing substring /data/tiles/

12/02/2024
- bug fix: when the location is updated the previous position circle would not get deleted -- this was fixed by separating the position layer from the position update layer 
- implemented trip location pins and integrated them into the map, corresponding to the trip location, this was achieved by:
  - creating a new vector layer to contain the pins 
  - assigned each pin a unique id, which corresponds to the trip's id generated when the item is added to the database
  - when a new trip is created a pin is added to the map -- at the moment the location is hard typed however in the final product the pin will be added to the selected location of the trip 
  - upon pin selection, the pin is highlighted on the map by increasing its size and the trip linked to the pin is also highlighted on the panel by adding a  box shadow to the trip container making it stand out 
  - to ensure only the selected pin and its corresponding trip are highlighted, all the previously highlighted trips are un-highlighted 
- updated functions documentation 
- refactored functions to remove long method smell 
- added a mechanism for selecting trip locations manually by allowing user to click on the map. When the map is clicked, coordinates are captured and a pin is added to that location upon form submission. 

13/02/2024
- enhanced the trip pins with colour coding for easy identification:
    - trips with no rating: black pin 
    - 1 star rated trips: red pin with number one in the center 
    - 2 star rated trips: red-orange pin with number two in the center 
    - 3 star rated trips: orange pin with number three in the center 
    - 4 star rated trips: yellow pin with number four in the center 
    - 5 star rated trips: green pins with number 5 in the center 
- Created a back button on the form allowing the user to go back to the trip panel after entering the trip form 
- added a trash can icon to each trip container, allowing the user to delete the trip from the database and panel 

21/02/2024
- enhanced user interface for mobile mode with the following updates: 
  - implemented touch-based interaction, enabling users to open and close the panel via swipe gestures 
  - upon selecting the  select location button from the form, the panel will close 70%, allowing the user to interact with the map 
  - refactored and extracted code in other functions for reusability 
  - upon selecting the locate me button the panel will be close if open 
  - added a window event listener to enable touch events when the window width is under 700px and removes the event when exceeds  700px such that the panel cannot be dragged up and down when on larger screens 
- the data is added to the database by using put() method, allowing to overwrite existing data in the database 
- if fetching a tile does not go through because of a TypeError the method will retry fetching three more times to prevent an infinite loop and ensure all tiles are available

27/02/2024
- created vector layers for adding attractions to the map
- created a new database for storing attractions
- created 2 layers which hold the attractions museums and internet cafes

28/02/2024 added a button in the panel enabling users to select attractions to see on the map 
- by default, the attractions layers are hidden and when an option is selected the layer corresponding to that option is displayed 
- upon selecting an attraction for display, all other layers are hidden 
- added two more attraction layers -- mall and theaters 
- updated the application from online-first to offline-first behavior 
- regenerated map tiles 
- if the resource requested is not in the cache it will fallback to the network and the missing resource is added to the cache 
  - if it cannot be found in the network it will return nothing 
- download button is hidden when no internet connection is available 
- when a tile does not exist in the IndexedDB is fetched from the server, rendered from the server and added to the IndexedDB
  
02/03/2024
- made small CSS updates 
- checked and updated documentation 
- generated JSDoc 
- refactored code 
- updated folder structure 
- released the application to production using Render 
- updated the panel touch move event 

05/03/2024
- updated service worker to have an update() event which updates the service worker when an internet connection is available 
- map size is updated to cover 70 of screen size when panel is open

06/03/2024
- bug fix: when offline the OpenLayers library is not available and needs to be cached. This was achieved by using PWA Vite plugin which allows to pre-cache all the bundled resources when the service worker is registered 
- updated README.md 
- CSS updates to the form and map 

11/03/2024
- updated service worker tests 
- code format updates 
- the trip is deleted from the panel only after a promise has been returned from IndexedDB that the transaction is successful

18/03/2024
- added download trips button for downloading selected trips in pdf format 
- added an icon for each trip, allowing to select the trip for pdf download

25/03/2024
- when the download button is clicked the information for the trips is retrieved and converted to a pdf

26/03/2024
- the pdf is downloaded after the trips information is retrieved and added to the document
- updated the size of the trip containers in the panel
- updated the size of the form
