// retieve reference to the canvas
const canvas = document.getElementById("canvas"); 

// next we need to check if if the html contains a canvas context
// check if canvas is supported by the browser
if (!canvas || !canvas.getContext) {
  console.log("getContext() does not exist for your canvas.");
};

// get 2d context reference for the canvas
const context = canvas.getContext('2d');

const drawText = () => {
  // set text color
  context.fillStyle = "#000000";

  // set text font and size
  context.font = "20px Sans-Serif";

  // set vertical alignment of text
  context.textBaseline = "top";

  // print out the text on the canvas
  // 195 - x position
  // 80 - y position
  context.fillText("HelloWorld", 195, 80);
};
drawText();

const drawImage = () => {
  // displaying images on the canvas
  // first create an instance of the Image object
  const canvasImage = new Image();

  // listen to the onload event and only draw the image when is loaded
  canvasImage.onload = () => {
    context.drawImage(canvasImage, 10, 500);
    context.drawImage(canvasImage, 10, 500, 200, 200);
    context.drawImage(canvasImage, 900, 800, 1000, 2000, 300, 500, 200, 200);
  };
  canvasImage.src = "../resources/image.jpg";
};
drawImage();

// draw an empty box (outline the canvas)
const drawRect = () => {
  // line color which will be used everywhere on the canvas (except if it has a different visibility scope)
  context.strokeStyle = "#FF0000";

  // colour to fill objects
  context.fillStyle = "#FF0000";

  // create outline of rectangle
  // 0, 0 - x, y values of top left corner
  // 980, 580 - width and height of rectangle
  context.strokeRect(0, 0, 980, 580);

  // create a filled rectangle
  context.fillRect(0, 0, 100, 100);

  // clears the specified area by making the background transparent
  context.clearRect(10, 10, 50, 50);  
};
drawRect();


// PATH
// paths are a method used to draw any shape on a canvas
// a path is a list of points and lines to be drawn between those points
// example of using draw path:
const drawLine = () => {
  // define the colour of the line
  context.strokeStyle = "black";

  // define the width of the line
  context.lineWidth = 10;

  // the line will be drawn by 10x10 squares
  context.lineCap = 'butt';

// the line will be drawn from 10x10 circles
  context.lineCap = "round";
  context.lineJoin = "bevel"

  // a flat edge perpendicular to the edge of the line
  // start a new path
  context.beginPath();
  // define the starting point
  context.moveTo(10, 300);

  // defines the end point
  context.lineTo(181, 300);

  // draw a corner
  context.moveTo(280, 300);
  context.lineTo(280, 400);
  context.moveTo(280, 300);
  context.lineTo(380, 300);

  // draws the line
  context.stroke();

  // close the path
  context.closePath();
};
drawLine();

const drawCircle = () => {
  // context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
  // x-y are the x-y value of the centre of the circle where the circle will be drawn on canvas
  context.beginPath();
  context.lineWidth = 5;
  context.arc(400, 200, 80, 0, (Math.PI/180)*360, false);
  context.stroke();
  context.closePath();
};
drawCircle();

const drawCurve = () => {
  context.beginPath();
  context.lineWidth = 5;

  // defines the starting point of the curve
  context.moveTo(100, 100);

  // create Bezier curve
  // 100, 100 - control point
  // 300, 100 - end point
  context.quadraticCurveTo(300, 320, 300, 100);

  context.stroke();
  context.closePath();
};
drawCurve();