const user1 = document.querySelector("#userName1");
const user2 = document.querySelector("#userName2");
const inputContainer = document.querySelector(".input-box-container");
const battleBtn = document.querySelector(".btn-battle");
let resetBtn = undefined;

let userData1,
  userData2 = undefined;

let dataBase = {
  userData1: null,
  userData2: null,
  userPoints1: 0,
  userPoints2: 0,
};

const fetchUser = (user) => {
  const req = new XMLHttpRequest();
  req.open("GET", `https://api.github.com/users/${user}`);
  req.onload = function (response) {
    handleSuccess(req.response);
  };
  req.onerror = () => "There's gotcha";
  req.send();
};

const handleSuccess = (data) => {
  if (userData1 === undefined) {
    userData1 = data;
  } else if (userData2 === undefined) {
    userData2 = data;
  }
};

const handleKey = (e) => {
  if (e.keyCode === 13) {
    let input = e.target.id;
    let value = e.target.value;
    if (input === user1.id) {
      if (value.length > 2) fetchUser(value);
    } else {
      if (value.length > 2) fetchUser(value);
    }
  } else if (e.target.className === "btn") {
    let input = e.target.id;
    let value1 = user1.value;
    let value2 = user2.value;

    if (input === "btn1") {
      if (value1.length > 2) fetchUser(value1);
    } else if (input === "btn2") {
      if (value2.length > 2) fetchUser(value2);
    }
  }
};

const createUi = () => {
  let data1 = JSON.parse(userData1);
  let data2 = JSON.parse(userData2);
  document.querySelector(".main").remove();
  let main = document.createElement("main");
  main.setAttribute("class", "main-section");

  main.innerHTML = `
    <div class="card-section-container wrapper">
        <div class="card-container">
            <div class="card-item">
                <div class="card-top">
                    <span class="result-heading">${
                      dataBase.userPoints1 > dataBase.userPoints2
                        ? "WIn"
                        : "Lose"
                    }</span>
                    <img class="pro-image" src=${data1.avatar_url} alt=${
    data1.name
  }></img>
                </div>
                <div class="card-bottom">
                    <span class="score">Points: ${dataBase.userPoints1}</span>
                    <span class="pro-userName">User name: ${data1.login}</span>
                    <span class="pro-name">Name: ${data1.name}</span>
                    <span class="pro-place">Place: ${data1.location}</span>
                    <span class="pro-company">Company: ${data1.company}</span>
                    <span class="followers">Followers: ${data1.followers}</span>
                    <span class="following">Following: ${data1.following}</span>
                    <span class="repos">Repositories: ${
                      data1.public_repos
                    }</span>
                </div>
            </div>

            <div class="card-item item2">
                <div class="card-top">
                    <span class="result-heading">${
                      dataBase.userPoints2 > dataBase.userPoints1
                        ? "Win"
                        : "Lose"
                    }</span>
                    <img class="pro-image" src=${data2.avatar_url} alt=${
    data2.name
  }></img>
                </div>
                <div class="card-bottom">
                    <span class="score">Points: ${dataBase.userPoints2}</span>
                    <span class="pro-userName">User name: ${data2.login}</span>
                    <span class="pro-name">Name: ${data2.name}</span>
                    <span class="pro-place">Place: ${data2.location}</span>
                    <span class="pro-company">Company: ${data2.company}</span>
                    <span class="followers">Followers: ${data2.followers}</span>
                    <span class="following">Following: ${data2.following}</span>
                    <span class="repos">Repositories: ${
                      data2.public_repos
                    }</span>
                </div>
            </div>
        </div>
        <div class="btn-container">
            <button class="btn-reset">RESET</button>
        </div>
    </div>
    `;
  document.body.appendChild(main);
};

const battle = (e) => {
  if (typeof userData1 === "string" && typeof userData2 === "string") {
    let data1 = JSON.parse(userData1);
    let data2 = JSON.parse(userData2);

    dataBase.userPoints1 += data1.followers / 2;
    dataBase.userPoints2 += data2.followers / 2;

    dataBase.userPoints1 += data1.public_gists;
    dataBase.userPoints2 += data2.public_gists;

    dataBase.userPoints1 += data1.public_repos / 5;
    dataBase.userPoints2 += data2.public_repos / 5;

    dataBase.userPoints1 = Math.floor(dataBase.userPoints1);
    dataBase.userPoints2 = Math.floor(dataBase.userPoints2);

    createUi();

    bindButton();
  }
};

const handleReset = () => {
  alert("You clicked the reset button");
};

const bindButton = () => {
  resetBtn = document.querySelector(".btn-reset");

  resetBtn.addEventListener("click", handleReset);
};

inputContainer.addEventListener("keyup", handleKey);
inputContainer.addEventListener("click", handleKey);
battleBtn.addEventListener("click", battle);
