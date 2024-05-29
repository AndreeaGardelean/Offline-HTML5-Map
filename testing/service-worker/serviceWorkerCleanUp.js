window.__testCleanup = () => {

  // unregister all service workers
  const unregisterSW = async () => {
    return navigator.serviceWorker.getRegistrations().then((registrations) => {
      const unregisterPromise = registrations.map((registration) => {
        return registration.unregister();
      });
      return Promise.all(unregisterPromise)
    });
  };

  // remove all opened caches after testing
  const clearCaches = async () => {
    return window.caches.keys().then((cache) => {
      return Promise.all(cache.map((cache) => {
        return window.caches.delete(cache);
      }));
    });
  };

  return Promise.all([
    unregisterSW(),
    clearCaches(),
  ]);
};