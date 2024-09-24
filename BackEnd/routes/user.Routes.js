const express = require('express');
const { register, login, updateProfile, logout } = require('../controllers/user.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile/update').put(isAuthenticated, updateProfile)
router.route('/logout').get(isAuthenticated,logout)

module.exports = router