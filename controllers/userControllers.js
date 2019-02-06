const db = require('../models')
const jwt = require("jsonwebtoken")

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
						let user = dbUser
						jwt.sign({ user }, "secretkey", { expiresIn: "600s" },
							(err, token) => {
								res.json({
									validate: true,
									token: token,
									id: dbUser._id,
									name: dbUser.firstName
								})
							}
						)
					}
					else {
						res.json({
							validate: false
						})
					}
				}
			})
			.catch(err => res.status(422).json(err))
	}
}