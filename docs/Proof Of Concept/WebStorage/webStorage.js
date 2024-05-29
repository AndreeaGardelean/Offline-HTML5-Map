if (window.sessionStorage !== 'undefined') {
  console.log("Local storage supported the browser");

  const now = new Date();
  const year = now.getFullYear().toString().padStart(2, "0");

  sessionStorage.setItem("surname", "Smith");
  sessionStorage.setItem('year', year)

  const greeting = `Hello ${sessionStorage.getItem('surname')}`;

  const element = document.getElementById('greeting');
  element.innerHTML = greeting;

  sessionStorage.removeItem("surname");
  sessionStorage.clear();
} else {
  console.log("Local storage not supported by the browser.");
};