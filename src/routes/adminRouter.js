const { Router } = require('express');

const { jwtAdminMiddleware } = require(`../handlers/activityJsonWebToken.js`);
const { getUsers, getVideogames, getVideogamesById, getUserById } = require("../handlers/activityAdmin.js")

const adminRouter = Router();

adminRouter.get("/users", jwtAdminMiddleware, getUsers);
adminRouter.get("/users/:id", jwtAdminMiddleware, getUserById);
adminRouter.get("/videogames", jwtAdminMiddleware, getVideogames);
adminRouter.get("/videogames/:id", jwtAdminMiddleware, getVideogamesById);


module.exports = adminRouter;

