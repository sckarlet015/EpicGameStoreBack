const { Router } = require('express');
const userRouter = Router();

const {postUsers , getUsers, getUserByIdHandler, getUserLoginHandler,  putUserHandler}  = require('../handlers/activityUsers')

userRouter.post('/', postUsers);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserByIdHandler)
userRouter.post("/login", getUserLoginHandler);
//userRouter.put('/:id', isActiveHandler);
//userRouter.put('/role/:id', putUserRoleHandler);
userRouter.put('/:id', putUserHandler);

module.exports = userRouter;