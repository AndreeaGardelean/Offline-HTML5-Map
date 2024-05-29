 window.__waitForSWState = (registration, state) => {
  return new Promise((resolve, reject) => {
      let serviceWorker = registration.installing;

      if (!serviceWorker) {
        return reject('The service worker is not installing!');
      }

      const stateListener = (event) => {
        if(event.target.state === state) {
          serviceWorker.removeEventListener('statechange', stateListener);
          return resolve('Service worker registered');
        }

        if (event.state === 'redundant') {
          serviceWorker.removeEventListener('statechange', stateListener);
          return reject("Installing service became redundant");
        }
      };
      serviceWorker.addEventListener('statechange', stateListener);
  });
};