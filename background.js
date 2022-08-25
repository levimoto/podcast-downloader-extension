function reloadPages() {
  chrome.tabs.query({ url: "*://podcasts.google.com/*" }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.reload(tab.id);
    });
  });
}

chrome.management.onEnabled.addListener(reloadPages);
chrome.management.onInstalled.addListener(reloadPages);
chrome.management.onDisabled.addListener(reloadPages);
chrome.management.onUninstalled.addListener(reloadPages);

chrome.runtime.onMessage.addListener((arg, _sender, _sendResponse) => {
  chrome.downloads.download(
    {
      url: arg.url,
      filename: arg.title
    }
  );
  return true;
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // read changeInfo data and do something with it (like read the url)
  if (changeInfo.url) {
    chrome.tabs.reload(tabId);
  }
});