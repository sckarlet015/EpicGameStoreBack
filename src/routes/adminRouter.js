const { Router } = require('express');

const { jwtAdminMiddleware } = require(`../handlers/activityJsonWebToken.js`);
const { getUsers, getVideogames, getVideogamesById } = require("../handlers/activityAdmin.js")

const adminRouter = Router();

adminRouter.get("/users", jwtAdminMiddleware, getUsers);
adminRouter.get("/videogames", jwtAdminMiddleware, getVideogames);
adminRouter.get("/videogames/:id", getVideogamesById);


module.exports = adminRouter;

