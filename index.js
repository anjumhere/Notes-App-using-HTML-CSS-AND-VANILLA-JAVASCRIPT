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

let currentNote = null;
let isEditing = false;

function runSearch() {
  const query = search.value.toLowerCase();

  document.querySelectorAll(".notes").forEach((note) => {
    const titleEl = note
      .querySelector(".notes-heading")
      .textContent.toLowerCase();
    const descEl = note.querySelector(".notes-des").textContent.toLowerCase();

    if (titleEl.includes(query) || descEl.includes(query)) {
      note.classList.add("highlight");
      setTimeout(() => {
        note.classList.remove("highlight");
      }, 1000);
    } else {
      note.classList.remove("highlight");
    }
  });
}

searchBtn.addEventListener("click", runSearch);
search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") runSearch();
});

// clearing all notes
removeNoteBtn.addEventListener("click", () => {
  clearNotes.classList.add("delete");
});
clearNotesBtn.addEventListener("click", () => {
  document.querySelectorAll(".notes").forEach((note) => note.remove());
  clearNotes.classList.remove("delete");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    clearNotes.classList.remove("delete");
    modal.classList.remove("active");
    viewNotes.classList.remove("appear");
  }
});

// REMOVED: leftover console.log("working") debug statement
hideCard.addEventListener("click", () => {
  viewNotes.classList.remove("appear");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

modalButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});

// REMOVED: no-op setTimeout(() => {}, 60) at the end of this handler
icon.addEventListener("click", () => {
  icon.classList.toggle("rotatef");
  addNotes.classList.toggle("enter");
  removeNoteBtn.classList.toggle("enter");
});

viewDltBtn.addEventListener("click", () => {
  if (currentNote) {
    currentNote.remove();
    currentNote = null;
    viewNotes.classList.remove("appear");
  }
});

function modalData() {
  return {
    title: modalTitle.value,
    description: modalDescription.value,
  };
}

function dynamicNotes() {
  let data = modalData();

  let notes = document.createElement("div");
  notes.classList.add("notes");
  notes.classList.add("display");

  let title = document.createElement("h1");
  title.textContent = data.title;
  title.classList.add("notes-heading");

  let description = document.createElement("p");
  description.textContent = data.description;
  description.classList.add("notes-des");

  let actionBtns = document.createElement("div");
  actionBtns.classList.add("action-buttons");

  let editBtn = document.createElement("button");
  editBtn.textContent = "View Notes";
  editBtn.classList.add("edit-button");
  editBtn.addEventListener("click", () => {
    currentNote = notes;
    let Heading = document.getElementById("card-heading");
    let Details = document.getElementById("card-details");
    Heading.textContent = title.textContent;
    Details.textContent = description.textContent;
    viewNotes.classList.add("appear");
  });

  section.appendChild(notes);
  notes.appendChild(title);
  notes.appendChild(description);
  notes.appendChild(actionBtns);
  actionBtns.appendChild(editBtn);

  return {
    data: notes,
  };
}

editNote.addEventListener("click", () => {
  if (!currentNote) return;
  modal.classList.add("active");
  viewNotes.classList.remove("appear");
  addNoteBtn.textContent = "Edit Note";
  modalTitle.value = currentNote.querySelector(".notes-heading").textContent;
  modalDescription.value = currentNote.querySelector(".notes-des").textContent;
  isEditing = true;
});

addNoteBtn.addEventListener("click", () => {
  if (isEditing && currentNote) {
    currentNote.querySelector(".notes-heading").textContent = modalTitle.value;
    currentNote.querySelector(".notes-des").textContent =
      modalDescription.value;
    isEditing = false;
    addNoteBtn.textContent = "Add Note";
  } else {
    dynamicNotes();
  }
  modal.classList.remove("active");
  modalTitle.value = "";
  modalDescription.value = "";
});
