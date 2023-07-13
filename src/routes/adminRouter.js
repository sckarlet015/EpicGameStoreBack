const { Router } = require('express');

const { jwtAdminMiddleware } = require(`../handlers/activityJsonWebToken.js`);
const { getUsers } = require("../handlers/activityAdmin.js")

const adminRouter = Router();

adminRouter.get("/users", jwtAdminMiddleware, getUsers);


module.exports = adminRouter;

