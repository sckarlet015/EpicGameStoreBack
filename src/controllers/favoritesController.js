const { Videogame, Favorites, Users} = require("../db.js");

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
    const videosFav = await Favorites.findAll({
        where: {
            userId
        },
    })
    const infoVideosFav = []
    if(videosFav) {
        for (let i = 0; i < videosFav.length; i++) {
            const videoGames = await Videogame.findByPk(videosFav[i].id,
                {attributes: ['id', 'name', 'image']}
                )
                infoVideosFav.push(videoGames)
            }
        }

    if(infoFavs.length) {
        return infoVideosFav
    } 
}


module.exports = {createFavorites, deleteFavorites, getFavorites}
// const { Videogame, Users, Genre} = require("../db.js");

// const createFavorites = async (user, videogame) => {
        
//         try{
//             const favorites = await user.addVideogame(videogame)
//             return favorites 
//         } catch {
//             return {error: "Not user not videogame"}
//         }
    
// }


// const deleteFavorites = async (user, videogame) => {
//     try{
//         const  userF = await Users.findByPk(user)
//         const  game = await Videogame.findByPk(videogame)
//             await userF.removeVideogame(game)
//             return user
//     }catch{
//         return {error: "Videogame not deleted"}
//     }
// }



// const getFavorites = async (userId) => {
//     const UserById = await Users.findByPk(userId, {
//         include : [
            
//             {model : Videogame, through: {attributes:[ ]},
//             include : [
//             { model :Genre, through: {attributes:[]} }
//             ]}
//         ]
//     })
//   return UserById;
//   }

// module.exports = {createFavorites, deleteFavorites, getFavorites}


