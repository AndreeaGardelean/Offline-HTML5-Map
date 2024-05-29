const cacheName = 'offline-map-cache';
/**
 * Adds an install event listener to the service worker.
 * When the service worker is installing a cache will be opened and
 * necessary assets to make the map work offline are cached one by one.
 */
self.addEventListener("install", (event) => {
  self.skipWaiting();
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
          
            // fetch the file paths
            return fetch('./json/files.json').then(response => response.json())
            .then(async (files) => {
              console.log('caching files: ', files);
							// cache each file one by one
							const cachePromises = files.map(async (file) => {
              	try {
                	const response = await fetch(file);
                  if (!response.ok) {
                    throw new Error(`Failed to fetch ${file}`);
                  }
                  await cache.put(file, response);
                } catch (error) {
                  console.error(`Error caching ${file}:`, error);
                }
              });
            	await Promise.all(cachePromises);
            }).catch((error) => {
              console.log('error whilst fetching file paths: ', error);
            })
        })
    );
});

/**
 * Add service worker fetch event listener.
 * The service worker will intercept the resource requests and return the resource from the cache.
 * If not in the cache then fill fallback to the network and add the missing resource to the cache.
 *  If network is offline will return nothing.
 */
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes('/data/tiles') || 
      event.request.url.includes('/offline/tiles') ||
      event.request.url.includes('/registerServiceWorker.js')) {
    return;
  }
  event.respondWith(
    caches.open(cacheName).then((cache) => {
			// get requested asset from cache
      return cache.match(event.request.url).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
				// fallback to server if asset not in cache
        return fetch(event.request).then((fetchedResponse) => {
					// add missing asset to cache
          cache.put(event.request, fetchedResponse.clone());
          console.log('added missing resource');
          return fetchedResponse;
        })
      })
    })
  );
});