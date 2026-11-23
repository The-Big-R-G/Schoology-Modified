import "webext-dynamic-content-scripts";
import { createClient } from "@supabase/supabase-js";
import addDomainPermissionToggle from "webext-permission-toggle";

import { getAnalyticsUserId } from "./utils/analytics";
import { DISCORD_URL, EXTENSION_NAME, EXTENSION_WEBSITE } from "./utils/constants";
import { getBrowser } from "./utils/dom";
import { Logger } from "./utils/logger";
import {
    loadAssignmentNotifications,
    sendNotification,
    updateLastTime,
} from "./utils/notifications";

var assignmentNotificationUrl = "https://app.schoology.com/home/notifications?filter=all";
var defaultDomain = "app.schoology.com";
const OFFSCREEN_DOCUMENT_PATH = "/offscreen.html";
const MESSAGE_PROJECT = { url: "https://sksjloysptdwsbsgpgtg.supabase.co", key: "sb_publishable_RC8HNGWtcvSkMZDvYuzMiA_z35vBR-2" };

async function updateMessageUnreadCount() {
    const stored = await chrome.storage.local.get("messagesConfiguration");
    const config = stored.messagesConfiguration || MESSAGE_PROJECT;
    const storage = {
        getItem: async (key: string) => (await chrome.storage.local.get(key))[key] ?? null,
        setItem: async (key: string, value: string) => chrome.storage.local.set({ [key]: value }),
        removeItem: async (key: string) => chrome.storage.local.remove(key),
    };
    const db = createClient(config.url, config.key, { auth: { storage, persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } });
    const { data: { user } } = await db.auth.getUser();
    if (!user) return;
    const { data: memberships, error } = await db.from("conversation_members").select("conversation_id, last_read_at, hidden_at").eq("user_id", user.id).is("hidden_at", null);
    if (error || !memberships?.length) return;
    const ids = memberships.map(item => item.conversation_id);
    const { data: messages } = await db.from("messages").select("id, conversation_id, sender_id, created_at").in("conversation_id", ids).neq("sender_id", user.id);
    const { data: hidden } = await db.from("hidden_messages").select("message_id").eq("user_id", user.id);
    const hiddenIds = new Set((hidden ?? []).map(item => item.message_id));
    const reads = new Map(memberships.map(item => [item.conversation_id, item.last_read_at]));
    const count = (messages ?? []).filter(item => !hiddenIds.has(item.id) && (!reads.get(item.conversation_id) || item.created_at > reads.get(item.conversation_id)!)).length;
    await chrome.storage.local.set({ messagesUnreadCount: count });
    chrome.tabs.query({ url: ["*://*.schoology.com/*", "https://lms.lausd.net/*"] }, tabs => {
        for (const tab of tabs) if (tab.id) chrome.tabs.sendMessage(tab.id, { type: "messagesUnreadCount", count }).catch(() => {});
    });
}

async function load() {
    addDomainPermissionToggle({ reloadOnSuccess: true });

    chrome.runtime.onInstalled.addListener(onInstalled);
    chrome.alarms.onAlarm.addListener(onAlarm);

    let s = await chrome.storage.sync.get({ defaultDomain: "app.schoology.com" });
    defaultDomain = s.defaultDomain;
    assignmentNotificationUrl = `https://${defaultDomain}/home/notifications?filter=all`;

    // TODO: Domain permissions toggle needs to be added
    // addDomainPermissionToggle();

    //Run once on load
    onAlarm({ name: "notification", scheduledTime: Date.now() });

    chrome.alarms.get("notification", function (alarm) {
        if (alarm) {
            Logger.log("Alarm is already registered");
        } else {
            Logger.log("Notifications alarm is not registered; registering...");
            chrome.alarms.create("notification", {
                periodInMinutes: 5,
            });
        }
    });
    chrome.alarms.create("messages-unread", { periodInMinutes: 1 });
    void updateMessageUnreadCount();

    chrome.notifications.onClicked.addListener(onNotificationClicked);
    chrome.action.setBadgeBackgroundColor({ color: [217, 0, 0, 255] });

    chrome.action.onClicked.addListener(onActionClicked);
    chrome.runtime.onMessage.addListener(onMessage);

    chrome.contextMenus.onClicked.addListener(onContextMenuClicked);
}

async function onActionClicked() {
    Logger.log("Browser action clicked");
    let badgeText = await chrome.action.getBadgeText({});
    let n = Number.parseInt(badgeText);

    trackAnalyticsEvent("button_click", {
        id: "main-browser-action-button",
        context: "Browser Action",
        value: String(n || 0),
        legacyTarget: "Browser Action",
        legacyAction: n ? `browser action clicked: ${n}` : "browser action clicked: 0",
        legacyLabel: "Notifications",
    });

    Logger.log(`Browser action text: "${badgeText}"`);
    if (n) chrome.tabs.create({ url: `https://${defaultDomain}/home/notifications` });
    else chrome.tabs.create({ url: `https://${defaultDomain}` });
    chrome.action.setBadgeText({ text: "" });
}

function onNotificationClicked(id: string) {
    Logger.log("Notification clicked");
    trackAnalyticsEvent("perform_action", {
        id: "click",
        context: "Notifications",
        value: id,
        legacyTarget: id,
        legacyAction: "notification click",
        legacyLabel: "Notifications",
    });
    chrome.notifications.clear(id);
    switch (id) {
        case "assignment":
            chrome.tabs.create({ url: `https://${defaultDomain}/home/notifications` });
            chrome.action.setBadgeText({ text: "" });
            break;
        default:
            chrome.tabs.create({ url: `https://${defaultDomain}` });
            break;
    }
}

async function onAlarm(alarm: chrome.alarms.Alarm) {
    if (alarm.name === "messages-unread") {
        try { await updateMessageUnreadCount(); } catch (error) { Logger.error("Unable to refresh unread messages", error); }
        return;
    }
    let storageContent = await chrome.storage.sync.get(null);

    if (alarm && alarm.name === "notification") {
        try {
            Logger.log(`[${new Date()}] Checking for new notifications`);
            if (storageContent.notifications != "disabled") {
                checkForNotifications();
            }
        } catch (error) {
            Logger.error("Error caught:");
            Logger.error(error);
        }
    }
}

function onInstalled(details: chrome.runtime.InstalledDetails) {
    trackAnalyticsEvent("perform_action", {
        id: "runtime_oninstalled",
        value: details.reason,
        context: "Versions",
        legacyTarget: "Runtime onInstalled",
        legacyAction: details.reason,
        legacyLabel: "Versions",
    });

    chrome.contextMenus.create({
        id: "splus-theme-editor",
        title: "Theme Editor",
        contexts: ["action"],
    });

    chrome.contextMenus.create({
        id: "splus-discord",
        title: "Discord Support Server",
        contexts: ["action"],
    });

    chrome.contextMenus.create({
        id: "splus-website",
        title: `${EXTENSION_NAME} Website`,
        contexts: ["action"],
    });
}

function onContextMenuClicked(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) {
    switch (info.menuItemId) {
        case "splus-theme-editor":
            chrome.tabs.create({ url: chrome.runtime.getURL("/theme-editor.html") });
            break;
        case "splus-discord":
            chrome.tabs.create({ url: DISCORD_URL });
            break;
        case "splus-website":
            chrome.tabs.create({
                url: `${EXTENSION_WEBSITE}/?utm_source=ext-context-menu&utm_content=${
                    chrome.runtime.getManifest().version
                }`,
            });
            break;
    }
}

function onMessage(
    request: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
) {
    Logger.log("Received background page message", request);

    if (request.type == "openMessages") {
        void (async () => {
            const tab = sender.tab ?? (await chrome.tabs.query({ active: true, lastFocusedWindow: true }))[0];
            if (!tab?.id) return;
            chrome.tabs.sendMessage(tab.id, {
                type: "openMessagesInSchoology",
            });
        })();
        sendResponse({ success: true });
        return true;
    } else if (request.type === "messagesUnreadCount") {
        const count = Math.max(0, Number(request.count) || 0);
        chrome.action.setBadgeText({ text: count ? String(count) : "" });
        chrome.action.setBadgeBackgroundColor({ color: "#d92d20" });
        chrome.storage.local.set({ messagesUnreadCount: count });
        chrome.tabs.query({ url: ["*://*.schoology.com/*", "https://lms.lausd.net/*"] }, tabs => {
            for (const tab of tabs) if (tab.id) chrome.tabs.sendMessage(tab.id, { type: "messagesUnreadCount", count }).catch(() => {});
        });
        sendResponse({ success: true });
        return true;
    } else if (request.type == "fetch" && request.url !== undefined) {
        Logger.debug("Received fetch request for " + request.url);

        (async function () {
            let finalResponse: Record<string, any> = {};
            let responseObj;
            try {
                responseObj = await fetch(request.url, request.params);
            } catch (e) {
                finalResponse.success = false;
                finalResponse.error = e;
                return finalResponse;
            }

            finalResponse.success = true;

            finalResponse.headers = responseObj.headers;
            finalResponse.ok = responseObj.ok;
            finalResponse.redirected = responseObj.redirected;
            finalResponse.status = responseObj.status;
            finalResponse.statusText = responseObj.statusText;
            finalResponse.type = responseObj.type;
            finalResponse.url = responseObj.url;

            try {
                switch (request.bodyReadType) {
                    case "json":
                        finalResponse.json = await responseObj.json();
                        break;
                    case "text":
                        finalResponse.text = await responseObj.text();
                        break;
                }
            } catch (e) {
                finalResponse.bodyReadError = e || true;
            }

            return finalResponse;
        })()
            .then(x => sendResponse(JSON.stringify(x)))
            .catch(err => sendResponse(JSON.stringify({ success: false, error: err })));

        return true;
    } else if (request.type == "updateDefaultDomain" && request.domain !== undefined) {
        defaultDomain = request.domain;
        assignmentNotificationUrl = `https://${defaultDomain}/home/notifications?filter=all`;
        sendResponse({ success: true });
        return true;
    } else if (request.type == "setBadgeText" && request.text !== undefined) {
        chrome.browserAction.setBadgeText({ text: request.text });
        sendResponse({ success: true });
        return true;
    } else if (request.type == "notification") {
        updateLastTime(request.data.timeModified, request.data.lastTime).then(() => {
            sendNotification(request.data.notification, request.data.name, request.data.count).then(
                () => {
                    sendResponse({ success: true });
                }
            );
        });
        return true;
    } else if (request.type == "declarativeNetRequestRuleset") {
        if (request.action === "enable") {
            chrome.declarativeNetRequest
                .updateEnabledRulesets({
                    enableRulesetIds: [request.rulesetId],
                })
                .then(() => sendResponse({ success: true }));
        } else if (request.action === "disable") {
            chrome.declarativeNetRequest
                .updateEnabledRulesets({
                    disableRulesetIds: [request.rulesetId],
                })
                .then(() => sendResponse({ success: true }));
        }
    }
}

async function checkForNotifications() {
    let storageContents = await chrome.storage.sync.get(null);

    if (getBrowser() === "Firefox") {
        // Firefox doesn't support service workers so it doesn't need offscreen documents
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background#background_pages
        let { notification, name, count, lastTime, timeModified } =
            await loadAssignmentNotifications(
                assignmentNotificationUrl,
                storageContents.lastTime ?? 0
            );
        await updateLastTime(timeModified, lastTime);
        await sendNotification(notification, name, count);
        return;
    }

    // Do below only in Chrome

    // Create an offscreen document if one doesn't exist yet
    await createOffscreenDocument();
    // Now that we have an offscreen document, we can dispatch the
    // message.
    chrome.runtime.sendMessage({
        type: "offscreen-notifications",
        target: "offscreen",
        data: { url: assignmentNotificationUrl, lastTime: storageContents.lastTime ?? 0 },
    });
}

declare var clients: { matchAll: () => Promise<{ url: string }[]> };

async function createOffscreenDocument() {
    try {
        if (!(await hasOffscreenDocument())) {
            await chrome.offscreen.createDocument({
                url: OFFSCREEN_DOCUMENT_PATH,
                reasons: [chrome.offscreen.Reason.DOM_PARSER],
                justification:
                    "Parse Schoology notifications in HTML format",
            });
        }
    } catch (e) {
        Logger.warn("Error creating offscreen document, it probably already exists", e);
    }
}

async function hasOffscreenDocument() {
    // Check all windows controlled by the service worker if one of them is the offscreen document
    const matchedClients = await clients.matchAll();
    for (const client of matchedClients) {
        if (client.url.endsWith(OFFSCREEN_DOCUMENT_PATH)) {
            return true;
        }
    }
    return false;
}

async function trackAnalyticsEvent(name: string, props: any) {
    await createOffscreenDocument();
    let storageContents = await chrome.storage.sync.get(null);
    chrome.runtime.sendMessage({
        type: "offscreen-analytics",
        target: "offscreen",
        data: {
            name,
            props,
            settings: {
                analytics: storageContents.analytics,
                theme: storageContents.theme,
                beta: storageContents.beta,
                version: chrome.runtime.getManifest().version,
                newVersion: storageContents.newVersion,
                randomUserId: getAnalyticsUserId(),
            },
        },
    });
}

load();
