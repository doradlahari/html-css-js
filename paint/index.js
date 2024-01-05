var color = getComputedStyle(
  document.querySelector(".selected")
).backgroundColor;
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var lastEvent;
var mouseDown = false;

// When clicking on control list items
document.querySelector(".controls").addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    // deselect sibling elements
    var siblings = event.target.parentElement.children;
    for (var i = 0; i < siblings.length; i++) {
      siblings[i].classList.remove("selected");
    }
    // select clicked element
    event.target.classList.add("selected");
    // cache current color here
    color = getComputedStyle(event.target).backgroundColor;
  }
});

// When "new color" is pressed
document
  .querySelector("#revealColorSelect")
  .addEventListener("click", function () {
    // show color select or hide select
    changeColor();
    document.querySelector("#colorSelect").style.display =
      document.querySelector("#colorSelect").style.display === "none"
        ? "block"
        : "none";
  });

// update color span
function changeColor() {
  var r = document.querySelector("#red").value;
  var g = document.querySelector("#green").value;
  var b = document.querySelector("#blue").value;
  document.querySelector("#newColor").style.backgroundColor =
    "rgb(" + r + "," + g + "," + b + ")";
}

// When color sliders change
var sliders = document.querySelectorAll(".color-sliders[type=range]");
sliders.forEach(function (slider) {
  slider.addEventListener("input", changeColor);
});

// When "add color" is pressed
document.querySelector("#addNewColor").addEventListener("click", function () {
  // append the color to the controls ul
  var newColor = document.createElement("li");
  newColor.style.backgroundColor = getComputedStyle(
    document.querySelector("#newColor")
  ).backgroundColor;
  document.querySelector(".controls ul").appendChild(newColor);
  // select the new color
  newColor.click();
});

// on mouse events on the canvas
// change thickness
document.querySelector("#thickness").addEventListener("input", function () {
  context.lineWidth = document.querySelector("#thickness").value;
});

// round brush strokes
context.lineCap = "round";

canvas.addEventListener("mousedown", function (e) {
  lastEvent = e;
  mouseDown = true;
});

canvas.addEventListener("mousemove", function (e) {
  // draw lines
  if (mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
  }
});

canvas.addEventListener("mouseup", function () {
  mouseDown = false;
});

canvas.addEventListener("mouseleave", function () {
  canvas.dispatchEvent(new Event("mouseup"));
});
