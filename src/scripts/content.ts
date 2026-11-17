import * as pages from "./pages";
import * as utils from "./utils";
import { getAnalyticsUserId, initializeAnalytics } from "./utils/analytics";
import { getBrowser } from "./utils/dom";
import { Logger } from "./utils/logger";
import { generateDebugInfo } from "./utils/settings";
import { Settings } from "./utils/splus-settings";

declare global {
    var SchoologyPlus: any;
}

// checks to see if the current page matches the given path pattern
function matchPage(...patterns: RegExp[]) {
    return patterns.some(pattern => pattern.test(globalThis.location.pathname));
}

// function that returns a promise that resolves when the document is ready
function ready() {
    return new Promise<void>(resolve => {
        if (document.readyState != "loading") {
            resolve();
        } else {
            document.addEventListener("DOMContentLoaded", () => resolve());
        }
    });
}

function makeMessagesPanelDraggable(panel: HTMLElement, titlebar: HTMLElement) {
    let drag: { pointerId: number; offsetX: number; offsetY: number } | null = null;
    titlebar.addEventListener("pointerdown", event => {
        if ((event.target as HTMLElement).closest("button")) return;
        const bounds = panel.getBoundingClientRect();
        drag = { pointerId: event.pointerId, offsetX: event.clientX - bounds.left, offsetY: event.clientY - bounds.top };
        titlebar.setPointerCapture(event.pointerId);
        event.preventDefault();
    });
    titlebar.addEventListener("pointermove", event => {
        if (!drag || event.pointerId !== drag.pointerId) return;
        const bounds = panel.getBoundingClientRect();
        const left = Math.max(0, Math.min(window.innerWidth - bounds.width, event.clientX - drag.offsetX));
        const top = Math.max(0, Math.min(window.innerHeight - bounds.height, event.clientY - drag.offsetY));
        panel.style.left = `${left}px`;
        panel.style.top = `${top}px`;
    });
    titlebar.addEventListener("pointerup", event => {
        if (!drag || event.pointerId !== drag.pointerId) return;
        titlebar.releasePointerCapture(event.pointerId);
        drag = null;
    });
}

function openMessagesInSchoology() {
    const existing = document.getElementById("splus-messages-overlay") as HTMLDialogElement | null;
    if (existing) existing.close();
    const overlay = document.createElement("dialog");
    overlay.id = "splus-messages-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Schoology Plus Messages");

    const panel = document.createElement("div");
    panel.className = "splus-messages-panel";
    const titlebar = document.createElement("div");
    titlebar.className = "splus-messages-titlebar";
    const title = document.createElement("strong");
    title.textContent = "Messages";
    const controls = document.createElement("div");
    controls.className = "splus-messages-controls";
    const minimize = document.createElement("button");
    minimize.className = "splus-messages-control";
    minimize.type = "button";
    minimize.textContent = "−";
    minimize.title = "Minimize Messages";
    minimize.setAttribute("aria-label", "Minimize Messages");
    const close = document.createElement("button");
    close.className = "splus-messages-control";
    close.type = "button";
    close.textContent = "×";
    close.title = "Close Messages";
    close.setAttribute("aria-label", "Close Messages");
    close.addEventListener("click", () => overlay.close());
    minimize.addEventListener("click", () => {
        const minimized = panel.classList.toggle("splus-messages-minimized");
        minimize.textContent = minimized ? "□" : "−";
        minimize.title = minimized ? "Restore Messages" : "Minimize Messages";
        minimize.setAttribute("aria-label", minimize.title);
    });
    controls.append(minimize, close);
    titlebar.append(title, controls);
    const frame = document.createElement("iframe");
    frame.className = "splus-messages-frame";
    frame.src = chrome.runtime.getURL("messages.html");
    frame.title = "Schoology Plus Messages";
    panel.append(titlebar, frame);
    overlay.append(panel);
    overlay.addEventListener("click", event => {
        if (event.target === overlay) overlay.close();
    });
    overlay.addEventListener("close", () => overlay.remove());
    document.body.append(overlay);
    overlay.showModal();
    const width = Math.min(880, Math.max(320, window.innerWidth - 48));
    const height = Math.min(680, Math.max(240, window.innerHeight - 48));
    panel.style.width = `${width}px`;
    panel.style.height = `${height}px`;
    panel.style.left = `${Math.max(0, (window.innerWidth - width) / 2)}px`;
    panel.style.top = `${Math.max(0, (window.innerHeight - height) / 2)}px`;
    makeMessagesPanelDraggable(panel, titlebar);
    close.focus();
}

function openSchoologyBrowser() {
    const existing = document.getElementById("splus-web-browser-overlay") as HTMLDialogElement | null;
    if (existing) existing.close();
    const overlay = document.createElement("dialog");
    overlay.id = "splus-web-browser-overlay";
    overlay.className = "splus-web-browser-overlay";
    overlay.setAttribute("aria-label", "Schoology Plus Web Browser");
    const panel = document.createElement("div");
    panel.className = "splus-web-browser-panel";
    const toolbar = document.createElement("form");
    toolbar.className = "splus-web-browser-toolbar";
    const address = document.createElement("input");
    address.type = "url";
    address.value = "https://www.google.com/webhp?igu=1";
    address.setAttribute("aria-label", "Web address");
    const go = document.createElement("button");
    go.type = "submit";
    go.textContent = "Go";
    const openTab = document.createElement("button");
    openTab.type = "button";
    openTab.textContent = "Open tab";
    openTab.title = "Open this address in a browser tab";
    const close = document.createElement("button");
    close.type = "button";
    close.textContent = "×";
    close.title = "Close browser";
    const frame = document.createElement("iframe");
    frame.className = "splus-web-browser-frame";
    frame.src = address.value;
    frame.title = "Web browser";
    const navigate = () => {
        try {
            const url = new URL(address.value);
            if (!/^https?:$/.test(url.protocol)) throw new Error("Only web addresses are supported");
            frame.src = url.href;
        } catch {
            address.setCustomValidity("Enter a valid http or https address.");
            address.reportValidity();
            return;
        }
        address.setCustomValidity("");
    };
    toolbar.addEventListener("submit", event => {
        event.preventDefault();
        navigate();
    });
    close.addEventListener("click", () => overlay.close());
    openTab.addEventListener("click", () => {
        chrome.runtime.sendMessage({ type: "openBrowserTab", url: frame.src || address.value });
    });
    overlay.addEventListener("click", event => {
        if (event.target === overlay) overlay.close();
    });
    overlay.addEventListener("close", () => overlay.remove());
    toolbar.append(address, go, openTab, close);
    panel.append(toolbar, frame);
    overlay.append(panel);
    document.body.append(overlay);
    overlay.showModal();
    address.focus();
    address.select();
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.type === "openMessagesInSchoology") openMessagesInSchoology();
    else if (request.type === "openBrowserInSchoology") openSchoologyBrowser();
    else return;
    sendResponse({ success: true });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") (document.getElementById("splus-messages-overlay") as HTMLDialogElement | null)?.close();
});

async function load() {
    Logger.debug(`Current value of SchoologyPlus variable:`, globalThis.SchoologyPlus);

    if (globalThis.SchoologyPlus) {
        Logger.warn(
            `SchoologyPlus is already loaded. Aborting content script load to prevent conflicts.`
        );
        return;
    }

    globalThis.SchoologyPlus = {};

    await pages.all.preload();

    await initializeAnalytics({
        documentContext: true,
        isAnalyticsEnabled: getBrowser() !== "Firefox" && Settings.Analytics.value === "enabled",
        selectedTheme: Settings.Theme.valueOrDefault("<unset>"),
        selectedBeta: Settings.BetaCode.valueOrDefault("<unset>"),
        currentVersion: chrome.runtime.getManifest().version,
        newVersion: Settings.LastLoadedVersion.value,
        randomUserId: await getAnalyticsUserId(),
        themeIsModern: document.documentElement.getAttribute("modern") ?? "false",
    });

    await ready();
    await pages.all.load();

    const isGradesPage = matchPage(
        /^\/grades\/grades$/, // matches /grades/grades
        /^\/course\/\d+\/student_grades$/ // matches /course/1234/student_grades
    );

    if (isGradesPage) {
        await pages.grades.load();
        await pages.course.load();
    }

    if (matchPage(/^\/settings\/account$/)) {
        await pages.accountSettings.load();
    }

    if (
        matchPage(
            /^\/$/, // matches /
            /^\/home$/, // matches /home
            /^\/home\/(recent-activity|course-dashboard|notifications)$/ // matches home dashboard and notification inbox pages
        )
    ) {
        await pages.home.load();
        await pages.course.load();
    }

    if (
        !isGradesPage &&
        matchPage(
            /^\/course\/\d+/ // matches /course/1234(...)
        )
    ) {
        await pages.course.load();
    }

    if (
        matchPage(
            /^\/assignment\/\d+(?:\/assessment|\/dropbox\/submit)?$/ // matches assignment submission pages
        )
    ) {
        await pages.assessment.load();
    }

    if (
        matchPage(
            /^\/page\// // matches /page/(...)
        )
    ) {
        await pages.page.load();
    }

    if (
        matchPage(
            /^\/courses/ // matches /courses(...)
        )
    ) {
        await pages.course.load();
        await pages.courses.load();
    }

    globalThis.SchoologyPlus = {
        Settings,
        utils,
        pages,
        debug: JSON.parse(generateDebugInfo()),
    };
}

load();
