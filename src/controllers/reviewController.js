const { Users, Review, Videogame} = require("../db.js");


const createReview = async (userId, gameId, description, rating) => {
    const user = await Users.findByPk(userId)
    const video = await Videogame.findByPk(gameId)
    
    const review = await Review.create({
        description,
        rating
    })
    
    return review;
}



const deleteReview = async (userId, gameId) => {
        
    
}



const getReview = async (id) => {
    const allReviews = await Review.findAll(
        {
            attributes: ['id', 'points', 'description', 'rating']
        }); 
    return allReviews 
}


module.exports = {createReview, deleteReview, getReview}