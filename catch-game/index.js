const colours = [
  "#F7FC09",
  "#F437EC",
  "#37E2D5",
  "#FF4949",
  "#06FA00",
  "#FF0575",
];

const messages = ["Try again", "You can't catch me", "Still very close"];

function getRandomColour() {
  return colours[Math.floor(Math.random() * colours.length)];
}

function getMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

console.log(getMessage());

const btn = document.getElementById("btn");
btn.addEventListener("mouseover", (event) => {
  let top, bottom, left, right;
  top = getRandomNumber(1, 500);
  bottom = getRandomNumber(1, 500);
  left = getRandomNumber(1, 1000);
  right = getRandomNumber(1, 1000);

  event.target.style.backgroundColor = `${getRandomColour()}`;
  event.target.style.color = "black";
  event.target.style.top = `${top}px`;
  event.target.style.bottom = `${bottom}px`;
  event.target.style.left = `${left}px`;
  event.target.style.right = `${right}px`;

  btn.innerHTML = `${getMessage()}`;
});
