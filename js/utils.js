/**
 * Check if the current page is using Prismic.
 *
 * true if yes
 * false if no
 * null if there is an error or we don't want to scan the page
 */
function checkIsPrismicPage() {
  let activeTab;

  return chrome.tabs
    .query({ active: true })
    .then((tabs) => {
      activeTab = tabs[0];

      // Prevent any extensions page or setting page to trigger this extensions
      if (activeTab.url && activeTab.url.startsWith("chrome")) {
        return null;
      }

      return chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        func: DOMtoString,
      });
    })
    .then((results) => {
      if (results === null) {
        return null;
      }

      const stringDOM = results[0].result;
      const isPrismicWebsite =
        (stringDOM.indexOf("images.prismic.io") !== -1 ||
          stringDOM.indexOf("cdn.prismic.io") !== -1) &&
        // it seems Google preload results and if a results use Prismic it will turn green
        activeTab.url.indexOf("google.com") === -1;

      return isPrismicWebsite;
    })
    .catch(() => {
      return null;
    });
}

function DOMtoString() {
  return document.documentElement.outerHTML;
}
