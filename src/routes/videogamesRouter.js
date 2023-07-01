const express = require('express');
const createdGame = require("../controllers/createGame.js");
const findVideogameByIdApi = require("../controllers/findVideogameByIdApi.js");
const findVideogameByIdDB = require("../controllers/findVideogameByIdDB.js");
const getVideogames = require("../controllers/getVideogames.js");
const getVideogamesByName = require("../controllers/findVideogameByName.js");
const getVideogamesDb = require("../controllers/getVideogamesDb.js")

const videogamesRouter = express.Router();

// GET Videogames
videogamesRouter.get("/", async (req,res) => {
    try {
        const { name } = req.query;
        if(name){
            const videogames = await getVideogamesByName(name);
            res.status(200).json(videogames);
        }else {
            const videogames = await getVideogames();
            res.status(200).json(videogames);
        } 
    } catch (error) {
        res.status(400).json({error: error.message});
    };
});

// GET videogame by id 

videogamesRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let videogame = {}
            videogame = await findVideogameByIdDB(id);
            res.status(200).json(videogame);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// POST /videogames
videogamesRouter.post('/', async (req, res) => {
  try {
    const { name, description, launchDate, rating, image, screenshots, price, stock , genres, platforms, developer } = req.body;
    const newVideogame = await createdGame(name, description, launchDate, rating, image, screenshots, price, stock , genres, platforms, developer);
    res.status(200).json(newVideogame);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = videogamesRouter;

