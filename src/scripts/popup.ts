document.getElementById("open-messages")?.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "openMessages" });
    window.close();
});

document.getElementById("open-browser")?.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "openBrowser" });
    window.close();
});
