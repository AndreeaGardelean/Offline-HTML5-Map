/**
 * Inspiration to draw a clock in HTML5 canvas was taken from W3Schools
 * https://www.w3schools.com/graphics/canvas_clock.asp
 */
const canvas = document.getElementById("canvas");
if (!canvas || !canvas.getContext) {
  console.error("Canvas not supported by current browser");
};

const context = canvas.getContext('2d');
context.fillStyle = '#000000';
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const radius = canvasHeight / 2;
  
const drawOutline = () => {
  context.beginPath();
  context.lineWidth = 3;
  context.arc(canvasWidth / 2, canvasHeight / 2, 250, (Math.PI / 180) * 0, (Math.PI / 180) * 360, true);
  context.stroke();
  context.closePath();
};


const drawInnerCircle = () => {
  context.beginPath();
  context.lineWidth = 5;
  context.arc(canvasWidth / 2, canvasHeight / 2, 20, (Math.PI / 180) * 0, (Math.PI / 180) * 360, true);
  context.fill();
  context.stroke();
  context.closePath();
};

const drawSecondsPointer = () => {
  const now = new Date();
  let seconds = now.getSeconds();
  const secondsAngle = -Math.PI / 2 + (seconds) * (2 * Math.PI / 60);

  const xs = 500 + 250 * Math.cos(secondsAngle) * 0.75;
  const ys = 300 + 250 * Math.sin(secondsAngle)* 0.75;
  
  context.beginPath();
  context.lineWidth = 5;
  context.lineCap = "round";
  context.moveTo(canvasWidth / 2, canvasHeight / 2,);
  context.lineTo(xs, ys);
  context.stroke();
  context.closePath();
};


const drawMinutesPointer = () => {
  const now = new Date();
  const minutes = now.getMinutes();
  const minutesAngle = -Math.PI / 2 + (minutes + now.getSeconds() / 60) * (2 * Math.PI / 60);
  const xs = 500 + 250 * Math.cos(minutesAngle) * 0.65;
  const ys = 300 + 250 * Math.sin(minutesAngle) * 0.65;
  
  context.beginPath();
  context.lineWidth = 10;
  context.lineCap = "round";
  context.moveTo(canvasWidth / 2, canvasHeight / 2);
  context.lineTo(xs, ys);
  context.stroke();
  context.closePath();
};

const drawHoursPointer = () => {
  const now = new Date();
  const hours = now.getHours();
  const hoursAngle = -Math.PI / 2 + (hours % 12 + now.getMinutes() / 60 + now.getSeconds() / 3600) * (2 * Math.PI / 12);
  const xs = 500 + 240 * Math.cos(hoursAngle) * 0.50;
  const ys = 300 + 240 * Math.sin(hoursAngle) * 0.50;

  context.beginPath();
  context.lineWidth = 10;
  context.lineCap = "round";
  context.moveTo(canvasWidth / 2, canvasHeight / 2,);
  context.lineTo(xs, ys);
  context.stroke();
  context.closePath();
};

const drawNumbers = () => {
  context.beginPath();
  context.font = "30px Sans-Serif";
  const radius = 220;
  for (var i = 1; i < 13; i++) {
    let ang = ((2 * Math.PI) / 12) * i + (-Math.PI / 2);
    const x = 490 + radius * Math.cos(ang);
    const y = 410 + radius * Math.sin(ang);
    context.fillText(i.toString(), x, y);
  };
  context.stroke();
};

const drawClock = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawOutline();
  drawInnerCircle();
  drawNumbers();
  drawSecondsPointer();
  drawMinutesPointer();
  drawHoursPointer();
};

setInterval(drawClock, 1000);