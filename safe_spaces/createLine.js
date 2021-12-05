var amplitude = 10; // wave amplitude
var rarity = 1; // point spacing
var freq = 0.1; // angular frequency
var phase = 0; // phase angle

function createLine(x1, y1, x2, y2, id){
  // this function creates a svg line - adds it to the lineContainer HTML elements and adds eventlisteners for each line

  var svgLn = document.createElementNS('http://www.w3.org/2000/svg','line');

  svgLn.setAttribute("id", id);
  svgLn.setAttribute("x1", x1);
  svgLn.setAttribute("y1", y1);
  svgLn.setAttribute("x2", x2);
  svgLn.setAttribute("y2", y2);

  // the classname corresponds to the style settings
  svgLn.classList.add('lineLo');

  //--- ADDING EVENT LISTENERS FOR THE LINE ---//
  // REFERENCE : https://www.w3schools.com/js/js_htmldom_eventlistener.asp

  // when the mouse enters the line
  svgLn.addEventListener("mouseenter", function( event ) {
  // focus the mouseenter target
  svgLn.classList.add('lineHi');
  svgLn.classList.remove('lineClick');
  console.log("mouse Over: " + event.target.id);
  }, false);

  // when the mouse leaves the line
  svgLn.addEventListener("mouseleave", function( event ) {
  // unfocus the mouseleave target
  svgLn.classList.remove('lineHi');
  console.log("mouse Leaving: " + event.target.id);
  }, false);

  // when the mouse clicks the line
  // https://css-tricks.com/svg-line-animation-works/
  svgLn.addEventListener("click", function( event ) {
  // unfocus the mouseleave target
  svgLn.classList.add('lineClick');
  console.log("mouse clicking: " + event.target.id);
  }, false);


  // we get the SVG container from index.thml
  var svgC = document.getElementById("lineContainer");
  // we append our line to that container as a childElement
  svgC.appendChild(svgLn);
}
