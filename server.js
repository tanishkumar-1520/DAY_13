const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- 🍃 MongoDB Connection Setup ---
const MONGO_URI = 'mongodb+srv://rakhi57776_db_user:db_password@cluster0.lvpd42j.mongodb.net/';

mongoose.connect(MONGO_URI)
    .then(() => console.log('🍃 MongoDB Connected Successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

// --- 📄 Mongoose Schema & Model Setup ---
const noteSchema = new mongoose.Schema({
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

noteSchema.virtual('id').get(function() {
    return this._id.toHexString();
});
noteSchema.set('toJSON', { virtuals: true });

const Note = mongoose.model('Note', noteSchema);


// --- 🌐 API ENDPOINTS ---

// 1. Get all notes from MongoDB (Sorted by date - Newest first)
app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find().sort({ date: -1, createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Data fetch karne mein dikkat aayi!' });
    }
});

// 2. Add a new note to MongoDB
app.post('/api/notes', async (req, res) => {
    const { date, text } = req.body;
    if (!date || !text) {
        return res.status(400).json({ error: 'it must filled date and text' });
    }

    try {
        const newNote = new Note({ date, text });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: 'Note does not save !' });
    }
});

// 3. Update/Edit a note in MongoDB
app.put('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { text, date } = req.body;

    try {
        const updatedData = {};
        if (text) updatedData.text = text;
        if (date) updatedData.date = date;

        const updatedNote = await Note.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json({ message: 'Note successfully updatd!', updatedNote });
    } catch (error) {
        res.status(500).json({ error: 'problem to the update note' });
    }
});

// 4. Delete a note from MongoDB
app.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json({ message: 'Note successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: 'problem to delete note' });
    }
});

// Server Listen
app.listen(PORT, () => {
    console.log(`🚀 Server chal raha hai: http://localhost:${PORT}`);
});
