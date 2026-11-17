import DOMPurify from "dompurify";

import { trackEvent } from "../utils/analytics";
import { Broadcast } from "../utils/broadcast";
import { EXTENSION_NAME, EXTENSION_WEBSITE } from "../utils/constants";
import { createButton, createElement, createSvgLogo, waitForElement } from "../utils/dom";
import { Logger } from "../utils/logger";
import Modal from "../utils/modal";
import { SIDEBAR_SECTIONS, SIDEBAR_SECTIONS_MAP } from "../utils/settings";
import { Settings } from "../utils/splus-settings";
import { compareVersions } from "../utils/version";

export async function load() {
    loadBroadcasts();


    setTimeout(() => {
        reorderSidebar();
    }, 500);
}

function loadBroadcasts() {
    let homeFeedContainer = document.getElementById("home-feed-container");
    let feed =
        homeFeedContainer &&
        homeFeedContainer.querySelector<HTMLElement>(".feed .item-list .s-edge-feed");

    if (homeFeedContainer && Settings.Broadcasts.value !== "disabled") {
        (async function () {
            await waitForElement("#home-feed-container #edge-filters");

            // we Should only be observing changes to style on homeFeedContainer
            // style is set on homeFeedContainer whenever Schoology decides to unhide it (static CSS sets display: none), i.e. when it's finished loading
            // once this happens, we can do our thing

            let unreadBroadcasts: Broadcast[] = Settings.UnreadBroadcasts.value;
            let onlineBroadcasts: Broadcast[] = [];

            try {
                onlineBroadcasts = await (await fetch(`${EXTENSION_WEBSITE}/alert.json`)).json();

                let readBroadcasts = localStorage.getItem("splus-readBroadcasts");
                let parsedReadBroadcasts: string[] =
                    readBroadcasts === null ? [] : JSON.parse(readBroadcasts);

                onlineBroadcasts = onlineBroadcasts.filter(
                    b =>
                        !parsedReadBroadcasts.includes(b.id) &&
                        !unreadBroadcasts.map(u => u.id).includes(b.id)
                );

                for (let onlineBroadcast of onlineBroadcasts) {
                    onlineBroadcast.title = DOMPurify.sanitize(onlineBroadcast.title);
                    onlineBroadcast.message = DOMPurify.sanitize(onlineBroadcast.message);
                }
            } catch (err) {
                // Ignore
            }

            let unexpiredBroadcasts: Broadcast[] = [];
            for (let broadcast of [...unreadBroadcasts, ...onlineBroadcasts]) {
                if (
                    (!broadcast.expires || broadcast.expires > Date.now()) &&
                    (!broadcast.version ||
                        compareVersions(chrome.runtime.getManifest().version, broadcast.version) >=
                            0)
                ) {
                    feed?.insertAdjacentElement("afterbegin", postFromBroadcast(broadcast));
                    unexpiredBroadcasts.push(broadcast);
                }
            }

            // remove expired broadcasts
            Settings.UnreadBroadcasts.setValue(unexpiredBroadcasts);
        })();
    }
}

function postFromBroadcast(broadcast: Broadcast) {
    let element = createElement(
        "li",
        ["splus-broadcast-post"],
        {
            id: `broadcast${broadcast.id}`,
            // Migration note: previously this was a top-level attribute called timestamp??
            // Doesn't seem to be used anywhere?
            dataset: {
                timestamp: (
                    (broadcast.timestamp ? new Date(broadcast.timestamp).getTime() : Date.now()) /
                    1000
                ).toString(),
            },
        },
        [
            createElement("div", ["s-edge-type-update-post", "sUpdate-processed"], {}, [
                createElement("div", ["edge-item"], {}, [
                    createElement("div", ["edge-left"], {}, [
                        createElement("div", ["picture"], {}, [
                            createElement(
                                "a",
                                ["sExtlink-processed"],
                                { href: "", title: `${EXTENSION_NAME} Broadcast` },
                                [
                                    createElement("div", ["profile-picture-wrapper"], {}, [
                                        createElement("div", ["profile-picture"], {}, [
                                            createElement(
                                                "img",
                                                ["imagecache", "imagecache-profile_sm"],
                                                {
                                                    src: chrome.runtime.getURL("imgs/icon@128.png"),
                                                    alt: `${EXTENSION_NAME} Logo`,
                                                }
                                            ),
                                        ]),
                                    ]),
                                ]
                            ),
                        ]),
                    ]),
                    createElement("div", ["edge-main-wrapper"], {}, [
                        createElement("span", ["edge-sentence"], {}, [
                            createElement("div", ["update-sentence-inner"], {}, [
                                createElement("a", ["sExtlink-processed"], {
                                    textContent: EXTENSION_NAME.toUpperCase(),
                                    href: EXTENSION_WEBSITE,
                                }),
                                createElement("span", ["blue-arrow-right"], {}, [
                                    createElement("span", ["visually-hidden"], {
                                        textContent: "posted to",
                                    }),
                                ]),
                                createElement("a", ["sExtlink-processed"], {
                                    textContent: `${EXTENSION_NAME} Announcements`,
                                }),
                                createElement("span", ["splus-broadcast-close"], {
                                    textContent: "×",
                                    title: "Dismiss notification",
                                    onclick: () =>
                                        trackEvent("button_click", {
                                            id: "close",
                                            context: "Broadcast",
                                            value: broadcast.id,
                                            legacyTarget: `broadcast${broadcast.id}`,
                                            legacyAction: "close",
                                            legacyLabel: "Broadcast",
                                        }),
                                }),
                                createElement("span", ["update-body", "s-rte"], {}, [
                                    createElement("p", ["no-margins"], {}, [
                                        createElement("strong", ["splus-broadcast-title"], {
                                            innerHTML: broadcast.title,
                                        }),
                                    ]),
                                    createElement("p", ["small-top-margin"], {
                                        innerHTML: broadcast.message,
                                    }),
                                ]),
                            ]),
                        ]),
                        createElement("span", ["edge-main"], {}, [
                            createElement("div", ["post-body"]),
                        ]),
                        createElement("div", ["edge-footer"], {}, [
                            createElement("div", ["created"], {}, [
                                createElement("span", ["small", "gray"], {
                                    textContent: `${formatDateAsString(
                                        new Date(broadcast.timestamp ?? Date.now())
                                    )} | This post is pinned to the top`,
                                }),
                            ]),
                        ]),
                    ]),
                ]),
            ]),
        ]
    );

    let arrow = element.querySelector(".blue-arrow-right");
    arrow?.insertAdjacentText("beforebegin", " ");
    arrow?.insertAdjacentText("afterend", " ");

    let closeButton = element.querySelector<HTMLElement>(".splus-broadcast-close");
    if (closeButton) {
        closeButton.dataset.broadcastId = broadcast.id;
        closeButton.addEventListener("click", dismissNotification);
    }

    return element;
}

function dismissNotification(event: Event) {
    let id = (event.target as HTMLElement)?.dataset?.broadcastId;

    if (!id) return;

    let unreadBroadcasts = Settings.UnreadBroadcasts.value;
    unreadBroadcasts.splice(
        unreadBroadcasts.findIndex(x => x.id == id),
        1
    );
    Settings.UnreadBroadcasts.setValue(unreadBroadcasts);

    let readBroadcasts = localStorage.getItem("splus-readBroadcasts");
    let parsedReadBroadcasts: string[] = readBroadcasts === null ? [] : JSON.parse(readBroadcasts);
    parsedReadBroadcasts.push(id);
    localStorage.setItem("splus-readBroadcasts", JSON.stringify(parsedReadBroadcasts));

    document.getElementById(`broadcast${id}`)!.outerHTML = "";
}

function formatDateAsString(date: Date) {
    return `${date.toLocaleString("en-US", { weekday: "short" })} ${date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })} at ${date.toLocaleString("en-US", { hour: "numeric", minute: "2-digit" }).toLowerCase()}`;
}

function reorderSidebar() {
    let sidebar = document.getElementById("right-column-inner");
    let sidebarOrder = Settings.SidebarSectionOrder.value;
    let excluded = sidebarOrder?.exclude || [];
    let included = Array.from(sidebarOrder?.include || []).reverse();

    for (let section of Array.from(SIDEBAR_SECTIONS).reverse()) {
        if (!included.includes(section.name) && !excluded.includes(section.name)) {
            if (section) {
                let element = document.querySelector(section.selector);
                if (element) {
                    sidebar?.insertAdjacentElement("afterbegin", element);
                }
            }
        }
    }

    for (let sectionName of included) {
        let section = SIDEBAR_SECTIONS_MAP[sectionName];
        if (section) {
            let element = document.querySelector(section.selector);
            if (element) {
                sidebar?.insertAdjacentElement("afterbegin", element);
            }
        }
    }

    for (let sectionName of excluded) {
        let section = SIDEBAR_SECTIONS_MAP[sectionName];
        if (section) {
            let element = document.querySelector<HTMLElement>(section.selector);
            if (element) {
                element.style.display = "none";
            }
        }
    }

    try {
        document.getElementById("todo")?.remove();
        let overdueHeading = document.querySelector(
            `${SIDEBAR_SECTIONS_MAP["Overdue"].selector} h4`
        );
        overdueHeading?.replaceWith(
            createElement("h3", [], {
                style: { textTransform: "capitalize" },
                textContent: overdueHeading.textContent?.toLowerCase(),
            })
        );
        let upcomingHeading = document.querySelector(
            `${SIDEBAR_SECTIONS_MAP["Upcoming"].selector} h4`
        );
        upcomingHeading?.replaceWith(
            createElement("h3", [], {
                style: { textTransform: "capitalize" },
                textContent: upcomingHeading.textContent?.toLowerCase(),
            })
        );
    } catch {}
}

