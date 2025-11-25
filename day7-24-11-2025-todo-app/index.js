const express = require('express');
const app = express();

const PORT = 3001;

app.use(express.json());
let counter = 4;

const todos = [
    {
        id: 1,
        fName: "Ankit",
        task: "Study express"
    }, {
        id: 2, 
        fName: "Ankita",
        task: "Have lemon tea"
    }, {
        id: 3,
        fName: "Ransh",
        task: "Hit gym by 6pm"
    }, {
        id: 4, 
        fName: "Developer",
        task: "Merge code by EOD"
    }
];

app.post('/task/create', (req, res) => {
    try {
        const { fName, task } = req.body;
        todos.push({
            id: counter + 1,
            fName: fName,
            task: task
        });
        counter += 1;

        res.status(201).json({
            fName: fName, 
            task: task, 
            message: "Task created successfully"
        });
    }
    catch(error) {
        res.status(404).send('Internal server error');
    }
});

app.get('/tasks', (req, res) => {
    const allTasks = todos.map((task) => {
        return {
            fName: task.fName,
            task: task.task
        };
    });
    res.status(200).json(allTasks);
});

app.get('/task/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const validTasks = todos.filter((task) => {
            return task.id === id;
        });

        if(Array.isArray(validTasks) && validTasks.length) {
            res.status(200).json(validTasks);
        }
        else {
            res.status(404).send('Invalid id');
        }
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.put('/task/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const validTasks = todos.filter((task) => task.id === id);

        if(Array.isArray(validTasks) && validTasks.length) {
            const { fName, task } = req.body;

            const index = todos.findIndex(task => task.id === id);
            todos[index] = {
                id: id,
                fName: fName,
                task: task
            };

            res.status(200).json({
                fName: fName,
                task: task,
                message: "Task updated successfully"
            });
        }
        else {
            res.status(404).send('No task found');
        }
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.delete('/task/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const validTasks = todos.filter(task => task.id === id);

        if(Array.isArray(validTasks) && validTasks.length) {
            const index = todos.findIndex(task => task.id === id);
            const data = todos[index];
            todos.splice(index, 1);

            res.status(200).json({
                fName: data.fName,
                task: data.task,
                message: "Task removed successfully"
            });
        }
        else {
            res.status(404).send('No task found');
        }
    }
    catch(error) {
        res.status(500).send('Internal server error');
    }
});

app.get('/', (req, res) => {
    res.send(`App is running`);
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})