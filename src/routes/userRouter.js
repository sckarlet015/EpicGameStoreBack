const { Router } = require('express');
const userRouter = Router();

const {postUsers , getUsers, getUserByIdHandler}  = require('../handlers/activityUsers')

userRouter.post('/', postUsers);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserByIdHandler)

module.exports = userRouter;