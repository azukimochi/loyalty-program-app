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
            .find({ qty: { $not: { $lte: 0 } } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    showItemQty: (req, res) => {
        db.Inventory
            .findOne({ colour: req.params.colour })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    insertOrder: (req, res) => {
        db.Orders
            .create({
                colour: req.body.colour,
                qty: parseInt(req.body.qty),
                redemptionValue: req.body.redemptionValue,
                date: Date.now(),
                userId: req.body.userId
            })
            .then(dbOrder => {
                return db.Users
                    .findByIdAndUpdate(
                        { _id: req.body.userId },
                        { $inc: { balance: -(req.body.redemptionValue) }, $push: { orders: dbOrder._id } },
                        { new: true }
                    )
            })
            .then(dbModel => {
                res.json(dbModel)
                db.Inventory
                    .findOneAndUpdate(
                        { colour: req.body.colour },
                        { $inc: { qty: -(parseInt(req.body.qty)) } }
                    )
                    .catch(err => res.status(422).json(err))
            })
            .catch(err => res.status(422).json(err))
    },
}