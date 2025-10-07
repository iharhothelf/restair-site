async function setLanguage(lang) {
    try {
        const res = await fetch("lang.json");
        const translations = await res.json();
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        localStorage.setItem("lang", lang);
        updateActiveLangButton(lang);
    } catch (err) {
        console.error("Error loading language JSON:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "en";
    setLanguage(savedLang);

    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });
});
