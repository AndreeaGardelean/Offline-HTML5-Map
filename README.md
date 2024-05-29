# Directory structure

### _Documents_ directory
*Documents* folder contain the following documents:
 - AndreeaGardelean.final is the final report
 - app_deploy_url.txt contains URL to YouTube video showing the deployed application running
 - installation_url.txt contains URL to YouTube video showing how to deploy the application locally

### 1. data
  Contains the rendered vector tiles

### 2. dist
  Contains the compiled application for production

### 3. docs
  3.1 Proof Of Concept - contains the following proof of concept programs:
    - Draw shapes in HTML5 canvas application + jQuery
    - HTML5 canvas draw clock and different shapes
    - Hello World offline app
    - Display OSM data in raw format
    - To Do List offline app using Indexed DB
    - Web Storage basic example
    - jQuery examples
  
  3.2 Reports - contains the following reports:
    - Advanced technologies
    - Basic web page development
    - Developing offline HTML5 apps
    - Image vs raster tile maps 
  Note: these reports are only a draft, the final reports can be found in the final report in _Documents_ directory

  TO run the proof of concept programs please read *READRUN.md* in PROJECT directory

### 4. public
  4.1 icons
  - contains the icons used in the app
  
  4.2 json
  - contains json files such as application manifest, map style from https://github.com/openmaptiles/maptiler-basic-gl-style, and pre-cached files for service worker

  _serviceWorker.js_ file contains the service worker script


### 5. src
  5.1 scripts
  Contains JavaScript scripts

  5.2 styles
  Contains css styles for the application

### 6. testing
  Contains tests for the app
  6.1 database - tests for IndexedDB

  6.2 frontend - tests for front-end components

  6.3 service-worker - tests for service worker registration and caching

#### Diary1.md
  - Term 1 diary, containing progress notes

#### Diary2.md
  - Term 2 diary, containing progress notes

#### index.html
 - the main page written in HTML

#### READRUN.md
  - instructions to run the application and proof of concept programs

#### vite.config.js
  - service worker and manifest configurations for vite-pwa pugin
