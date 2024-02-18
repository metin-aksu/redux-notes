const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors'); // Cors paketini ekledik

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors()); // Cors middleware'ini ekledik

// Notları depolamak için kullanılacak JSON dosyasının yolu
const notesFilePath = './notes.json';

// Notları JSON dosyasından oku
function readNotesFromFile() {
    const notesData = fs.readFileSync(notesFilePath);
    return JSON.parse(notesData);
}

// Notları JSON dosyasına yaz
function writeNotesToFile(notes) {
    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 4));
}

// Tüm notları getir
app.get('/notes', (req, res) => {
    const notes = readNotesFromFile();
    res.json(notes);
});

// Yeni not ekle
app.post('/notes', (req, res) => {
    const { note, color } = req.body;
    const notes = readNotesFromFile();
    const id = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
    const newNote = { id, note, color };
    notes.push(newNote);
    writeNotesToFile(notes);
    res.json(newNote);
});

// Notu sil
app.delete('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let notes = readNotesFromFile();
    const index = notes.findIndex(note => note.id === id);

    if (index !== -1) {
        notes = notes.filter(note => note.id !== id);
        writeNotesToFile(notes);
        res.sendStatus(200);
    } else {
        res.status(404).send('Note not found');
    }
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
