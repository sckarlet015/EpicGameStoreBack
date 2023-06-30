const { Router } = require('express');
const {asocieVideoGames, getAllCarts} = require("../handlers/activityCart")


const cartRouter = Router();

cartRouter.post("/", asocieVideoGames)
cartRouter.get("/admin", getAllCarts)

module.exports = cartRouter;