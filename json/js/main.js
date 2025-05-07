import { initTheme } from './theme.js';
import { initSidebar, handleResponsiveSidebar } from './sidebar.js';
import { setupCopyHandler } from './copy.js';
import { loadNotes, renderNoteList, setupNoteClickEvents, showNote, highlightActiveNote, getNotesFromLocalStorage } from './notes.js';

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initSidebar();
  setupCopyHandler();
  handleResponsiveSidebar();

  loadNotes().then((allNotes) => {
    const savedNotes = getNotesFromLocalStorage();
    const notes = savedNotes.length ? savedNotes : allNotes;

    // Render after ensuring layout stability
    requestAnimationFrame(() => {
      renderNoteList(notes);
      setupNoteClickEvents();
    });

    const noteIdFromHash = parseInt(window.location.hash.substring(1));
    const noteToShow = notes.find((note) => note.id === noteIdFromHash);
    const activeId = noteToShow ? noteIdFromHash : notes[0]?.id || 1;

    showNote(activeId);
    highlightActiveNote(activeId);
  });

  setTimeout(() => document.body.classList.remove("no-transition"), 100);
});

window.addEventListener("hashchange", () => {
  const noteIdFromHash = parseInt(window.location.hash.substring(1));
  if (!isNaN(noteIdFromHash)) {
    showNote(noteIdFromHash);
    highlightActiveNote(noteIdFromHash);
  }
});