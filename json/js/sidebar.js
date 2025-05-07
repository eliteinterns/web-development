export function initSidebar() {
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("mainContent");
    const overlay = document.getElementById("overlay");

    const sidebarState = localStorage.getItem("sidebar") || "open";
    if (sidebarState === "collapsed") {
        sidebar.classList.add("collapsed");
        mainContent.classList.add("full-width");
    }

    toggleBtn?.addEventListener("click", () => {
        const isCollapsed = sidebar.classList.toggle("collapsed");
        mainContent.classList.toggle("full-width");
        localStorage.setItem("sidebar", isCollapsed ? "collapsed" : "open");

        if (window.innerWidth <= 768) {
            overlay.classList.toggle("hidden", isCollapsed);
        }
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.add("collapsed");
        mainContent.classList.add("full-width");
        overlay.classList.add("hidden");
    });
}

export function handleResponsiveSidebar() {
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("mainContent");
    const overlay = document.getElementById("overlay");

    const resizeHandler = () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.add("collapsed");
            main.classList.add("full-width");
            overlay.classList.add("hidden");
        } else {
            sidebar.classList.remove("collapsed");
            main.classList.remove("full-width");
            overlay.classList.add("hidden");
        }
    };

    window.addEventListener("resize", resizeHandler);
    resizeHandler();
}