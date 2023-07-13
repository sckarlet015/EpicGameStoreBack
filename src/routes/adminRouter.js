const { Router } = require('express');

const { jwtAdminMiddleware } = require(`../handlers/activityJsonWebToken.js`);

const adminRouter = Router();

adminRouter.get("/users", jwtAdminMiddleware)

// userRouter.patch(`/:id`, jwtMiddleware, patchUser);

module.exports = adminRouter;

