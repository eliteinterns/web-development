export function initTheme() {
    const darkThemeBtn = document.getElementById("darkTheme");
    const lightThemeBtn = document.getElementById("lightTheme");
    const body = document.body;

    const savedTheme = localStorage.getItem("theme") || "dark";
    body.className = `${savedTheme}-theme`;
    updateThemeButtons(savedTheme);

    darkThemeBtn.addEventListener("click", () => {
        body.className = "dark-theme";
        updateThemeButtons("dark");
        localStorage.setItem("theme", "dark");
    });

    lightThemeBtn.addEventListener("click", () => {
        body.className = "light-theme";
        updateThemeButtons("light");
        localStorage.setItem("theme", "light");
    });
}

function updateThemeButtons(theme) {
    const darkThemeBtn = document.getElementById("darkTheme");
    const lightThemeBtn = document.getElementById("lightTheme");
    darkThemeBtn.classList.toggle("active", theme === "dark");
    lightThemeBtn.classList.toggle("active", theme === "light");
}