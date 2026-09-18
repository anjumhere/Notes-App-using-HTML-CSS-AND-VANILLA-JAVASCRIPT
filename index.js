// ---------- DOM references ----------
const icon = document.getElementById("bring-button");
const addNotes = document.getElementById("add-notes");
const removeNoteBtn = document.getElementById("remove-notes");
const modalButton = document.getElementById("add-notes");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".back");
const section = document.querySelector(".one");
const addNoteBtn = document.getElementById("add-note-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const viewNotes = document.querySelector(".view-notes");
const hideCard = document.querySelector(".blur");
const viewDltBtn = document.querySelector(".viewdlt-btn");
const search = document.getElementById("search");
const searchBtn = document.getElementById("search-button");
const editNote = document.getElementById("edit-note");
const clearNotes = document.querySelector(".clear-notes");
const clearNotesBtn = document.getElementById("confirm-clear");
const cardHeading = document.getElementById("card-heading");
const cardDetails = document.getElementById("card-details");

// ---------- State ----------
let currentNote = null;
let isEditing = false;

// ---------- Search ----------
// Bug fix: previously a new click listener was attached to searchBtn
// every time the input fired, stacking duplicate handlers.
// Now there's exactly one click listener that reads the live input value.
function runSearch() {
  const query = search.value.toLowerCase();

  document.querySelectorAll(".notes").forEach((note) => {
    const title = note.querySelector(".notes-heading").textContent.toLowerCase();
    const desc = note.querySelector(".notes-des").textContent.toLowerCase();
    const isMatch = title.includes(query) || desc.includes(query);

    note.classList.remove("highlight");
    if (isMatch && query) {
      note.classList.add("highlight");
      setTimeout(() => note.classList.remove("highlight"), 1000);
    }
  });
}

searchBtn.addEventListener("click", runSearch);
search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") runSearch();
});

// ---------- Clear all notes ----------
removeNoteBtn.addEventListener("click", () => {
  clearNotes.classList.add("delete");
});

clearNotesBtn.addEventListener("click", () => {
  document.querySelectorAll(".notes").forEach((note) => note.remove());
  clearNotes.classList.remove("delete");
});

// ---------- Escape key closes overlays ----------
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    clearNotes.classList.remove("delete");
    modal.classList.remove("active");
    viewNotes.classList.remove("appear");
  }
});

// ---------- View note overlay ----------
hideCard.addEventListener("click", () => {
  viewNotes.classList.remove("appear");
});

viewDltBtn.addEventListener("click", () => {
  if (!currentNote) return;
  currentNote.remove();
  currentNote = null;
  viewNotes.classList.remove("appear");
});

// ---------- Add/Edit modal open-close ----------
modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

modalButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});

// ---------- Floating action button ----------
icon.addEventListener("click", () => {
  icon.classList.toggle("rotatef");
  addNotes.classList.toggle("enter");
  removeNoteBtn.classList.toggle("enter");
});

// ---------- Note creation ----------
function getModalData() {
  return {
    title: modalTitle.value,
    description: modalDescription.value,
  };
}

function createNoteElement({ title, description }) {
  const note = document.createElement("div");
  note.classList.add("notes", "display");

  const titleEl = document.createElement("h1");
  titleEl.textContent = title;
  titleEl.classList.add("notes-heading");

  const descEl = document.createElement("p");
  descEl.textContent = description;
  descEl.classList.add("notes-des");

  const actionBtns = document.createElement("div");
  actionBtns.classList.add("action-buttons");

  const editBtn = document.createElement("button");
  editBtn.textContent = "View Notes";
  editBtn.classList.add("edit-button");
  editBtn.addEventListener("click", () => {
    currentNote = note;
    cardHeading.textContent = titleEl.textContent;
    cardDetails.textContent = descEl.textContent;
    viewNotes.classList.add("appear");
  });

  note.append(titleEl, descEl, actionBtns);
  actionBtns.appendChild(editBtn);
  section.appendChild(note);

  return note;
}

// ---------- Edit existing note ----------
editNote.addEventListener("click", () => {
  if (!currentNote) return;

  modal.classList.add("active");
  viewNotes.classList.remove("appear");
  addNoteBtn.textContent = "Edit Note";
  modalTitle.value = currentNote.querySelector(".notes-heading").textContent;
  modalDescription.value = currentNote.querySelector(".notes-des").textContent;
  isEditing = true;
});

// ---------- Save (add or edit) ----------
addNoteBtn.addEventListener("click", () => {
  const data = getModalData();

  if (isEditing && currentNote) {
    currentNote.querySelector(".notes-heading").textContent = data.title;
    currentNote.querySelector(".notes-des").textContent = data.description;
    isEditing = false;
    addNoteBtn.textContent = "Add Note";
  } else {
    createNoteElement(data);
  }

  modal.classList.remove("active");
  modalTitle.value = "";
  modalDescription.value = "";
});
