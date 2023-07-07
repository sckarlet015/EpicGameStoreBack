const express = require('express');
const { getAllVideogames, getVideogamesById, postVideogames } = require('../handlers/activityVideoGames.js')

const videogamesRouter = express.Router();


videogamesRouter.get("/", getAllVideogames);
videogamesRouter.get("/:id", getVideogamesById)
videogamesRouter.post('/', postVideogames);

module.exports = videogamesRouter;

