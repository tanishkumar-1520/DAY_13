const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ================= MongoDB Connection =================

mongoose.connect(
"mongodb+srv://rakhi57776_db_user:YOUR_PASSWORD@cluster0.fgcgb6v.mongodb.net/NotesDB?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("MongoDB Error");
    console.log(err);
});

// ================= Schema =================

const noteSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const Note = mongoose.model("Note", noteSchema);

// ================= GET =================

app.get("/api/notes", async (req, res) => {

    try {

        const notes = await Note.find().sort({ _id: -1 });

        res.json(notes);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ================= POST =================

app.post("/api/notes", async (req, res) => {

    try {

        const note = new Note({

            date: req.body.date,

            text: req.body.text

        });

        await note.save();

        res.status(201).json(note);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ================= UPDATE =================

app.put("/api/notes/:id", async (req, res) => {

    try {

        const updated = await Note.findByIdAndUpdate(

            req.params.id,

            {

                date: req.body.date,

                text: req.body.text

            },

            {

                new: true

            }

        );

        res.json(updated);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

// ================= DELETE =================

app.delete("/api/notes/:id", async (req, res) => {

    try {

        await Note.findByIdAndDelete(req.params.id);

        res.json({

            message: "Deleted Successfully"

        });

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

// ================= Server =================

app.listen(PORT, () => {

    console.log(`Server Running : http://localhost:${PORT}`);

});
