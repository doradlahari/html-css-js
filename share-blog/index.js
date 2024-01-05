const share = (e) => {
  if (navigator.share) {
    navigator
      .share({
        title: "Share my blog",
        text: "Web development tutorial blogs",
        url: "https://github.com/doradlahari?tab=repositories",
      })
      .then(() => console.log("thanks for share"))
      .catch((error) => console.log("error", error));
  }
};
if (!navigator.share) {
  document.getElementById("tip").className = "show";
}
document.getElementById("share").addEventListener("click", share);
