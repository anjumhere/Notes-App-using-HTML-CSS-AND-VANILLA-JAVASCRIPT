# Noter

A lightweight, vanilla JavaScript notes app. Add, view, edit, search, and delete notes — no framework, no build step.

🔗 [Live demo](https://anjumhere.github.io/Notes-App-using-HTML-CSS-AND-VANILLA-JAVASCRIPT/)

## Features

- **Add notes** — click the floating action button, then "Add Note" to open the modal and enter a title and description.
- **View notes** — click "View Notes" on any note card to see it in full in an overlay.
- **Edit notes** — from the view overlay, click "Edit" to reopen the modal pre-filled with that note's content.
- **Delete a single note** — from the view overlay, click delete to remove the currently viewed note.
- **Clear all notes** — click the remove-notes button, then confirm, to delete every note at once.
- **Search** — type in the search box and click the search button (or press Enter) to highlight matching notes by title or description.
- **Escape to close** — pressing `Esc` closes the modal, the view overlay, and the clear-all confirmation.

## Project structure

```
.
├── index.html      # Markup (modal, note cards container, overlays, search bar)
├── style.css       # Styling and animation classes (.active, .appear, .enter, .highlight, .delete)
└── script.js       # App logic
```

> Adjust the `script.js` filename above if your repo names it differently (e.g. `notes-app.js`).

## How it works

- Notes are plain DOM elements (`.notes` divs) appended to a container (`.one`); there's no persistence layer, so notes reset on page reload.
- The add/edit modal is reused for both actions: an `isEditing` flag and a `currentNote` reference decide whether "Save" creates a new note or updates the one currently open.
- Search filters by adding/removing a `.highlight` class rather than hiding non-matching notes.

## Running locally

```bash
git clone https://github.com/anjumhere/Notes-App-using-HTML-CSS-AND-VANILLA-JAVASCRIPT.git
cd Notes-App-using-HTML-CSS-AND-VANILLA-JAVASCRIPT
```

No build step required — just open `index.html` in a browser, or serve the folder with any static server:

```bash
npx serve .
```

## Known limitations

- Notes aren't saved anywhere — refreshing the page clears them. Adding `localStorage` persistence would be a natural next step.
- Search matches are visual only (highlight), not filtered/sorted.

## License

MIT
