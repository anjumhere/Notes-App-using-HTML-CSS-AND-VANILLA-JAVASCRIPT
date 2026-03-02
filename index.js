let icon = document.getElementById("bring-button");
const addNotes = document.getElementById("add-notes");
const removeNoteBtn = document.getElementById("remove-notes");
const modalButton = document.getElementById("add-notes");
const modal = document.querySelector(".modal");
const body = document.querySelector("body");
const modalBg = document.querySelector(".back");
const section = document.querySelector(".one");
const addNoteBtn = document.getElementById("add-note-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const viewNotes = document.querySelector(".view-notes");
const hideCard = document.querySelector(".blur");
const viewDltBtn = document.querySelector(".viewdlt-btn");

const editNote = document.getElementById("edit-note");

hideCard.addEventListener("click", () => {
  viewNotes.classList.remove("appear");
  console.log("working");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

modalButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});

icon.addEventListener("click", () => {
  icon.classList.toggle("rotatef");
  addNotes.classList.toggle("enter");
  removeNoteBtn.classList.toggle("enter");
  setTimeout(() => {}, 60);
});

removeNoteBtn.addEventListener("click", () => {
  let notes = document.querySelector(".notes");
  notes.remove();
});

// addNoteBtn.addEventListener("click", () => {
//   dynamicNotes();
//   modal.classList.remove("active");
//   modalTitle.value = "";
//   modalDescription.value = "";
// });

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

  // view button only
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
let currentNote = null;
let isEditing = false;

// OUTSIDE dynamicNotes()
editNote.addEventListener("click", () => {
  if (!currentNote) return;
  modal.classList.add("active");
  viewNotes.classList.remove("appear");
  addNoteBtn.textContent = "Edit Note";
  modalTitle.value = currentNote.querySelector(".notes-heading").textContent;
  modalDescription.value = currentNote.querySelector(".notes-des").textContent;
  isEditing = true;
});

// OUTSIDE dynamicNotes() - but REPLACE the existing addNoteBtn listener
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
