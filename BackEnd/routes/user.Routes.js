const express = require('express');
const { register, login, updateProfile, logout } = require('../controllers/user.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');

const userRouter = express.Router();

userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.route('/profile/update').put(isAuthenticated, updateProfile)
userRouter.route('/logout').get(isAuthenticated,logout)

module.exports = userRouter