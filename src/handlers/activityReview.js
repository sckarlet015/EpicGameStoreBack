const { createReview, getReviewsById } = require("../controllers/reviewController")
const { Videogame, Users, Review } = require ("../db.js");

const postReview = async (req,res) =>{
    const { userId, gameId, rating, comment} = req.body
    console.log(req.body)
    try {
      

        const respuesta = await createReview(
            userId,
            gameId,
            rating, 
            comment
            )
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const getReviews = async(req, res) => {
    const { userId} = req.body
    try {
        const reviewsGet = await getReviewsById(userId)
        res.status(200).json(reviewsGet)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports =  { postReview, getReviews } 