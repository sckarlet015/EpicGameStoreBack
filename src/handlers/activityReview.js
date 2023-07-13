const { createReview } = require("../controllers/reviewController")
const { Videogame, Users, Review } = require ("../db.js");

const postReview = async (req,res) =>{
    const { userId, gameId, comment, rating} = req.body
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

module.exports =  { postReview } 