const { Router } = require('express');
const reviewRouter = Router();
const  { postReview }  = require("../handlers/activityReview")

reviewRouter.post('/', postReview)

module.exports = reviewRouter