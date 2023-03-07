importScripts("./utils.js");

chrome.tabs.onUpdated.addListener(() => {
  handlePrismicIcon();
});

function handlePrismicIcon() {
  checkIsPrismicPage().then((isPrismicPage) => {
    switch (isPrismicPage) {
      case true:
        chrome.action.setIcon({ path: "/images/prismic_green.png" });
        break;
      case false:
        chrome.action.setIcon({ path: "/images/prismic_orange.png" });
        break;
      default:
        chrome.action.setIcon({ path: "/images/prismic.png" });
    }
  });
}
