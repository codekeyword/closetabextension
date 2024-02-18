document.getElementById('closeTabsButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: closeTabsWithSameDomain
    });
  });
});

function closeTabsWithSameDomain() {
  chrome.tabs.query({currentWindow: true}, (tabs) => {
    const currentDomain = new URL(window.location.href).hostname;
    const currentTabId = tabs[0].id;
    for (const tab of tabs) {
      const tabDomain = new URL(tab.url).hostname;
      if (tabDomain === currentDomain && tab.id !== currentTabId) {
        chrome.tabs.remove(tab.id);
      }
    }
  });
}
