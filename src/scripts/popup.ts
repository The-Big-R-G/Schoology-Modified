document.getElementById("open-messages")?.addEventListener("click", () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("messages.html") });
});
