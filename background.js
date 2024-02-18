chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: closeTabsWithSameDomain
  });
});

function closeTabsWithSameDomain() {
  chrome.tabs.query({currentWindow: true}, (tabs) => {
    const currentDomain = new URL(window.location.href).hostname;
    for (const tab of tabs) {
      const tabDomain = new URL(tab.url).hostname;
      if (tabDomain === currentDomain && tab.id !== currentTabId) {
        chrome.tabs.remove(tab.id);
      }
    }
  });
}
