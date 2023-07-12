const {  createReview, deleteReview, getReview } = require('../controllers/reviewController.js');
const { Videogame,  Users} = require("../db.js");

const postReviewHandler = async (req, res, next) => {
    const  {userId, gameId, description, rating } = req.body
    try {
        const reviewPost = await createReview(userId, gameId, description, rating)
        res.status(200).json(reviewPost)
    } catch (error) {
        res.status(400).json({ error:error.message })
    }
}


const deleteReviewHandler = async (req, res, next) => {
    const { userId, gameId } = req.body
    try {
        const reviewDelete = await deleteReview(userId, gameId);
        res.status(200).json(reviewDelete)
    } catch (error) {
        res.status(400).json({ error:error.message })
    }
}

const getReviewHandler = async (req, res, next) => {
    const { id } = req.params
    try {
        const reviewGet = await getReview(id);
        res.status(200).json(reviewGet)
    } catch (error) {
        res.status(400).json({ error:error.message })
    }
}

module.exports = {postReviewHandler, deleteReviewHandler, getReviewHandler}