import { Logger } from "../utils/logger";
import { Settings } from "../utils/splus-settings";

const GPA_ID = "splus-gpa-summary";
let renderScheduled = false;

function gradePoints(grade: number) {
    if (grade >= 90) return 4;
    if (grade >= 80) return 3;
    if (grade >= 70) return 2;
    if (grade >= 60) return 1;
    return 0;
}

function parseGrade(text: string) {
    const percent = text.match(/(\d+(?:\.\d+)?)\s*%/);
    if (percent) return Number(percent[1]);
    const letter = text.trim().toUpperCase().charAt(0);
    return { A: 95, B: 85, C: 75, D: 65, F: 0 }[letter as "A" | "B" | "C" | "D" | "F"] ?? null;
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
