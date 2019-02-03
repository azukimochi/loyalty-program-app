const db = require('../models')
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

module.exports = {
	logIn: (req, res) => {
		db.Users
			.findOne({ email: req.body.email })
			.then(dbUser => {
				if (dbUser === null) {
					res.json({
						validate: false
					})
				} else {
					if (dbUser.password === req.body.password) {
						res.json({validate: true})
					} else {
						res.json({validate: false})
					}
				}
			})
			.catch(err => res.status(422).json(err))
	}
}