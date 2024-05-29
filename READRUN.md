### Proof of concept

---

The proof of concept programs can be found in: PROJECT/docs/Proof Of Concept

Step 1:
For running the following proof of concept programs a server needs to run, the easiest way is to add extension 'Live Server' from Visual Studio code as shown below:
![Live server extension](/PROJECT/docs/Proof%20Of%20Concept/resources/liveServer.jpg)

Step 2:
To run each proof of concept with the live server, select each proof of concept _.html_ file using live server as shown below.
![Step 2](/PROJECT/docs/Proof%20Of%20Concept/resources/run.png)

Step 3:
Close the live server
![Step 3](/PROJECT/docs/Proof%20Of%20Concept/resources/close%20server.png)

Step 4:
Offline functionality in the browser - Google Chrome
![Step 4](/PROJECT/docs/Proof%20Of%20Concept/resources/dev%20tools%20offline.png)

### Proof of concept programs run

1. Draw Shapes App

   - to use this app simply open the html file drawShapes.html

2. Hello World

   - Execute _Step 2_.
   - To try the offline functionality do _Step 3_ or _Step 4_
   - Refresh the page, and the HTML content should change to red text, and a message informing that you are offline. Is important to note that the message you see when offline will change when you go online to the initial page.

3. HTML5 canvas

   - to run this proof of concept simply open the html file, or do _Step 2_.

4. jQuery

   - to see this minimal proof of concept do _Step 2_.

5. OSM Data

   - to run this proof of concept do _Step 2_. Wait a few seconds and the data will be displayed. To see the data in a cleaner format open developer tools.

6. To Do list

   - to see this program in action do _Step 2_
   - wait a few seconds then go offline by executing either _Step 3_ or _Step 4_. Then refresh the page, now you can use the To Do list application offline.
   - play around by adding tasks, click the radius button next to the task, edit the task by clicking on the task text

7. Web Storage
   This is only an exercise, the program does not have much functionality. You can view it by executing _Step 2_.



### Project run
---

To run the project there are a few requirements:

1. Open the folder AndreeaGardelean.final in an editor of your choice.

2. Initiate two terminals
- Terminal 1: navigate to the root directory of the project by executing ```cd PROJECT```
- Terminal 2: access the scripts directory within the project by executing ```cd PROJECT/src/scripts```

3. Install dependencies
- Within Terminal 1 install essential project dependencies by running the command:```npm install``` 
   Note: If using a different package manager, such as yarn, substitute npm with yarn

4. Launch tile server
- After installing dependencies, in Terminal 2 run the command: ```node tileserver.js```
This command initiates the tile server for serving map tiles.

5. Run the application
- Return to Terminal 1 and trigger the application by running the command: ```npm run preview```

6. Access the application
- The application will be available at http://localhost:4173/
For visual demonstration of the above steps, refer to the following demonstration video.

- Alternatively, the application can be accessed over the web at the following URL:
https://offline-map-2o39.onrender.com/.
61


### Tests run

1. Open a terminal and navigate to the tests directory:  ```cd PROJECT/src/testing```

2. To run test written in Jest run the command ```npx jest```

2. To run service worker tests open the file *serviceWorkerTest.html* from the directory *PROJECT/src/testing/service-worker* with live server (see Step 2 above)