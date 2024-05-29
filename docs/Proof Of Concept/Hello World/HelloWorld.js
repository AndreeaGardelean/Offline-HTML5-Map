// Service worker for the app

// method which registers the service worker
// without registering the service worker cannot use its functionality

const registerServiceWorker = async () => {

  // first check if the service worker is supported by the browser
  if ("serviceWorker" in navigator) {
    // if supported register the service worker by calling navigator.serviceWorker.register
    navigator.serviceWorker.register("./ServiceWorker.js")
      // executed if the service worker has been registered successfully
      .then(function (registration) {
        console.log("Service Worker registered with scope:", registration.scope);
      }).catch(function (err) {
        // catch is executed if an error occurred
        console.log("Service worker registration failed:", err);
      });
  }
}

registerServiceWorker();


function updateClock() {
  const now = new Date();
  const timeContainer = document.getElementById("time");

  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');

  timeContainer.textContent = `${hour} : ${minute} : ${second}`
}

setInterval(updateClock, 1000);
updateClock();