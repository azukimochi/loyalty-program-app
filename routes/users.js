express = require('express'),
usersRouter = require("express").Router();
usersCtrl = require('../controllers/userControllers.js')

usersRouter.route('/logIn')
	.get(usersCtrl.logIn)

module.exports = usersRouter
