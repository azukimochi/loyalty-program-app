const router = require("express").Router()
const usersCtrl = require('../controllers/userControllers.js')

router.route('/logIn')
	.post(usersCtrl.logIn)

module.exports = router
