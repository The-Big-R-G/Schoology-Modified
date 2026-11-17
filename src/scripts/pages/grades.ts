import { Logger } from "../utils/logger";
import { Settings } from "../utils/splus-settings";

const GPA_ID = "splus-gpa-summary";
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

function render() {
    if (Settings.GpaDisplay.value === "disabled") {
        document.getElementById(GPA_ID)?.remove();
        return;
    }

    const courses = Array.from(
        (document.getElementById("main-inner") || document.getElementById("content-wrapper"))
            ?.querySelectorAll<HTMLElement>(".gradebook-course") ?? []
    );
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
        (sum, course) => sum + Math.min(5, gradePoints(course.grade) + (course.weighted ? 1 : 0)),
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
