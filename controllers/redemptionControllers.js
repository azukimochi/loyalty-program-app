const db = require('../models')

module.exports = {
    getBalance: (req, res) => {
        db.Users
        .findById({ _id: req.params.id })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },

    getInventory: (req, res) => {
        db.Inventory
        .find({})
        .then(dbModel => res.json(dbModel))
        .catch(err => console.log(err))
    }
}