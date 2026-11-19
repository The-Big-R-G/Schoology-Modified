// modifications to Confirm Submission assessment popup
export async function load() {
    setupSubmissionFileDrop();
}

function setupSubmissionFileDrop() {
    let attached = new WeakSet<HTMLElement>();
    let dropTargets = new WeakMap<HTMLElement, HTMLElement>();
    let activeDropboxButton: HTMLElement | null = null;

    const getDropboxButton = (target: EventTarget | null) => {
        if (!(target instanceof Element)) return null;
        const dropZone = target.closest<HTMLElement>(".splus-assignment-drop-zone");
        return dropZone ? dropTargets.get(dropZone) ?? null : target.closest<HTMLElement>(".dropbox-submit");
    };

    const insertFiles = (files: FileList) => {
        const fileInput = document.querySelector<HTMLInputElement>(
            'input[type="file"]:not(.splus-drop-input)'
        );
        if (!fileInput) return false;
        const transfer = new DataTransfer();
        Array.from(files).forEach(file => transfer.items.add(file));
        fileInput.files = transfer.files;
        fileInput.dispatchEvent(new Event("input", { bubbles: true }));
        fileInput.dispatchEvent(new Event("change", { bubbles: true }));
        return fileInput.files?.length === files.length;
    };

    const openUploadControl = () => {
        const control = Array.from(
            document.querySelectorAll<HTMLElement>('button, input[type="button"], a, label')
        ).find(element => /upload|attach|add file|choose file|browse/i.test(element.textContent || (element as HTMLInputElement).value || ""));
        control?.click();
    };

    const insertFilesAfterOpening = (button: HTMLElement, files: FileList) => {
        button.click();
        let attempts = 0;
        let openedUploadControl = false;
        const timer = window.setInterval(() => {
            if (insertFiles(files)) {
                window.clearInterval(timer);
                window.setTimeout(() => {
                    const submit = Array.from(document.querySelectorAll<HTMLElement>(
                        'button[type="submit"], input[type="submit"], #edit-submit'
                    )).find(control => /submit|upload|save/i.test(
                        control.textContent || (control as HTMLInputElement).value || ""
                    ));
                    submit?.click();
                }, 500);
                return;
            }
            if (++attempts >= 30) {
                window.clearInterval(timer);
                return;
            }
            if (!openedUploadControl && attempts === 5) {
                openedUploadControl = true;
                openUploadControl();
            }
        }, 100);
    };

    document.addEventListener(
        "dragenter",
        event => {
            const button =
                getDropboxButton(event.target) ||
                document.querySelector<HTMLElement>(".dropbox-submit");
            if (!button || (event.target as HTMLElement)?.classList?.contains("splus-drop-input")) return;
            event.preventDefault();
            activeDropboxButton?.classList.remove("splus-file-drop-target");
            activeDropboxButton = button;
            activeDropboxButton.classList.add("splus-file-drop-target");
        },
        true
    );
    document.addEventListener(
        "dragover",
        event => {
            const dragEvent = event as DragEvent;
            const button =
                getDropboxButton(event.target) ||
                document.querySelector<HTMLElement>(".dropbox-submit");
            if ((event.target as HTMLElement)?.classList?.contains("splus-drop-input")) return;
            if (!button) return;
            dragEvent.preventDefault();
            activeDropboxButton?.classList.remove("splus-file-drop-target");
            activeDropboxButton = button;
            activeDropboxButton.classList.add("splus-file-drop-target");
        },
        true
    );
    document.addEventListener(
        "drop",
        event => {
            const dragEvent = event as DragEvent;
            if ((event.target as HTMLElement)?.classList?.contains("splus-drop-input")) return;
            const button =
                getDropboxButton(event.target) ||
                activeDropboxButton ||
                document.querySelector<HTMLElement>(".dropbox-submit");
            if (!button || !dragEvent.dataTransfer?.files.length) return;
            dragEvent.preventDefault();
            dragEvent.stopPropagation();
            button.classList.remove("splus-file-drop-target");
            activeDropboxButton = null;
            insertFilesAfterOpening(button, dragEvent.dataTransfer.files);
        },
        true
    );

    const attach = () => {
        const buttons = Array.from(
            document.querySelectorAll<HTMLElement>(
                'button, input[type="submit"], input[type="button"], a.dropbox-submit'
            )
        ).filter(button =>
            button.matches(".dropbox-submit") ||
            /submit assignment|submit/i.test(
                button.textContent || (button as HTMLInputElement).value || ""
            )
        );

        for (const button of buttons) {
            if (attached.has(button)) continue;
            attached.add(button);

            const dropInput = document.createElement("input");
            dropInput.type = "file";
            dropInput.multiple = true;
            dropInput.className = "splus-drop-input";
            dropInput.setAttribute("aria-label", "Drop files to submit assignment");
            dropInput.addEventListener("change", () => {
                if (dropInput.files?.length) insertFilesAfterOpening(button, dropInput.files);
            });
            const dropHint = document.createElement("span");
            dropHint.className = "splus-drop-hint splus-assignment-drop-zone";
            dropHint.textContent = "Drag files here to submit";
            dropTargets.set(dropHint, button);
            button.classList.add("splus-drop-enabled");
            button.append(dropHint, dropInput);
            button.insertAdjacentElement("afterend", dropHint.cloneNode(true) as HTMLElement);
            const visibleDropHint = button.nextElementSibling as HTMLElement;
            dropTargets.set(visibleDropHint, button);

            button.addEventListener("dragover", event => {
                event.preventDefault();
                button.classList.add("splus-file-drop-target");
            });
            button.addEventListener("dragleave", () => {
                button.classList.remove("splus-file-drop-target");
            });
            button.addEventListener("drop", event => {
                event.preventDefault();
                button.classList.remove("splus-file-drop-target");
                const files = (event as DragEvent).dataTransfer?.files;
                if (!files?.length) return;

                const applyFiles = () => {
                    const fileInput =
                        button.closest("form")?.querySelector<HTMLInputElement>('input[type="file"]') ||
                        document.querySelector<HTMLInputElement>('input[type="file"]');
                    if (!fileInput) return false;
                    const transfer = new DataTransfer();
                    Array.from(files).forEach(file => transfer.items.add(file));
                    fileInput.files = transfer.files;
                    fileInput.dispatchEvent(new Event("input", { bubbles: true }));
                    fileInput.dispatchEvent(new Event("change", { bubbles: true }));
                    return fileInput.files?.length === files.length;
                };

                if (applyFiles() || !button.matches(".dropbox-submit")) return;
                button.click();
                let attempts = 0;
                const waitForUploadInput = window.setInterval(() => {
                    if (applyFiles()) {
                        window.clearInterval(waitForUploadInput);
                        window.setTimeout(() => {
                            const form = button.closest("form") || document;
                            const submit = Array.from(form.querySelectorAll<HTMLElement>(
                                'button[type="submit"], input[type="submit"], #edit-submit'
                            )).find(control => /submit|upload|save/i.test(
                                control.textContent || (control as HTMLInputElement).value || ""
                            ));
                            submit?.click();
                        }, 500);
                    } else if (++attempts >= 20) window.clearInterval(waitForUploadInput);
                }, 100);
            });
        }
    };

    attach();
    new MutationObserver(attach).observe(document.body, { childList: true, subtree: true });
}
