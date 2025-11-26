const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3004;

app.use((req, res, next) => {
    
})

app.use(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});