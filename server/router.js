const express = require('express');

const router = express.Router();
const reviewController = require('./controllers');

router.get('/reviews', reviewController.getReviews);
router.get('/reviews/search/:text', reviewController.getReviewByText);
router.post('/reviews', reviewController.addReview);
router.put('/reviews/helpful/:id', reviewController.rateHelpful);

module.exports = router;
