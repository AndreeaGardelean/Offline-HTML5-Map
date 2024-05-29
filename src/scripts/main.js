/**
 * Function for registering the service worker.
 * Update the service worker when online.
 */
const registerServiceWorker = async () => {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker
				.register('./serviceWorker.js')
				.then((registration) => {
					console.log('Service worker registered with scope: ', registration.scope);
				})
				.catch((error) => {
					console.log('Service worker registration failed: ', error);
				});
		});
	} else {
		console.log('service worker not supported');
	}
};

registerServiceWorker();
