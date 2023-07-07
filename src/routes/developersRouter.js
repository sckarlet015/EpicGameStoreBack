const express = require('express');
const getDevelopers = require("../controllers/getDevelopers.js");


const developersRouter = express.Router();

// GET developers
developersRouter.get("/", async (req,res) => {
    try {
        const developers = await getDevelopers();
         res.status(200).json(developers);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = developersRouter;