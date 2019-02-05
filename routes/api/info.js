const router = require("express").Router()
const redemptionCtrl = require('../../controllers/redemptionControllers.js')

router.route("/balance/:id")
    .get(redemptionCtrl.getBalance)
    
router.route("/inventory")
    .get(redemptionCtrl.getInventory)

router.route("/inventory/:colour")
    .get(redemptionCtrl.showItemQty)

module.exports = router
