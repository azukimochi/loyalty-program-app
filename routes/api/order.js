const router = require("express").Router()
const redemptionCtrl = require('../../controllers/redemptionControllers.js')

router.route("/create")
    .put(redemptionCtrl.insertOrder)
    
module.exports = router
