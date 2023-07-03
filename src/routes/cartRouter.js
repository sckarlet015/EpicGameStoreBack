const { Router } = require('express');
const {addItem, getCartId, deleteItem} = require("../handlers/activityCart")


const cartRouter = Router();

cartRouter.post("/", addItem)
cartRouter.delete("/", deleteItem)
cartRouter.get("/:id", getCartId)

module.exports = cartRouter;