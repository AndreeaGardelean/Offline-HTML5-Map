# Developing an Offline HTML5 application Report

## Service Workers
A service worker is a JavaScript script which can be registered to control one or more pages of an web application [1]. 
The Service Worker can listen to different events comming from the registered pages, and is able to intercept and modify these events, modify and customise the responses to these events [2].

Lifetime of a service worker:
1. Installing
2. Activating
3. Activated
   
First lets delve into how to register a Service Worker: 

```const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    serviceWorker.register
    navigator.serviceWorker.register("./serviceWorker.js")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      }).catch((error) => {
        console.log("Service worker registration failed:", error);
      });
  };
};
```

First we define an async function to register a service worker. The function is asynchronous because registering a service worker might take some time and we do not want to block other processes from running.
The if statement will check if the current browser supports service workers, if it does then 
```
navigator.serviceWorker.register()
``` 
is called with 1 argument, the path to the service worker script.
The `register()`
returns a promise. If the Service Worker has been registered successfully then the promise is fullfilled and `then` 
statement is executed, printing the scope of the Service Worker. If the Service Worker has not been registered an error occurred and the catch block is executed, printing an error message on the console.

Once the Service Worker has been registered we can now go into more depth about the Service Worker script.
Above we have mentioned 
```
navigator.serviceWorker.register("./serviceWorker.js")
```
where serviceWorker.js is a service worker script, this file contains event listeners the service worker should listen to.
A simple example of a script is:
```
self.addEventListener("fetch", (event) => {
  console.log("Fetch request for: ", event.request.url);
});
```

Here we add an event listener to the service worker which should listen to 'fetch' events. When such event occurs the given function is executed, in this case 
```
(event) => {
  console.log("Fetch request for: ", event.request.url);
};
```
The function will simply print a message in the console containing the URL of the file that was being asked to fetch. Here is where the Service Worker comes into play, and it can be programmed to do anything. 
For example take the following event listener:
```
self.addEventListner("fetch", (event) => {
  if (event.request.url.contains("page.css")) {
    event.respondWith (
      new Response ("div {background-color: 'red'}", 
        {headers: {"Content-Type" : "text/css"}})
    )
  }
});
``` 
The code above does the following: adds an event listener which makes the service worker listen to all fetch requests that pass through, it then checks if the request URL for the file contains "page.css", which is a file containing some css for the current page. If it does then instead of returning the file we return something else, in the case above we simply return css for changing the background colour of all divs for that page. Now this is just a simple example of what the Service Worker can do. We will see more of the potential it has in the following section.

Note: as we have seen the aervice worker can intercept requests, modify or replace response contents. To protect users and prevent man-in-the-middle attacks, only pages served over HTTPS can register a Service Worker [3].

## Cache API
Cache is a new type of caching layer that is completely under the developer's control [4]. Cache API provides persistent storage for requests and response objects in the browser.
We can use the cache to store files or other assets necessary for the web page to work offline [4].

In the examples above the service worker was already activated when it was listenting to the fetch requests, but we can also make the service worker listen to events before is active. We will use this to our advantage, and cache the necessary assets in between these events.

The service worker has an `install` event, which happens once in the lifetime of each service worker, right after it is registered and before is activated [5]. By listening to this event we have found the perfect time to cache the necessary assets.

Let's add an install event listener:
```
self.addEventListner("install", (event) => {
  event.waitUntil(
    caches.open("new-cache").then((cache) => {
      return cache.add("/asset1.html");
    })
  );
});
```

To break down the contents of the event listner above: `waitUntil()`
is used to extend the lifetime of the install event of the service worker until the function that is passed as argument is completed.

`caches.open("new-cache")`
is used to create and return a new cache with the given name, or if a cache with the given name already exists will open it and return.

When the above step is complete a cache object wrapped in a promise is returned, we use `.then` to access the returned response.

```
cache.add(/asset1.html)
```
adds the file `asset1.html` to the cache.

To retrieve a file from the cache the following part comes into play:
```
self.addEventListner("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() {
      return caches.match("/asset1.html");
    })
  );
});
```
A new event listener is created to listen to the fetch events that pass through. If the fetching the file from the server failed then this is caught by the service worker and send the requested file from the cache if it has been cached. This feature allows us to run an application offline when no internet connection is available. 

There is no need to check if the file exists in the cache because the installation of the service worker depends on the caching of the file, this is if we specified this file to be cached.

## Indexed DB
This section will explore how IndexedDB works. 
Whilst learning about IndexedDB I have used the following resource [6], in this section I am explaining what IndexedDB is, how it can be used based on the material learned from the above source.

IndexedDB is a transactional database where data is stored in the browser on client-side rather than a remote server, this allows offline data access. IndexedDB is transactionl, meaning that the transactions within a transaction either all fail or all succeed. IndexedDB is a NoSQL database meaning that data is stored in key-pair values, similar to JSON, and is indexed allowing easy data retrieving by indeces/keys.

In IndexedDB we can create multiple databases, each database can contain multiple object stores (these are similar to tables in SQL), each object store usually contains one data types, and contains key-value pairs.

An important aspect is that databases are versioned, if you want to create a new object store or modify an existing one you need to open a database connection with a new version number.

Let's have a look at some tasks that can be perfomed in IndexedDB:

### Creating/Opening a database 
First we need to create a database, and a connection which is done in the function below:

```
1 const openDatabase = () => {
2  const request = window.indexedDB.open(dbName, dbVersion);
3
4  request.onerror = (event) => {
5  console.error("Database error: ", event.target.error);
6  };
7
8  request.onsuccess = (event) => {
9    console.log("Database opened successfully!");
10  };
11
12  request.onupgradeneeded = (event) => {
13    const db = event.target.result;
14    const objectStore = db.createObjectStore("tasks",
15      { keyPath: "id", autoIncrement: true }
16    );
17
18    objectStore.createIndex("name", "name", { unique: false });
19    console.log("Database upgraded successfully");
20  };
21 };
```
Let's disect the function and see what it does, the code will be analysed line by line:

2 - Here a request to open a database is made, it does not return a database connection but a request to open a datatabse connection and we can listen to events on this request as seen above.

4:6- if an error occured during the request, an `onerror` event will be triggered and an error message will be printed

8:10 - event will be trigerred if the request was fulfilled

12:20 - The event declared here is triggered when the database version is upgraded to a higher version, the browser will detect this change and trigger an upgrade needed event. We can now modify the database when an upgrade happens by listening to the above event.

### Storing items into database
Below is the complete function for adding an item to the database.
Note: in practice we always listen to `onerror` and `onsuccess` events happening on the objectStore, this gives us information on a particular request. For the example below they have been removed.

```
1 const addItem = () => {
2  const task = { name : "Buy milk" };
3
4  const transaction = db.transaction(["tasks"], "readwrite");
5  const objectStore = transaction.objectStore("tasks");
6  const addItem = objectStore.add(task);
7 };
```

4 - creates a new transaction which operates on the object store "tasks" with a read-write scope, allowing to read from the object store and write through this connection.

5 - creates a reference to the object store "tasks" from within the transaction, allowing to perform different tasks on the object store.

The event handlers below are for the transaction, this occurs when a transaction is completed successfully or fails. It is good practice to listen to these events because it gives us a high-level overview of what happens in the database. For the following examples these events have been removed for simplicity.
```
transaction.oncomplete
```
and
```
transaction.onerror
```

### Reading items from database
Reading items from database requires to open a transaction and a connection to the object store we want to read. 
Below is a complete function for reading data from database.
```
1 const readTasks = () => {
2  const transaction = db.transaction(["tasks"], "readonly");
3  const objectStore = transaction.objectStore("tasks");
4  const getAllData = objectStore.getAll();
5
6  getAllData.onsuccess = (event) => {
7    const tasks = event.target.result;
8    console.log("Tasks retieved from db: ", tasks);
9
10    tasks.forEach((task) => {
11      console.log(task);
12    })
13  };
14
15  getAllData.onerror = (event) => {
16    console.error("Error retrieving tasks: ", event.target.error);
17  };
18 };
```

4 - retrieves all the data from the object store and store it in the variable getAllData.

We can then listen to events happening on variable.

6:13 - when listening to the event `onsuccess` we can itterate through the collection of records from the object store and print each record individually or perform any task with that information.

### Deleting items from database
Below is a complete function for deleting an item from the database.
We create a `deleteRequest` on the object store, to delete the record with the given taskId, which is a unique key.
We can then listen to events happening on the request, this inform us if the request has been successful or not.
```
1 const deleteTaskFromDB = (taskId) => {
2  const transaction = db.transaction(["tasks"], "readwrite");
3  const objectStore = transaction.objectStore("tasks");
4  const deleteRequest = objectStore.delete(taskId);
5
6  deleteRequest.onsuccess = (event) => {
7    console.log("Task deleted successfully!")
8  };
9
10  deleteRequest.onerror = (event) => {
11    console.error("Error while deleting task: ", event.target.error);
12  };
13 };
```

As shown previously we need to open a database and object store connection (2:3) 
4 -  we can use `delete(key)` to delete the entry with the given unique id.

### Updating items in database
Below is a complete function for updating an item in the database.
Again, we start by creating a connection to the object store, we then prepare the item we want to update and then create a request to update the item. 
The method `put` is used, because taskID is unique, this will update the record with the given id.
```
const updateDB = (newValue, itemID) => {
  const transaction = db.transaction(["tasks"], "readwrite");
  const objectStore = transaction.objectStore("tasks");

  const updatedTask = { name: newValue, id: itemID }
  const updateRequest = objectStore.put(updatedTask);

  updateRequest.onsuccess = () => {
    console.log("Task updated!");
  };

  updateRequest.onerror = (event) => {
    console.error("Task could not be updated: ", event.target.error)
  };
};
``````

## Web storage
Web storage is an API which allows to securely store key/value pairs in the browser [7]. Web storage API is a more secure approach than cookies, the data stored in the browser is stored securely locally, can store large amount of data (5MB) without performance issues, and information is never transfered to the browser [8]. The information stored in the web storage is accessible to all pages from the same origin [8].

Web storage provides 2 ways of storing objects in the browser:

1. Session storage
  Maintains a storage area for the current web page, which is available as long as the web browser tab is open, the data persists even if the page reloads. The data stored here only persists while the current tab is open, when the tab is closed all data will be deleted. The data stored in the session storage is never sent to the server [9].
  The session storage is accessible through the window object as: `window.sessionStorage`

1. Local storage 
    Local storage has the same behaviour as the session storage, the only difference is that the data stored for a given session persists even after the browser or tab for a given page is closed and reopened. The data has no expiration date, and the only way to delete the information form local storage is through JavaScript, or clearing the browser cache [9].
    The local storage is accessible through the window storage as well: `window.localStorage`

In the following example we will use session storage to show how these functionalities work, local storage workd in the exact same way, the only difference is using localStorage or sessionStorage to store and access the data.

It is important to note that not all web browsers support local and session storage. To ensure no errors occur whilst using them we can check if the browser supports them as follows:

```
if (window.sessionStorage !== 'undefined') {
  console.log("Local storage supported the browser");
} else {
  console.log("Local storage not supported by the browser.");
}
```

If the session storage is supported we can start using it.
Below we will use the full functionality of sessionStorage:

```
1 if (window.sessionStorage !== 'undefined') {
2  console.log("Local storage supported the browser");
3
4  const now = new Date();
5  const year = now.getFullYear().toString().padStart(2, "0");
6
7  sessionStorage.setItem("surname", "Smith");
8  sessionStorage.setItem('year', year)
9
10  const greeting = `Hello ${sessionStorage.getItem('surname')}`;
11
12  const element = document.getElementById('greeting');
13  element.innerHTML = greeting;
14
15  sessionStorage.removeItem("surname");
16  sessionStorage.clear();
17 } else {
18  console.log("Local storage not supported by the browser.");
19 };
```

In the code above the following happen:
1 - we check if session storage is supported by the browser
7:8 - add a new key-value pair to the storage where the key is 'name' and value is 'Smith' and 'year' and current year
10 - we then retieve the value with key 'name' from the session storage and use it to create a custom greeting which is the displayed on the HTML page
15 - to remove an item from the session storage we use `removeItem` function, which will remove an entry with the given key
16 - alternativelly if we want to delete all the entries in the session storage we use `clear()` method

We can also use dev tools provided by the browser to check what items are stored in the web storage as seen below:

![](resources/../../Proof%20Of%20Concept/resources/devTools.jpg)

Web storage is particullarly helpful when we want to store values which are used by multiple pages often, this will provide a quick and secure response, without the need of making server requests often.


## References

[1] T. Ater. (2017, Sep). Building Progressive Web Apps: Bringing the
Power of Native to the Browser, 1st ed. Sebastopol, CA: O’Reilly Media, 2017. [Online]. Available:https://learning.oreilly.com/library/view/building-progressive-web

[2] T. Ater. (2017, Sep). Building Progressive Web Apps: Bringing the
Power of Native to the Browser, 1st ed. Sebastopol, CA: O’Reilly Media, 2017. [Online]. Available:https://learning.oreilly.com/library/view/building-progressive-web

[3] T. Ater. (2017, Sep). Building Progressive Web Apps: Bringing the
Power of Native to the Browser, ('HTTPS and Service Workers') 1st ed. Sebastopol, CA: O’Reilly Media, 2017. [Online]. 
Available:https://learning.oreilly.com/library/view/building-progressive-web

[4] T. Ater. (2017, Sep). Building Progressive Web Apps: Bringing the
Power of Native to the Browser, ('What CacheStorage Is and, More Importantly, What It Is Not') 1st ed. Sebastopol, CA: O’Reilly Media, 2017. [Online]. Available:https://learning.oreilly.com/library/view/building-progressive-web

[5] T. Ater. (2017, Sep). Building Progressive Web Apps: Bringing the
Power of Native to the Browser, ('Deciding When to Cache') 1st ed. Sebastopol, CA: O’Reilly Media, 2017. [Online]. Available:https://learning.oreilly.com/library/view/building-progressive-web

[6] T. Ater. (2017, Sep). Building Progressive Web Apps: Bringing the
Power of Native to the Browser, ('Storing Data Locally With IndexedDB') 1st ed. Sebastopol, CA: O’Reilly Media, 2017. [Online]. Available:https://learning.oreilly.com/library/view/building-progressive-web

[7] MDN Web Docs (07/07/2023). Using the Web Storage API [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API

[8] W3 Schools. HTML Web Storage API [Online]. Available: https://www.w3schools.com/html/html5_webstorage.asp

[9] MDN Web Docs (26/05/2023). Web Storage API [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API