const { Router } = require('express');
const reviewRouter = Router();

const {postReviewHandler, getReviewHandler, deleteReviewHandler}  = require('../handlers/activityReview.js');

reviewRouter.post('/', postReviewHandler);
reviewRouter.get('/:userId', getReviewHandler);
reviewRouter.post('/delete', deleteReviewHandler);

module.exports = reviewRouter;