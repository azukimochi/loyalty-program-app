const router = require("express").Router()
const infoRoutes = require("./info")
const orderRoutes = require("./order")

router.use("/info", infoRoutes)
router.use("/order", orderRoutes)

module.exports = router
