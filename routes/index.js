const path = require("path")
const router = require("express").Router()
const apiRoutes = require("./api")
const userRoutes = require("./users.js")
const jwt = require('jsonwebtoken')

// Verify Token Before Continuting with API routes 
const verifytoken = (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    //Use JWT to verify that the token is active session   
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.json({
          status: '404',
        })
        console.log("token is not valid!")
      } else {
        console.log("token is valid!")
      }
      //proceeds to next middleware/route path. 
      // next() is only achievable if there's no err with session token validation
      next();
    });

  } else {
    console.log("Forbidden")
    res.sendStatus(403)

  }
}

router.use("/api", verifytoken, apiRoutes)
router.use("/users", userRoutes)

router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

module.exports = router
