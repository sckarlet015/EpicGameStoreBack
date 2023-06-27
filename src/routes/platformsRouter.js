const express = require('express');
const getPlatforms = require("../controllers/getPlatforms.js");


const platformsRouter = express.Router();

// GET platforms
platformsRouter.get("/", async (req,res) => {
    try {
        const platforms = await getPlatforms();
         res.status(200).json(platforms);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = platformsRouter;