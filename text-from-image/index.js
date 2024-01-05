document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Add your login logic here
    alert("Login button clicked!");
  });

document.addEventListener("mousemove", function (event) {
  createGunCursor(event.clientX, event.clientY);
});

function createGunCursor(x, y) {
  const gunCursor = document.createElement("div");
  gunCursor.className = "gun-cursor";
  gunCursor.innerHTML =
    '<i class="fas fa-handgun"></i>'; /* Font Awesome gun icon */
  gunCursor.style.left = x + "px";
  gunCursor.style.top = y + "px";
  document.body.appendChild(gunCursor);

  setTimeout(() => {
    gunCursor.remove();
  }, 1000);
}
