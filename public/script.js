const noteForm = document.getElementById("noteForm");
const notesContainer = document.getElementById("notesContainer");
const noteDateInput = document.getElementById("noteDate");
const noteTextInput = document.getElementById("noteText");
const totalNotesBadge = document.getElementById("totalNotes");
const submitBtn = document.querySelector(".btn-submit");

const filterDateInput = document.getElementById("filterDate");
const clearFilterBtn = document.getElementById("clearFilterBtn");

let editNoteId = null;
let allNotes = [];

noteDateInput.valueAsDate = new Date();

document.addEventListener("DOMContentLoaded", fetchNotes);

// ================= FETCH NOTES =================

async function fetchNotes() {

    try {

        const response = await fetch("/api/notes");

        allNotes = await response.json();

        applyFilterAndRender();

    } catch (err) {

        console.log(err);

        notesContainer.innerHTML =
            `<p class="no-data">Does Not Connect To the server</p>`;
    }

}

// ================= FILTER =================

function applyFilterAndRender() {

    const filterDate = filterDateInput.value;

    let notes = allNotes;

    if (filterDate) {

        notes = allNotes.filter(note => note.date === filterDate);

    }

    renderNotes(notes);

}

filterDateInput.addEventListener("input", applyFilterAndRender);

clearFilterBtn.addEventListener("click", () => {

    filterDateInput.value = "";

    applyFilterAndRender();

});

// ================= RENDER =================

function renderNotes(notes) {

    notesContainer.innerHTML = "";

    totalNotesBadge.innerText =
        `${notes.length} Note${notes.length !== 1 ? "s" : ""}`;

    if (notes.length === 0) {

        notesContainer.innerHTML =
            `<p class="no-data">No Notes Found.</p>`;

        return;

    }

    notes.forEach(note => {

        const date = new Date(note.date);

        const formattedDate = date.toLocaleDateString("en-IN", {

            day: "numeric",

            month: "short",

            year: "numeric"

        });

        const safeText = btoa(unescape(encodeURIComponent(note.text)));

        const card = document.createElement("div");

        card.className = "note-card";

        card.innerHTML = `

        <div>

            <div class="note-date">${formattedDate}</div>

            <p class="note-text">${escapeHTML(note.text)}</p>

        </div>

        <div class="card-footer">

            <button class="btn-action-edit"

            onclick="triggerEdit('${note._id}','${note.date}','${safeText}')">

            Edit

            </button>

            <button class="btn-action-delete"

            onclick="deleteNote('${note._id}')">

            Delete

            </button>

        </div>

        `;

        notesContainer.appendChild(card);

    });

}

// ================= SAVE / UPDATE =================

noteForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const date = noteDateInput.value;

    const text = noteTextInput.value.trim();

    if (!date || !text) return;

    try {

        if (editNoteId) {

            await fetch(`/api/notes/${editNoteId}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    date,

                    text

                })

            });

        }

        else {

            await fetch("/api/notes", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    date,

                    text

                })

            });

        }

        resetForm();

        fetchNotes();

    }

    catch (err) {

        console.log(err);

    }

});

// ================= EDIT =================

function triggerEdit(id, date, encodedText) {

    editNoteId = id;

    noteDateInput.value = date;

    noteTextInput.value =
        decodeURIComponent(escape(atob(encodedText)));

    submitBtn.classList.add("edit-mode");

    submitBtn.innerHTML = "Update Note";

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

// ================= RESET =================

function resetForm() {

    editNoteId = null;

    noteDateInput.valueAsDate = new Date();

    noteTextInput.value = "";

    submitBtn.classList.remove("edit-mode");

    submitBtn.innerHTML = "Save Note";

}

// ================= DELETE =================

async function deleteNote(id) {

    if (!confirm("Delete this note?")) return;

    try {

        await fetch(`/api/notes/${id}`, {

            method: "DELETE"

        });

        fetchNotes();

    }

    catch (err) {

        console.log(err);

    }

}

// ================= HTML Escape =================

function escapeHTML(str) {

    return str.replace(/[&<>'"]/g, tag => ({

        "&": "&amp;",

        "<": "&lt;",

        ">": "&gt;",

        "'": "&#39;",

        '"': "&quot;"

    })[tag]);

}