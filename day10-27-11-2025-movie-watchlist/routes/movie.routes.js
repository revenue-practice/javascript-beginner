const express = require('express');
const { addMovie, fetchMovies, fetchMovieById, updateMovieById , deleteMovieById } = require('../controller/movie.controller');

const router = express.Router();

router.post('/', addMovie);
router.get('/', fetchMovies);
router.get('/:id', fetchMovieById);
router.put('/:id', updateMovieById);
router.delete('/:id', deleteMovieById);

module.exports = router;