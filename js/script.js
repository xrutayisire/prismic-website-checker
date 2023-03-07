function onWindowLoad() {
  checkIsPrismicPage().then((isPrismicPage) => {
    document.getElementById("loading").style.display = "none";

    switch (isPrismicPage) {
      case true:
        document.getElementById("prismic-website").style.display = "flex";
        break;
      case false:
        document.getElementById("not-prismic-website").style.display = "block";
        break;
      default:
        document.getElementById("error").style.display = "block";
    }
  });
}

window.onload = onWindowLoad;
