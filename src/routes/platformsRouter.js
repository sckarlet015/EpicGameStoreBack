const express = require('express');
const getPlatforms = require("../controllers/getPlatforms.js");


const platformsRouter = express.Router();

// GET Videogames
platformsRouter.get("/", async (req,res) => {
    try {
        const genres = await getPlatforms();
         res.status(200).json(genres);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = platformsRouter;