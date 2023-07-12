const { Router } = require('express');
const userRouter = Router();
const { jwtMiddleware } = require(`../handlers/activityJsonWebToken.js`);

const {postUsers , getUsers, getUserByIdHandler, getUserLoginHandler, patchUser, getUserByEmail, getUserEmailRegister}  = require('../handlers/activityUsers')

userRouter.post(`/login`, getUserLoginHandler);
userRouter.post('/', postUsers);
userRouter.get(`/emailLogin/:email`, getUserByEmail)
userRouter.get(`/emailRegister/:email`, getUserEmailRegister)
userRouter.get('/:id', getUserByIdHandler);
userRouter.get('/', jwtMiddleware, getUsers);
userRouter.patch(`/:id`, jwtMiddleware, patchUser);

module.exports = userRouter;