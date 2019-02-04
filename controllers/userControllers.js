const db = require('../models')
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

module.exports = {
	logIn: (req, res) => {
		db.User
			.findOne({ email: req.body.email })
			.then(dbUser => {
				if (dbUser === null) {
					res.json({
						validate: false
					})
				} else {
						if (dbUser.password === req.body.password) {
							let user = dbUser.username
							jwt.sign({ user }, "secretkey", { expiresIn: "300s" },
								(err, token) => {
									res.json({
										validate: true,
										token: token,
										id: dbUser._id,
										name: dbUser.name
									});
								}
							);
						}
						else {
							res.json({
								validate: false
							});
						}
				}
			})
			.catch(err => res.status(422).json(err))
	}
}