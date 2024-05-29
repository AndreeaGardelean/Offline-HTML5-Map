Basic web page development in HTML5: HTML, JavaScript, CSS.
-----------------------------------------------------------

### HTML
-----------------------------------------------------------

HTML stands for HyperText Markdown language, is the building block of web development which defines the structure of the web content.
HTML has a series of elements which are used to define the content, enclose it or make it stand by itself.
HTML5 is the 5th itteration of the technology, which is build on top of other versions of HTML. It introduces new elements, utilities, removed and improved certain functionalities [1]. 

HTML5 is supported by all modern browsers. Below is a basic structure of an HTML file.

#### Basic HTML file structure
```
1     <!DOCTYPE html>
2     <html lang="en">
3       <head>
4         <meta name="Author Name" />
5         <meta charset="UTF-8" />
6         <title>Offline "Hello World"</title>
7         <link rel="stylesheet" type="text/css" href="style.css" />
8         <script src="script.js"></script>
9       </head>
10
11        <body>
12        </body>
13
14      </html>
```
1 Necessary line which defines the type of the document, and ensures we are using the latest version of HTML.

2 Wraps the contents of the page together, has attributes such as lang which is used to define the language the document is written in.

3 `<head>` is a wrapper which contain metadata about the HTML document, this data is not content of the page.

4-5 `<meta>` contains metadata that cannot be represented using other elements. Has attributes which can be used to specify information such as author name and document character encoding.

6 `<title>` specifies the title of the document, this data is usually displayed as the title of the browser tab.

7 `<link>` used to specify a relationship between the current document and an external source. Often used to link to an extern CSS file which defines the document style.

8 The script tag is used to import script data into the HTML, can be specified in the head or at the end of the body.

In HTML5 new semantical, media, form and graphic elements have been introduced, and new functionalities [2]. Below  can be found an introduction to the major additions in HTML5 as describes in [2].

1. Structural elements
   New structural elements have been defined which organise the content of the page better, more explicit but also to add new functionalities.

   `<article>` elements is used to define independent content which is not related to the other content

   `<header>` contains introductory information which is placed at the beggining of the document, usually page name and menu

   `<section>` is a section in the documetn whcih contains logically connected content

   `<aside>` contains information which is not directly related to the main content of the page, such as side bars

   `<footer>` specified before the closing body tag, contains data about the author, copyrights, and other external data related to the document content

   `<progress>` creates a progress bar which shows the progress of the task

2. Media elements
   
   `<audio>` and `<video>` elements are a major feature, allows to embed audio and video files into the HTML document

3. Graphic elements
   
   `<canvas>` defines an area which can be used to create different objects such as images and animations via a script

   `<svg>` allows to draw scalable vector graphics

4. Form elements
   
   `<details>` a container which displays the result of an operation performed by the script

   `<keygen>` generates key pairs used for encrypting and decrypting data sent to the server when a form is submitted

Another major feature of HTML5 is the use of cache, web storage and web database which allows to use an application whilst offline. These new functionalities have been explored in more depth in 'Developing Offline HTML5 Apps' report.

### CSS
-----------------------------------------------------------
CSS stands for Cascadian Style Sheet which is a stylesheet language that can be used to describe how an HTML document will look like when displayed on the screen [3].

CSS styling can be applied to an HTML document in 3 different ways:

1. In line stylesheet
   
   The styling is applied directly on the target element in HTML

   e.g: `<p style="color:red; font-size: 60px;">Hello World</p>`
   
   The above line will transform the text 'Hello World' to have color red and size of 60 pixels.
   In line CSS only applies the styling to a single element.

2.  Internal CSS

      The styling is declared in the same file within the HTML document, the `<style>` element is used to place the styling in and is placed in the `<head>` element. Styling declared here can be applied to multiple elements within the same document.

3.  External CSS

      The styling can be declared in an external style with the file extension .css, the file is linked to the HTML document by using the `<link>` element as such:
      
      `<link rel="stylesheet" type="text/css" href="style.css" />`

      The style declared in file 'style.css' can be linked with 1 or more HTML documents.

Below we will analyse the different ways HTML elements can be selected by the CSS if using external or internal stylesheet.

#### CSS code
The code below is a snapshot of the styling used in To Do List proof of concept.

```
input[type="radio"] {
  width: 20px;
  height: 20px;
}

label {
  margin-left: 20px;
  padding: 5px;
}

.container {
  width: 60vw;
  height: 80vh;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  align-items: center;
}

section div {
  margin: 5px;
  display: flex;
  align-items: center;
  left: 0px;
  position: relative;
  top: 30px;
}

#enter-task {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  width: 50vw;
}
```

The code above is a snippet of css code which is used to style an HTML document. 
In order to apply a styling we first need to identify the object that needs to be styled. 
In CSS that can be achieved in different ways, below we will explore the different ways.

1. Selecting by class name
      
      An HTML element can be selected by its class name as follows 
      `.className { //styling }`,
      
      in the provided css snapshot all elements with class name 'container' are selected and applied the styling.

      Note: multiple elements can have the same class name, in the case above all elements with the same class name will have the styling applied.

2. Selecting by id

      An HTML element can be selected by the id value, in HTML each element with an id should have a unique value. 
      The element is selected as follow:
      
      `#element-id { // styling }`
      
      in this case the styling only applies to one element, with id 'element-id' and in the provided css snaphost the element with id 'enter-task' is selected and applied the styling.

3. Selecting by element name
   
      The HTML elements can be selected using the element tag, in this case all elements with the tag name will be selected and apply the styling to.
      In the snaphsot above all `<label>` elements are selected

      e.g: `label { //styling }`

4. Attribute selector
      The element is selected using the element name with a given attribute

      e.g: `input[type="radio"] { //styling }`
   
      will select all `<input>` elements which have the attribute tag 'radio'  

5. Descendant selectors
      This type of selection will select an HTML element which is contained in another element.
      For example if we have: 
      ```
      <div>
         <p>Hello</p>
         <h1>World</h1> 
      </div>

      <div>
         <p>Goodbye</p>
         <h1>Everyone</h1> 
      </div>

      <h1>Today is a great day!</h1>
      ```

      if we want to apply styling only to the `<h1>` elements which are contained in the `<div>` we can do the following:

      `div h1 { //styling }`, this way the outer header will not be affected.

Lastly, using CSS we can adjust the elements position, color, size and other. To learn more about CSS's potential visit: https://developer.mozilla.org/en-US/docs/Web/CSS

### JavaScript
-----------------------------------------------------------
HTML only creates static web pages, meaning that it cannot add functionality to the elements, HTML will only display the elements on the page content. 

JavaScript is a programming language which is used to add interactivity to the HTML elements dynamically, this is called client-side JavaScript and server-side JavaScript is run on a server, this can be done by using Node.js in JavaScript [4].

In JavaScript the order defined in the page is the order the code runs, this is the case when we have blocks of code which are not in a function, will be executed top to bottom. [4]

An important feature of JavaScript is that it does not allow to communicate with other pages and websites beacuse the JavaScript code runs completely separate in its own environment for every page. This feature is a good security measure so that other websites cannot see the data you share with another website [4].

### Internal JavaScript
   The script is declared in the same HTML file, between the `<script> </script>` tags.
   e.g. : 
   ```
   <script> 
      alert("This message comes from internal JavaScript!");
   <script>
   ```
   The script is added just before the closing `<body>` tag, to unsure the script is not executed before the HTML has been rendered.

   Having the script place just before the closing `<body>` tag can have some issues for large websites. A solution to this, and a good practice is to use an event listener which listens to the event of having the HTML document completely loaded [4].
   e.g.:
   ```
   document.addEventListner("DOMContentLoaded", () => {
      alert("This message comes from JavaScript!");
   })
   ```

### External JavaScript
   The JavaScript code is written in a file with the extension .js, the script is added to this file and is linked to the HTML document using the `<link>` element. 
   e.g.:
   ```
   <script src="js/script.js"></script>
   ```
   Best practice is to add the script just before the closing body tags as shown above, this way the script will not be executed until the HTML document has been rendered.
   It can also be placed in the `<head>` tag, if we want the JavaScript to be executed before the whole page has been rendered.

   This solution can cause issues for large websites, with a lot of content, a solution is to add the `defer` attribute inside the script tag [4]: 
   ```
   <script src="js/script.js" defer></script>
   ```
   The solution above will ensures the HTML content is still downloaded even when the script tag has been reached, this way the script and HTML document will load at the same time.


### JavaScript client-side
As mentioned above, client-side JavaScript is used to add interactivity to the HTML elements dinamically. The code runs on the client's browser.

In order to be able to manipulate HTML and CSS we first need to access the element we want to modify from the document. In JavaScript this can be done by using Document Object Model (DOM) API. DOM represents an HTML document as nodes and objects, this way programming language like JavaScript can interact with the page elements [5].

DOM can be accessed in JavaScript using `document` or `window` objects. 

For example:
Given the minimal HTML page:
```
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <title>JavaScript interaction example</title>
       </head>

        <body>
            <p id='greeting'>Hello World</p>
           <script src="script.js"></script>
        </body>

      </html>
```
if we want to change the greeting to something else we can use DOM to get access to the `<p>` element through the document object as follows:

1. Alter an element from JavaScript
   
```
   const greeting = document.getElementById('greeting');
   greeting.textContent = 'This message has been written in JavaScript.';
```

2. Get an element from HTML document:

```
1  document.getElementById('id');
2  document.getElementsByClassName('className');
3  document.getElementsByName('name');
4  document.getElementsByTagName('tag');
```
1 - gets an element based on its unique id
2 - returns a list of elements which have the same class name
3 - returns a list of elements which have the same name e.g: elements with attribute 'name'
4 - returns a list of elements with a given tag, for example `<p>` tags

3. Add new elements to the HTML
   
```
   const newElement = document.createElement('p');
   newElement.textContent = 'Element created in JavaScript';
   document.body.appendChild(newElement);
```
The code snapshot above creates a new paragraph element with a text, and uses `appendChild()` to append the new element to the body of the document.

4. Add CSS from JavaScript

JavaScript can also be use to alter the CSS of an element as follow:

```
   const element = document.getElementById('greeting');
   element.style.color = 'red';
```
To update the CSS the syntax `element.style.property = style;` is used. `.style` accesses the style of the element and the `property` is the property of the element we want to update, in the example above the colour.

5. Event listener
   Event listeners can be added to an element, and whenever the added event happens on the element a function is executed. The event is added using the `addEventListener()` method of the EventTarget interface, and takes 2 parameters, the event to be registered and a function with actions it should take when the event occurs.

   For instance:
   ```
   const element = document.getElementById('greeting');
   element.addEventListener('click', () => {
      element.style.color = 'red';
   })
   ```
   The code above will add a 'click' event listener to the paragraph, and when is clicked the text colour will change.

HTML, CSS and JavaScript are the building blocks of web development. We explored the strucure of an HTML file and the new semantics added in HTML5. The CSS section delved into various styling methods and element selection. Lastly, JavaScript section discussed its role and how to add interactivity to web pages, covering both client-side and server-side JavaScript.




#### References
-----------------------------------------------------------
[1] MDN Web Docs (08/06/2023). HTML5 [Online]. Available: https://developer.mozilla.org/en-US/docs/Glossary/HTML5

[2] Geeks for Geeks. Top 10 new features of HTML5 [Online]. Available: https://www.geeksforgeeks.org/top-10-new-features-of-html5/

[3] MDN Web Docs (22/07/2023). CSS: Cascadian Style Sheet [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/CSS

[4] MDN Web Docs (04/10/2023). What is JavaScript? [Online]. Available: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript

[5] MDN Web Docs (21/05/2023). Introduction to the DOM [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction