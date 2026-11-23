import { Logger } from "../utils/logger";
import { Settings } from "../utils/splus-settings";

const GPA_ID = "splus-gpa-summary";
const WHAT_IF_CLASS = "splus-what-if";
let renderScheduled = false;

function gradePoints(grade: number) {
    if (grade >= 98) return 4.3;
    if (grade >= 93) return 4;
    if (grade >= 90) return 3.7;
    if (grade >= 88) return 3.3;
    if (grade >= 85) return 3;
    if (grade >= 82) return 2.7;
    if (grade >= 80) return 2.3;
    if (grade >= 77) return 2;
    if (grade >= 74) return 1.7;
    if (grade >= 72) return 1.3;
    if (grade >= 70) return 1;
    return 0;
}

function parseGrade(text: string) {
    const percent = text.match(/(\d+(?:\.\d+)?)\s*%/);
    if (percent) return Number(percent[1]);
    const letter = text.trim().toUpperCase().match(/^(A\+|A-|A|B\+|B-|B|C\+|C-|C|D\+|D|F)(?=\s|$|\()/)?.[1];
    return {
        "A+": 98, A: 93, "A-": 90,
        "B+": 88, B: 85, "B-": 82,
        "C+": 80, C: 77, "C-": 74,
        "D+": 72, D: 70, F: 0,
    }[letter as "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "F"] ?? null;
}

function isWeightedCourse(title: string) {
    return /\b(AP|IB|HONORS?|HONOURS?|ADVANCED|ACCELERATED|PRE[- ]AP)\b/i.test(title);
}

function numberFrom(text: string) {
    const match = text.replace(/,/g, "").match(/\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : null;
}

function getCourseAssignments(course: HTMLElement) {
    const rows = Array.from(course.querySelectorAll<HTMLElement>("tr.item-row")).map((row, index) => {
        const name = row.querySelector(".assignment-title, .item-title, .assignment-colum a, td:first-child a")?.textContent?.trim()
            || row.querySelector("td:first-child")?.textContent?.trim() || `Assignment ${index + 1}`;
        const gradeCell = row.querySelector(".grade-column, .grade-column-center, .grade-column-right")?.textContent?.trim() || "";
        const rowText = row.textContent?.trim() || "";
        const maxCell = row.querySelector(".max-grade, .max-points, [class*='max-grade']")?.textContent?.trim() || "";
        const max = numberFrom(maxCell)
            ?? numberFrom(gradeCell.match(/\/\s*([\d.]+)/)?.[1] || "")
            ?? numberFrom(rowText.match(/\/\s*([\d.]+)/)?.[1] || "")
            ?? numberFrom(rowText.match(/([\d.]+)\s*(?:points?|pts?)\b/i)?.[1] || "");
        const scoreMatch = gradeCell.match(/([\d.]+)\s*\/\s*[\d.]+/) || rowText.match(/([\d.]+)\s*\/\s*[\d.]+/);
        const score = scoreMatch ? Number(scoreMatch[1]) : null;
        return max && max > 0 ? { row, name, max, score } : null;
    }).filter((item): item is { row: HTMLElement; name: string; max: number; score: number | null } => item !== null);
    if (rows.length) return rows;
    // Course-grade pages can show a compact hierarchical report instead of a table.
    // Treat ungraded assignment links in that report as percentage-based items.
    return Array.from(course.querySelectorAll<HTMLAnchorElement>('a[href*="/assignment/"]'))
        .map((link, index) => {
            const row = (link.closest("button") || link.parentElement || link) as HTMLElement;
            const text = row.parentElement?.textContent || row.textContent || "";
            const scoreMatch = text.match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);
            const percent = text.match(/(\d+(?:\.\d+)?)\s*%/);
            return {
                row,
                name: link.textContent?.trim() || `Assignment ${index + 1}`,
                max: scoreMatch ? Number(scoreMatch[2]) : 100,
                score: scoreMatch ? Number(scoreMatch[1]) : (/[—-]/.test(text) ? null : (percent ? Number(percent[1]) : null)),
            };
        });
}

function addWhatIfCalculator(course: HTMLElement) {
    if (course.querySelector(`.${WHAT_IF_CLASS}`)) return;
    const assignments = getCourseAssignments(course).filter(item => item.score === null);
    if (!assignments.length) return;
    const summary = course.querySelector(".summary-course, .gradebook-course-title, h1, h2, h3");
    const panel = document.createElement("section");
    panel.className = WHAT_IF_CLASS;
    panel.setAttribute("aria-label", "What-if grade calculator");
    panel.innerHTML = `<div class="splus-what-if-heading"><strong>What-if grade calculator</strong><span>Try scores for ${assignments.length} ungraded assignment${assignments.length === 1 ? "" : "s"}</span></div><div class="splus-what-if-fields"></div><div class="splus-what-if-result"></div>`;
    const fields = panel.querySelector(".splus-what-if-fields") as HTMLElement;
    const result = panel.querySelector(".splus-what-if-result") as HTMLElement;
    const update = () => {
        const graded = getCourseAssignments(course).filter(item => item.score !== null);
        const hypothetical = assignments.reduce((sum, item) => sum + (Number((item.row.querySelector(".splus-what-if-input") as HTMLInputElement)?.value) || 0), 0);
        const possible = graded.reduce((sum, item) => sum + item.max, 0) + assignments.reduce((sum, item) => sum + item.max, 0);
        const earned = graded.reduce((sum, item) => sum + (item.score || 0), 0) + hypothetical;
        const currentPossible = graded.reduce((sum, item) => sum + item.max, 0);
        const current = currentPossible ? graded.reduce((sum, item) => sum + (item.score || 0), 0) / currentPossible * 100 : null;
        const projected = possible ? earned / possible * 100 : 0;
        result.innerHTML = `<span>Projected grade: <b>${projected.toFixed(2)}%</b></span>${current === null ? "" : `<span>Current graded work: ${current.toFixed(2)}%</span>`}`;
    };
    assignments.forEach(item => {
        const label = document.createElement("label");
        label.textContent = `${item.name} (${item.max} pts)`;
        const input = document.createElement("input");
        input.className = "splus-what-if-input";
        input.type = "number";
        input.min = "0";
        input.max = String(item.max);
        input.step = "any";
        input.placeholder = "score";
        input.setAttribute("aria-label", `Hypothetical score for ${item.name}`);
        input.addEventListener("input", update);
        label.append(input);
        fields.append(label);
    });
    if (summary) summary.insertAdjacentElement("afterend", panel);
    else course.prepend(panel);
    update();
}

function render() {
    if (Settings.GpaDisplay.value === "disabled") {
        document.getElementById(GPA_ID)?.remove();
        return;
    }

    const courses = Array.from(
        (document.getElementById("main-inner") || document.getElementById("content-wrapper"))
            ?.querySelectorAll<HTMLElement>(".gradebook-course") ?? []
    );
    courses.forEach(addWhatIfCalculator);
    const values = courses
        .map(course => {
            const title = course.querySelector(".gradebook-course-title")?.textContent ?? "";
            const gradeText = course.querySelector(".summary-course .awarded-grade")?.textContent ?? "";
            const grade = parseGrade(gradeText);
            return grade === null ? null : { grade, weighted: isWeightedCourse(title) };
        })
        .filter((course): course is { grade: number; weighted: boolean } => course !== null);
    if (!values.length) return;

    const unweighted = values.reduce((sum, course) => sum + gradePoints(course.grade), 0) / values.length;
    const weighted = values.reduce(
        (sum, course) => sum + Math.min(5.3, gradePoints(course.grade) + (course.weighted ? 1 : 0)),
        0
    ) / values.length;

    let panel = document.getElementById(GPA_ID);
    if (!panel) {
        panel = document.createElement("section");
        panel.id = GPA_ID;
        panel.setAttribute("aria-label", "Grade point average");
        const target = document.getElementById("main-inner") || document.getElementById("content-wrapper");
        target?.prepend(panel);
    }
    const display = Settings.GpaDisplay.value;
    const content = `<strong>GPA</strong>${display !== "weighted" ? `<span>Unweighted: ${unweighted.toFixed(2)}</span>` : ""}${display !== "unweighted" ? `<span>Weighted: ${weighted.toFixed(2)}</span>` : ""}`;
    if (panel.innerHTML !== content) panel.innerHTML = content;
}

export async function load() {
    try {
        const scheduleRender = () => {
            if (renderScheduled) return;
            renderScheduled = true;
            window.setTimeout(() => {
                renderScheduled = false;
                render();
            }, 100);
        };
        scheduleRender();
        new MutationObserver(mutations => {
            if (mutations.some(mutation => !(mutation.target as HTMLElement).closest?.(`#${GPA_ID}`))) {
                scheduleRender();
            }
        }).observe(document.body, { childList: true, subtree: true });
    } catch (error) {
        Logger.error("Unable to display GPA", error);
    }
}
