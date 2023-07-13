const { Videogame, Users, Review } = require ("../db.js");

const createReview = async (userId, gameId, rating, comment) =>{

        try {
         
        const newUser = await Users.findByPk(userId)
        console.log(newUser)
        const newGame = await Videogame.findByPk(gameId)
        console.log(newGame)

        const newReview = await Review.create(
            {
                rating: rating,
                comment: comment
            }
        )
        
        newReview.addUsers(newUser)

        console.log(newReview)
        newReview.addVideogame(newGame)
        return newReview
        
        } catch (error) {
        return {error: 'Not comments'}
    }
    
}

const getReviewsById = async (userId) => {

    const reviewById = await Users.findByPk(userId, {
        include : [
            {model : Review},
            {model : Videogame, through: {attributes:[]}}
        ]
    })
  return reviewById;
  }


module.exports = { createReview, getReviewsById }