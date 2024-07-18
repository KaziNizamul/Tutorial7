const express = require('express')
const userRouter = express.Router()

const userController = require('../controller/users')

userRouter.get('/users', userController.getUsers);
userRouter.get('/user/:id', userController.getUsersByid);
userRouter.post('/add', userController.createUsers);
userRouter.put('/update/:id', userController.updateUser);
userRouter.delete('/delete/:id',userController.deleteUser)


exports.routes = userRouter;