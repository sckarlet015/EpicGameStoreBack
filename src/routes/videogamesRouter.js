const express = require('express');
const { getAllVideogames, getVideogamesById, postVideogames, patchVideogame } = require('../handlers/activityVideoGames.js')

const videogamesRouter = express.Router();


videogamesRouter.get("/", getAllVideogames);
videogamesRouter.get("/:id", getVideogamesById)
videogamesRouter.post('/', postVideogames);
videogamesRouter.patch(`/:id`, patchVideogame);

module.exports = videogamesRouter;

