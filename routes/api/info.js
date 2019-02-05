const router = require("express").Router()
const redemptionCtrl = require('../../controllers/redemptionControllers.js')

router.get('/auth', (req, res) => {
    res.json({
        status: "200"
    })
})

router.route("/balance/:id")
    .get(redemptionCtrl.getBalance)
    
router.route("/inventory")
    .get(redemptionCtrl.getInventory)

router.route("/inventory/:colour")
    .get(redemptionCtrl.showItemQty)

module.exports = router
