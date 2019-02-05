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
        .find({qty: {$not: {$lte: 0}}})
        .then(dbModel => res.json(dbModel))
        .catch(err => console.log(err))
    },

    showItemQty: (req, res) => {
        db.Inventory
        .findOne({colour: req.params.colour})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    }
}