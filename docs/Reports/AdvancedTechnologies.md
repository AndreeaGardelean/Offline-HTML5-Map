Advanced Technologies
---------------------

### HTML5 Canvas
HTML5 has introduced a new element `<canvas>` which is used to draw graphics and animations on the fly from JavaScript [1][2].
Canvas allows to draw paths, boxes, circles, text and add images [1].
The canvas can be defines as follows: 
```
<canvas id="canvas" width="1000px" height="600px">
```
Must have a width and height defined, a unique id is necessary so that it can be uniquely identified in the JavaScript.
The canvas height and width can be defined in an external CSS file, however this means the canvas sizes are scaled during rendering which might make the final graphics distorted, it is good practice to defines these values inside the canvas element as shown above or in JavaScript [2]. 
This element is not supported by all browser versions, if that is the case a fallback text can be specified in between canvas tags, if canvas is not supported the text will be displayed. An example is shown below:

```
  <canvas id="canvas" width="1000px" height="600px">
    This is a message in between the canvas tags which will appear in the
    browser page only if canvas is not supported by the current browser.
    Thus if you see this message update the browser version you are using.
  </canvas>
```

We can also check if the canvas is supported by the browser, or if a canvas element exists in the HTML, in JavaScript as follows:
```
const canvas = document.getElementById("canvas");

if (!canvas || !canvas.getContext) {
  console.error("Canvas not supported by current browser, or canvas elemnt does not exist in the HTML.");
};
```

Next we need to create a canvas 2D context object which has tools for drawing on the canvas [1]:
```
const context = canvas.getContext('2d');
```
Next we will explore how to draw different shapes on the canvas:
1. Draw text
```
const drawText = () => {
  context.fillStyle = "#000000";
  context.font = "20px Sans-Serif";
  context.fillText("HelloWorld", 195, 80);
};
```
The function above will draw the text 'Hello World' on the canvas, at positon 195 on the x axis and 80 on the y axis, with font size 20. `fillStyle` specifies the colour to be applied to the text.

2. Draw image
  ```
  const drawImage = () => {
    const canvasImage = new Image();

    canvasImage.onload = () => {
      context.drawImage(canvasImage, 10, 500);
      context.drawImage(canvasImage, 10, 500, 200, 300);
      context.drawImage(canvasImage, 900, 800, 1000, 2000, 300, 500, 200, 300);
    };

    canvasImage.src = "path/to/image/source";
    };
  ```
The function above will draw an image on the canvas from local files.
Above are 3 different ways to draw an image:
1. `context.drawImage(canvasImage, 10, 500)`
   This soluton will display the image on the canvas at x position 10 and y position 500
2. `context.drawImage(canvasImage, 10, 500, 200, 200)`
   Draws the image on the canvas at position x-10 and y-500, with width 200 and height 300
3. `context.drawImage(canvasImage, 900, 800, 1000, 2000, 300, 500, 200, 300)`
   This solution will crop the image where 900=x position where to start cropping, 800=y position where to start cropping, 1000=width of the cropped image, 2000=height of the cropped image, 300=x position to place the cropped image, 500=y position to place the cropped image, 200, 300 the width and height of the cropped image on the canvas.

3. Draw rectangular
   ```
  const drawRect = () => {
    context.strokeStyle = "#FF0000";
    context.fillStyle = "#FF0000";

    context.strokeRect(0, 0, 980, 580);
    context.fillRect(0, 0, 100, 100);
    context.clearRect(10, 10, 50, 50);  
  };
  ```
  To draw a rectangular there is a method which allows us to do that easier. `strokeStyle` specifies the colour of the stroke, `fillStyle` specifies the colour to fill the rectangle.
  `strokeRect` will create a rectangle outline (draws a line around the rectangle)
  `fillRect` will create a rectangular which is filled, uses the colour defined by `fillStyle`
  `clearRect` will clear the specified area by making the background transparent. For example this can be used to create a white rectangle inside another of a different colour.

4. Draw circle
```
const drawCircle = () => {
  context.beginPath();
  context.lineWidth = 5;
  context.arc(400, 200, 80, 0, (Math.PI/180)*360, false);
  context.stroke();
  context.closePath();
  };
```
To draw lines on canvas we must begin a path and that is done by `context.beginPath()`, next we can define the width of the line using `lineWidth`.
Next to draw a circle we use `arc()` method which has the following parameters:
`arc(x, y, radius, start, end)`, x,y - position where to place the center of the arc on the canvas, start and end are the angles at which the circle must start and end. We can use this method to draw any arc.

5. Draw lines
```
const drawLine = () => {
  context.strokeStyle = "#000000";
  context.lineWidth = 10;

  context.lineCap = "round";

  context.beginPath();

  context.moveTo(10, 300);
  context.lineTo(181, 300);

  context.stroke();
  context.closePath();
};
```
To draw a line we need to first define the colour of the line by using `strokeStyle`, which accepts a hexadecimal value and a line width using `lineWidth`. These values must be set before `stroke()` is called.
`lineCap` defines the cap style of the line, can be round, butt, or square which is default.
`moveTo()` specifies the staring point of the line, `lineTo()` defines the end point of the line, `stroke()` is used to draw the line from starting to end point.

6. Draw arc
```
const drawCurve = () => {
  context.lineWidth = 5;

  context.beginPath();

  context.moveTo(100, 100);
  context.quadraticCurveTo(300, 320, 300, 100);

  context.stroke();
  context.closePath();
};
```
The function above will draw a quadratic Bezier curve. As previous we can define a line width, colour, then we begin a path to draw. We then define a starting point using `moveTo()` and the method `quadraticCurveTo()` is used to draw the arc. The method has 4 parameters: 300, 200 are the control points which define the curve and 300, 100 are the end points the drawing show stop to.


### jQuery
jQuery is a JavaScript library which makes the interaction between HTML and CSS much easier from JavaScript [3].

jQuery is cross-browser because it provides a set of instructions which are executed in the same way across all browsers [4], in comparison with vanilla JavaScript which is handeled differently across all browsers.

Another important feature is AJAX, which allows to make requests to the server behind the scenes without the need to refresh the page [4].

Can be used to access and manipulate HTML elements in a much simpler way, provides extensive functionality for adding animations and visual effects.


1. Selecting elements

The basic sintax of selecting an element:
`$(selector).action()` where $ is used to define/access jQuery, (selector) is used to find the HTML element, selector is an HTML tag such as class name, id etc., and action() is the action that needs to be performed on the selector, this will take in a function with the necessary steps that need to be taken on the selector.
e.g. 
```
  $('#greeting').text('Hello World');
```
The code above will select an element with id `greeting` and change its text
to 'Hello World'.

There are 3 different ways to select an element, the same as in JavaScript:
```
1 $('p')
  $('body section h1')
2 $('#id')
3 $('.class')
```
1 - select all `<p>` elements, alternatively select the element hierarchical, the second option will select the `<h1>` which is inside a section within the body

2 - select an element by its id value

3 - select an element by its class name

jQuery also provides an easier way to select the first and last `<p>` elements from the document.
```
$(p:first)
$(p:last)
```
Above we have explored only a subset of the differnt ways elements can be selected in jQuery, there is a complete list of different selectors provided in Table 2.1 by [4].

2. jQuery effects

JQuery also provides effects, for example we can hide an element when an event occurs, and then display it again with an slide down effect:
```
  $('#greeting').hide();
  $('#greeting').slideDown("slow");
```
The code above will hide the greeting when the description is clicked and the displays the greeting again with a slide down effect. This can be seen in practice by opening 'jQuery.html' in Proof of Concept folder.

We can also specify a duration the effect should take as a parameter of the effect.

Other effects are: show, toggle, fadeOut, fadeIn, slideUp, slideDown.

We can also add animations, the following code snapshot will dicrease the size of the `<section>` element to 50% over 2 seconds.

```
$('section').animate({
  width:  '50%',
  borderWidth: '10px'
}, 2000);
```

3. jQuery HTML and CSS
As mentioned above jQuery can be used to manipulate HTML elements.

For example we can add new HTML elements:
```
$('<p id="after">insertAfter greeting from jQuery</p>').insertAfter('#greeting');
$('<p>insertBefore greeting from jQuery</p>').insertBefore('#greeting');
```
Above 2 new `<p>` elements have been added using `insertAfter()` and `insertBefore()`, functions which add the new element after or before a specified element. Above the 2 new elements are inserted before and after the greeting.

We can also update the color of an element directly from jQuery.

Given the already defined css style for a class:
```
  .newStyle {
    color: red;
    font-size: 20px;
  }

  .style2 {
    color: green;
  }
```
We can apply it to an element as follow:
```
$('p').toggleClass('newStyle');
$('#after').toggleClass('style2');
$('p:last').css({ "font-size": "40px", "color": "orange" });
```

`toggleClass()` will add the specified class to the selected element or remove it if already exists. Adding the new class, for which we already have a styling it will automatically apply the style to it.

Can also use `addClass()` to add a class to the element instead of toggling it.

Lastly, we can apply any styling to the element using `.css()` method, in the above example we select the last `<p>` element and apply the styling defined inside the brackets.

4. Event handlers
Event listeners are an important aspect of web development, allows us to respond to user interactions. jQuery provides a set of tools to implement responses to these events.

In jQuery we need to connect an event to an event handler, and when the event occurs the the handler will execute.
First we need to bind an element to an event handler, for this `on()` is used, this function takes in 3 parameters: event, data and handler function, where data parameter is optional [4].

```
$('#description').on('click ', () => {
  $('#greeting').hide();
  $('#greeting').slideDown("slow");
});
```
Some of the possible events are: click, blur, mouseleave, select, load, resize, scroll amongst others.

Multiple event handlers can be bind to an element, and we can use a shortcut to do so, we do not necessarily have to use `on()` function but we can use the event itlsef as the binder and folows:

```
$('#description').mouseenter(() => {
  $('#description').css('color', 'purple');
});

$('#description').mouseleave(() => {
  $('#description').css('color', 'orange');
});
```

Lastly, we can use `off()` to remove an event handler for a specified element:
```
$('#description').off('click');
```

HTML canvas is a powerful tools which allows us to draw graphical elements from JavaScript while jQuery allow to create a better user experience.

### References 

[1] W3 Schools. HTML Canvas [Online]. Available: https://www.w3schools.com/html/html5_canvas.asp

[2] MDN Web Docs (27/11/2023). The Graphics Canvas element [Online] https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas

[3] W3 Schools. jQuery Introduction [Online]. Available: https://www.w3schools.com/jquery/jquery_intro.asp

[4] S. Holzner. (Jun 2009). Visual QuickStart Guide; jQuery [Online].
Available: https://learning.oreilly.com/library/view/jquery-visual-quickstart/9780321679673/ch01.html