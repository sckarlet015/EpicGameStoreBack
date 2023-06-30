const { Router } = require('express');
const {asocieVideoGames} = require("../handlers/activityCart")


const cartRouter = Router();

cartRouter.post("/", asocieVideoGames)

module.exports = cartRouter;