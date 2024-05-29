const canvas = document.getElementById("canvas"); 
var flag = false;

if (!canvas || !canvas.getContext) {
  console.log("getContext() does not exist for your canvas.");
};

const context = canvas.getContext('2d');

context.strokeStyle = "black";
context.lineWidth = 5;
context.lineCap = 'butt';

$('canvas').css("border", "1px solid red");

$('#black').on('click', () => {
  context.strokeStyle = "black";
  $('#black').css({ "border": "2px solid red", "width": "40px", "height": "40px" });
});

$('#green').on('click', () => {
  context.strokeStyle = "green";
    $('#green').css({ "border": "2px solid red", "width" : "40px", "height":"40px"});
});

$('#orange').on('click', () => {
  context.strokeStyle = "orange";
  $('#orange').css({ "border": "2px solid red", "width": "40px", "height": "40px" });
});

$('#eraser').on('click', () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

$('canvas').on('mousedown ', (event) => {
  const x = event.clientX;
  const y = event.clientY;

  console.log('mouse down', x, y);

  flag = true;
  context.beginPath();
  context.moveTo(x, y);
});

$('canvas').on('mousemove ', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  console.log('mouse move', x, y);

  if (flag) {
    context.lineTo(x, y);
    context.stroke();
  }
});


$('canvas').on('mouseup ', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  console.log('mouse up', x, y);
  flag = false;
  context.closePath();
});