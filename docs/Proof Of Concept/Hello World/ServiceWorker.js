self.addEventListener("install", function (event) {
  console.log('installing srvice worker');
  event.waitUntil(
    caches.open("hello-world-cache").then(function (cache) {
      return cache.add("OfflineHelloWorld.html");
    })
  )
});

// add service worker fetch event listner to listen to fetch requests
self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match("OfflineHelloWorld.html")
    })
  );
});
