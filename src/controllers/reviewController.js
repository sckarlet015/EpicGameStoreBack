const { Videogame, Users, Review } = require ("../db.js");

const createReview = async (userId, gameId, rating, comment) =>{

    try {
         
        const newUser = await Users.findByPk(userId)
        console.log(newUser)
        const newGame = await Videogame.findByPk(gameId)
        console.log(newGame)

        const newReview = await Review.create(
            {
                rating,
                comment
            }
        )
        
        await newReview.addUsers(newUser)

        console.log(newReview)
        // await newReview.setVideogame(newGame)
        
        // return newReview

    } catch (error) {
        return {error: 'Not comments'}
    }

}
module.exports = { createReview }