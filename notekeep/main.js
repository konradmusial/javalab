function getNotes() {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return [];
    } else {
        return JSON.parse(notes);
    }
}

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function createNote() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const color = document.getElementById('color').value;
    const pin = document.getElementById('pin').checked;
    const tagsInput = document.getElementById('tags').value;
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [];
    const createdDate = new Date().toLocaleString();

    const newNote = {
        title: title,
        content: content,
        color: color,
        pin: pin,
        tags: tags,
        createdDate: createdDate
    };

    const notes = getNotes();
    notes.push(newNote);
    saveNotes(notes);
    renderNotes();
}

function renderNotes() {
    const notes = getNotes();
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    notes
        .filter(note => {
            return (
                note.title.toLowerCase().includes(searchQuery) ||
                note.content.toLowerCase().includes(searchQuery) ||
                (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
            );
        })
        .sort((a, b) => b.pin - a.pin)
        .forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.style.backgroundColor = note.color;
            noteDiv.style.padding = '10px';
            noteDiv.style.margin = '10px';
            noteDiv.style.border = '1px solid black';

            if (note.pin) {
                noteDiv.style.border = '2px solid gold';
            }

            noteDiv.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <small>Utworzono: ${note.createdDate}</small><br>
                <small>Tagi: ${note.tags && note.tags.length > 0 ? note.tags.join(', ') : 'Brak tagów'}</small><br>
                <button onclick="editTags(${index})">Edytuj tagi</button>
                <button onclick="deleteNote(${index})">Usuń</button>
            `;

            notesContainer.appendChild(noteDiv);
        });
}

function editTags(noteIndex) {
    const notes = getNotes();
    const note = notes[noteIndex];
    const newTagsInput = prompt("Wpisz nowe tagi, oddzielone przecinkami", note.tags ? note.tags.join(', ') : '');

    if (newTagsInput !== null) {
        note.tags = newTagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        saveNotes(notes);
        renderNotes();
    }
}

function deleteNote(noteIndex) {
    const notes = getNotes();
    notes.splice(noteIndex, 1);
    saveNotes(notes);
    renderNotes();
}

document.getElementById('noteForm').addEventListener('submit', function (event) {
    event.preventDefault();
    createNote();
});

renderNotes();
