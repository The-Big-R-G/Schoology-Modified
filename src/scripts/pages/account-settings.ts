import { Settings } from "../utils/splus-settings";

export function load() {
    const target = document.getElementById("main-inner") || document.getElementById("content-wrapper");
    if (!target || document.getElementById("splus-gpa-setting")) return;

    const wrapper = document.createElement("section");
    wrapper.id = "splus-gpa-setting";
    wrapper.innerHTML = `<h2>Schoology Plus</h2><label for="splus-gpa-display">Grade GPA display</label><select id="splus-gpa-display"><option value="both">Weighted and unweighted GPA</option><option value="weighted">Weighted GPA only</option><option value="unweighted">Unweighted GPA only</option><option value="disabled">Hide GPA</option></select>`;
    const select = wrapper.querySelector<HTMLSelectElement>("select")!;
    select.value = Settings.GpaDisplay.value;
    select.addEventListener("change", async () => {
        await Settings.GpaDisplay.setValue(select.value as typeof Settings.GpaDisplay.value);
    });
    target.prepend(wrapper);
}
