const express = require('express');
const app = express();

/* 
    * accept json using express.json()
*/

app.use(express.json());

app.post('/user', (req, res) => {
    try {
        const { username, password } = req.body;
        res.json({
            id: "2",
            name: "Ankit",
            username: username
        });
    }
    catch (error) {
        console.log(error);
    }
})

app.get('/', (req, res) => {
    res.send('Hello this is first page');
});

app.listen(3000, () => {
    console.log(`App is running on port 3000`);
});