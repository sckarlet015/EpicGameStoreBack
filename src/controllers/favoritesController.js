const Favorites = require('../models/Favorites');
const Videogame =require('../models/Videogame');

const postFavorites = async (userId, videogameId) => {
    
    if(userId && videogameId) {
        const addFavorite = await Favorites.create({
            userId,
            videogameId
            })
        if(addFavorite) {
                return 'Se agregó un videogame favorito'
        }
    }
}


const deleteFavorites = async (userId) => {

        const delFavorite = await Favorites.destroy({
            where: {
                id: userId
            }
        });
        
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


module.exports = {postFavorites, deleteFavorites, getFavorites}