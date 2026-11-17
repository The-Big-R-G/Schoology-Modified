document.getElementById("open-messages")?.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "openMessages" });
    window.close();
});
