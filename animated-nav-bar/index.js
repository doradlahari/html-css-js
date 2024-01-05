const listItem = {
  home: true,
  bookmark: false,
  plus: false,
  user: false,
  setting: false,
};

function actived(event) {
  const wrapperHover = document.querySelector(".wrapper-hover");
  const targetElement = event.target.parentElement.parentElement.parentElement;

  for (const item in listItem) {
    listItem[item] = false;
    wrapperHover.classList.remove(`go-to-${item}`);

    // jika klik element li yang memiliki class yang diinginkan
    if (event.target.classList.contains(item)) {
      listItem[item] = true;
      wrapperHover.classList.add(`go-to-${item}`);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const appElement = document.getElementById("app");

  const wrapperElements = document.querySelectorAll(".wrapper li");
  wrapperElements.forEach(function (wrapperElement) {
    wrapperElement.addEventListener("click", actived);
  });

  const app = {
    data: function () {
      return {
        listItem: listItem,
      };
    },
    methods: {
      actived: actived,
    },
  };

  appElement.dataset.vueApp = JSON.stringify(app);
});
