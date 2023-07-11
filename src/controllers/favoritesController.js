
const { Videogame, Users} = require("../db.js");

const createFavorites = async (user, videogame) => {
        try{
            const favorites = await user.addVideogame(videogame)
            return favorites 
        } catch {
            return {error: "Not user not videogame"}
        }
    
}


const deleteFavorites = async (user, videogame) => {
    try{
        const  userF = await Users.findByPk(user)
        const  game = await Videogame.findByPk(videogame)
            await userF.removeVideogame(game)
            return user
    }catch{
        return {error: "Videogame not deleted"}
    }
}

const getFavorites = async(userId) => {

    const allFav = await Users.findByPk(userId,
        {
            include: [
            
                {model : Videogame, through: {attributes:[]}}
                ]
        }
    )

    let infoFav = allFav.Videogames.map( fav => {
        const newFav = {
            id : fav.id,
            userName: fav.userName,
            userPassword: fav.userPassword
            
        }
    })
        return infoFav

          
}

module.exports = {createFavorites, deleteFavorites, getFavorites}