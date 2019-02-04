const router = require("express").Router()
const redemptionCtrl = require('../../controllers/redemptionControllers.js')

router.route("/balance/:id")
    .get(redemptionCtrl.getBalance)
    
router.route("/inventory")
    .get(redemptionCtrl.getInventory)

module.exports = router
