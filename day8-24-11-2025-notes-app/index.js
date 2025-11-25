const express = require('express');
const app = express();

const PORT = 3002;
let counter = 4;
app.use(express.json());

const isValidAPIKey = (apiKey) => {
    return apiKey.toString() === "12345";
};

const isValidValue = (value) => {
    return value !== undefined && value !== null;
}

app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (isValidAPIKey(apiKey)) {
        next();
    }
    else {
        res.status(401).send('Unauthorised');
    }
});

const notes = [
    {
        id: 1,
        title: "MS Office",
        content: "This system do not have MS Office installed"
    }, {
        id: 2,
        title: "Laptop Repair",
        content: "Type C Port is not working"
    }, {
        id: 3,
        title: "Workshop",
        content: "Training missing"
    }
];

app.post('/notes', (req, res) => {
    try {
        const { title, content } = req.body;
        notes.push({
            id: counter,
            title: title,
            content: content
        });
        counter += 1;

        res.status(201).json({
            title: title,
            content: content,
            message: "Notes saved successfully"
        });
    } catch (error) {
        res.status(500).send(`Internal server error`);
    }
});

app.get('/notes', (req, res) => {
    res.status(200).json(notes);
});

app.get('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const filteredNotesById = notes.filter(note => note.id === id);
    if (Array.isArray(filteredNotesById) && filteredNotesById.length) {
        return res.status(200).json(filteredNotesById);
    }
    res.status(404).send('Not Found');
});

app.put('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const { title, content } = req.body;

    try {
        const index = notes.findIndex(note => note.id === id);
        const newNote = {
            id: id,
            title: title,
            content: content
        };
        if (isValidValue(index)) {
            notes[index] = newNote;

            res.status(201).json({
                title: title,
                content: content,
                message: "Notes updated successfully"
            });
        }
        res.status(404).send('Not Found');
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = notes.findIndex(note => note.id === id);
    try {
        const { title, content } = notes[index];
        if (isValidValue(index)) {
            notes.splice(index, 1);
            return res.status(200).json({
                title: title,
                content: content,
                message: 'Content deleted successfully'
            });
        }
        res.status(404).send('Not Found');
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }

});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});