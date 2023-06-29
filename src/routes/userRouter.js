const { Router } = require('express');
const userRouter = Router();

const {postUsers , getUsers}  = require('../handlers/activityUsers')

userRouter.post('/', postUsers);
userRouter.get('/', getUsers);

module.exports = userRouter;