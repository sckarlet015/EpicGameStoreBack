const { Router } = require('express');
const reviewRouter = Router();
const  { postReview, getReviews }  = require("../handlers/activityReview")

reviewRouter.post('/', postReview)
reviewRouter.get('/', getReviews)

module.exports = reviewRouter