const { Router } = require('express');
const favoritesRouter = Router();

const {postFavoritesHandler, getFavoritesHandler, deleteFavoritesHandler}  = require('../handlers/activityFavorites');

favoritesRouter.post('/', postFavoritesHandler);
favoritesRouter.get('/', getFavoritesHandler);
favoritesRouter.delete('/', deleteFavoritesHandler);

module.exports = favoritesRouter;