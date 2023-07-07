const { postFavorites, deleteFavorites, getFavorites } = require('../controllers/favoritesController');

const postFavoritesHandler = async (req, res, next) => {
    const { userId, videogameId } = req.query
    try {
        const favoritesPost = await postFavorites(userId, videogameId);
        res.status(200).json(favoritesPost)
    } catch (error) {
        res.status(400).json({ error:error.message })
    }
}


const deleteFavoritesHandler = async (req, res, next) => {
    const { userId } = req.query
    try {
        const favoritesDelete = await deleteFavorites(userId);
        res.status(200).json(favoritesDelete)
    } catch (error) {
        res.status(400).json({ error:error.message })
    }
}

const getFavoritesHandler = async (req, res, next) => {
    const { userId } = req.query
    try {
        const favoritesGet = await getFavorites(userId);
        res.status(200).json(favoritesGet)
    } catch (error) {
        res.status(400).json({ error:error.message })
    }
}




module.exports = {postFavoritesHandler, deleteFavoritesHandler, getFavoritesHandler}