const express = require('express');
const { addReview, fetchReview, deleteReview } = require('../controller/review.controller');
const router = express.Router();

router.post('/', addReview);
router.get('/', fetchReview);
router.delete('/:reviewId', deleteReview);

module.exports = router;