self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("ToDo-cache").then((cache) => {
      return cache.addAll(["ToDo.js", "ToDo.html", "ToDo.css"])
    })
  )
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  );
});