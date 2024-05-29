
describe('Service worker suite', () => {

  // beofre each test clear the cache and delete all service workers
  beforeEach(async () => {
    return window.__testCleanup();
  });

  // after each test clear the cache and delete all service workers
  after(() => {
    return window.__testCleanup();
  });

  it('should register a service worker and cache files on install: ', async () => {
    try {
      const registration = await navigator.serviceWorker.register('../../public/serviceWorker.js');
      const swRegistrationResponse = await window.__waitForSWState(registration, 'installed');

      if(swRegistrationResponse === 'Service worker registered') {
        var assets = []

        // fetch the stored assets
        await fetch('http://127.0.0.1:5500/PROJECT/public/json/files.json').then((response) => {
          return response.json();
        }).then((files) => {
          files.forEach(file => {
            const cleanedFilePath = file.replace(/^\.\.\//, '');
            assets.push('/PROJECT/' + cleanedFilePath);
          });
        })
    
        await Promise.all(assets.map(async (asset) => {
          const response = await caches.match(asset);
          if (!response) {
            throw new Error(`No ${'/PROJECT/src/scripts/addNewTrip.js'} was found in the cache!`);
          }
        }));
      }
    } catch (error) {
      console.error('Error during test:', error);
      throw error;
    }
  });
});