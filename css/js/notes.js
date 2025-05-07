export function loadNotes() {
    return new Promise((resolve, reject) => {
        if (window.notes?.length) {
            resolve(window.notes);
        } else {
            const script = document.createElement("script");
            script.src = "data.js";
            script.onload = () => resolve(window.notes || []);
            script.onerror = reject;
            document.body.appendChild(script);
        }
    });
}

export function getNotesFromLocalStorage() {
    try {
        const stored = localStorage.getItem("notes");
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function renderNoteList(notes) {
    const sidebar = document.querySelector(".note-list");
    if (!sidebar) return;

    sidebar.innerHTML = notes.map((note, i) =>
        `<li class="note-item${i === 0 ? " active" : ""}" data-id="${note.id}">${note.title}</li>`
    ).join("");
}

export function setupNoteClickEvents() {
    document.querySelectorAll(".note-item").forEach((item) => {
        item.addEventListener("click", () => {
            const noteId = parseInt(item.getAttribute("data-id"));
            document.querySelector(".note-item.active")?.classList.remove("active");
            item.classList.add("active");

            showNote(noteId);
            window.location.hash = `#${noteId}`;

            if (window.innerWidth <= 768) {
                document.getElementById("sidebar").classList.add("collapsed");
                document.getElementById("mainContent").classList.add("full-width");
                document.getElementById("overlay").classList.add("hidden");
            }
        });
    });
}

export function showNote(id) {
    const note = window.notes.find((n) => n.id === id);
    if (!note) return;

    const titleEl = document.getElementById("noteTitle");
    const descEl = document.getElementById("noteDescription");
    const inputEl = document.getElementById("inputCode");
    const outputEl = document.getElementById("renderedOutput");

    [titleEl, descEl, inputEl, outputEl].forEach(el => el.style.opacity = 0);

    setTimeout(() => {
        titleEl.textContent = note.title;
        descEl.textContent = note.description || "";
        inputEl.textContent = note.inputCode;
        outputEl.innerHTML = note.outputCode;

        [titleEl, descEl, inputEl, outputEl].forEach(el => {
            el.style.transition = "opacity 0.3s ease-in-out";
            el.style.opacity = 1;
        });
    }, 200);
}

export function highlightActiveNote(id) {
    document.querySelectorAll(".note-item").forEach((el) => {
        el.classList.toggle("active", parseInt(el.getAttribute("data-id")) === id);
    });
}