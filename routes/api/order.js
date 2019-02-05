const router = require("express").Router()
const redemptionCtrl = require('../../controllers/redemptionControllers.js')

router.route("/create")
    .post(redemptionCtrl.insertOrder)
    
module.exports = router
