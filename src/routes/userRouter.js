const { Router } = require('express');
const userRouter = Router();

const {postUsers , getUsers, getUserByIdHandler, getUserLoginHandler, patchUser}  = require('../handlers/activityUsers')

userRouter.post('/', postUsers);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserByIdHandler)
userRouter.post(`/login`, getUserLoginHandler);
userRouter.patch(`/:id`, patchUser)

module.exports = userRouter;