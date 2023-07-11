const { Router } = require('express');
const userRouter = Router();
const { jwtMiddleware } = require(`../handlers/activityJsonWebToken.js`);

const {postUsers , getUsers, getUserByIdHandler, getUserLoginHandler, patchUser}  = require('../handlers/activityUsers')

userRouter.post(`/login`, getUserLoginHandler);
userRouter.post('/', postUsers);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserByIdHandler);
userRouter.patch(`/:id`, jwtMiddleware, patchUser);

module.exports = userRouter;