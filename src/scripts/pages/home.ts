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
    showAssignmentGradesInInbox();
    enableUpcomingAssignmentDrops();


    setTimeout(() => {
        reorderSidebar();
    }, 500);
}

function enableUpcomingAssignmentDrops() {
    const attachDropTargets = () => {
        const assignments = document.querySelectorAll<HTMLElement>(
            ".upcoming-submissions-wrapper .upcoming-event, #upcoming-events .upcoming-event"
        );
        for (const assignment of assignments) {
            if (assignment.dataset.splusUploadDropReady) continue;
            const link = assignment.querySelector<HTMLAnchorElement>('a[href^="/assignment/"]');
            const id = link?.getAttribute("href")?.match(/^\/assignment\/(\d+)/)?.[1];
            if (!link || !id) continue;
            assignment.dataset.splusUploadDropReady = "true";
            assignment.classList.add("splus-upcoming-upload-target");
            const hint = document.createElement("span");
            hint.className = "splus-upcoming-upload-hint";
            hint.textContent = "Drop file to submit";
            assignment.append(hint);

            assignment.addEventListener("dragenter", event => {
                if (!(event as DragEvent).dataTransfer?.types.includes("Files")) return;
                event.preventDefault();
                assignment.classList.add("splus-upcoming-upload-dragging");
            });
            assignment.addEventListener("dragover", event => {
                if (!(event as DragEvent).dataTransfer?.types.includes("Files")) return;
                event.preventDefault();
                assignment.classList.add("splus-upcoming-upload-dragging");
            });
            assignment.addEventListener("dragleave", event => {
                if (!assignment.contains(event.relatedTarget as Node | null)) {
                    assignment.classList.remove("splus-upcoming-upload-dragging");
                }
            });
            assignment.addEventListener("drop", event => {
                const files = (event as DragEvent).dataTransfer?.files;
                if (!files?.length) return;
                event.preventDefault();
                event.stopPropagation();
                assignment.classList.remove("splus-upcoming-upload-dragging");
                submitUpcomingAssignmentFiles(id, files, hint);
            });
        }
    };

    attachDropTargets();
    new MutationObserver(attachDropTargets).observe(document.body, { childList: true, subtree: true });
}

function submitUpcomingAssignmentFiles(assignmentId: string, files: FileList, hint: HTMLElement) {
    hint.textContent = "Opening submission…";
    const frame = document.createElement("iframe");
    frame.className = "splus-upcoming-upload-frame";
    frame.src = `/assignment/${assignmentId}/dropbox/submit`;
    document.body.append(frame);

    let submitted = false;
    const submitWhenReady = () => {
        if (submitted) return;
        const documentInFrame = frame.contentDocument;
        const input = documentInFrame?.querySelector<HTMLInputElement>('input[type="file"]');
        if (!input) return;
        const transfer = new DataTransfer();
        Array.from(files).forEach(file => transfer.items.add(file));
        input.files = transfer.files;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
        const form = input.closest("form");
        const submit = Array.from(
            form?.querySelectorAll<HTMLElement>('button[type="submit"], input[type="submit"]') ?? []
        ).find(button => /submit|upload|save/i.test(button.textContent || (button as HTMLInputElement).value || ""));
        if (!submit) {
            hint.textContent = "File attached—finish submission in the opened form.";
            return;
        }
        submitted = true;
        hint.textContent = "Submitting…";
        window.setTimeout(() => submit.click(), 250);
    };

    frame.addEventListener("load", () => {
        if (!submitted) return submitWhenReady();
        window.clearInterval(retry);
        hint.textContent = "Submitted";
        window.setTimeout(() => frame.remove(), 500);
    });
    const retry = window.setInterval(submitWhenReady, 150);
    window.setTimeout(() => {
        window.clearInterval(retry);
        if (!submitted) {
            hint.textContent = "Could not find Schoology’s upload form.";
            frame.remove();
        }
    }, 10000);
}

const assignmentGradeRequests = new Map<string, Promise<string | null>>();

function gradeFromAssignmentPage(html: string) {
    const page = new DOMParser().parseFromString(html, "text/html");
    const scorePattern = /(?:grade|score|points?)\s*:?\s*([A-F][+-]?|\d+(?:\.\d+)?\s*(?:\/\s*\d+(?:\.\d+)?)?%?)/i;
    const elements = page.querySelectorAll<HTMLElement>(
        '[class*="grade" i], [class*="score" i], [data-testid*="grade" i], [data-testid*="score" i]'
    );

    for (const element of elements) {
        const match = element.textContent?.replace(/\s+/g, " ").match(scorePattern);
        if (match) return match[1].replace(/\s+/g, " ").trim();
    }

    const pageText = page.body.textContent?.replace(/\s+/g, " ") ?? "";
    return pageText.match(scorePattern)?.[1].replace(/\s+/g, " ").trim() ?? null;
}

function fetchAssignmentGrade(url: string) {
    let request = assignmentGradeRequests.get(url);
    if (!request) {
        request = fetch(url, { credentials: "same-origin" })
            .then(response => (response.ok ? response.text() : null))
            .then(html => (html ? gradeFromAssignmentPage(html) : null))
            .catch(() => null);
        assignmentGradeRequests.set(url, request);
    }
    return request;
}

function showAssignmentGradesInInbox() {
    if (!/^\/home\/notifications/.test(location.pathname)) return;
    let scheduled = false;
    const addGrades = async () => {
        scheduled = false;
        const links = [...document.querySelectorAll<HTMLAnchorElement>('a[href^="/assignment/"]')]
            .filter(link => !link.dataset.splusAssignmentGradeChecked)
            .slice(0, 12);

        await Promise.all(
            links.map(async link => {
                link.dataset.splusAssignmentGradeChecked = "true";
                const grade = await fetchAssignmentGrade(new URL(link.href, location.origin).href);
                if (!grade || !link.isConnected) return;
                const badge = document.createElement("span");
                badge.className = "splus-assignment-grade";
                badge.textContent = `Grade: ${grade}`;
                link.insertAdjacentElement("afterend", badge);
            })
        );
    };
    const schedule = () => {
        if (scheduled) return;
        scheduled = true;
        window.setTimeout(addGrades, 150);
    };
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
    schedule();
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

