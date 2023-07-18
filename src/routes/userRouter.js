const { Router } = require('express');
const userRouter = Router();
const { jwtMiddleware } = require(`../handlers/activityJsonWebToken.js`);

const {postUsers , getUserByIdHandler, getUserLoginHandler, patchUser, getUserByEmail, getUserEmailRegister, createAdmin}  = require('../handlers/activityUsers')


userRouter.get(`/emailLogin/:email`, getUserByEmail)
userRouter.get(`/emailRegister/:email`, getUserEmailRegister)
userRouter.get('/:id', getUserByIdHandler);
userRouter.post(`/login`, getUserLoginHandler);
userRouter.post('/', postUsers);
userRouter.post(`/createAdmin`, createAdmin);
userRouter.patch(`/:id`, jwtMiddleware, patchUser);

module.exports = userRouter;