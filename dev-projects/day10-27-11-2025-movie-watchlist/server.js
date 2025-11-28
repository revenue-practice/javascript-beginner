"use-strict";
const express = require('express');
const app = express();
const PORT = 3004;

const moviesRouter = require('./routes/movie.routes');
const reviewRouter = require('./routes/review.routes');

app.use(express.json());
app.use('/movies', moviesRouter);
app.use('/movies/reviews/:id', reviewRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});