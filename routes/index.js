const path = require("path")
const router = require("express").Router()
const apiRoutes = require("./api")
const userRoutes = require("./users.js")
const jwt = require('jsonwebtoken')

router.use("/api", verifytoken, apiRoutes)
router.use("/users", userRoutes)

// Verify Token Before Continuting with API routes 
function verifytoken(req, res, next) {
  //Get auth header value
   const bearerHeader = req.headers['authorization']
  //Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ')
    // Get token from array
    const bearerToken = bearer[1]
    //Set the token
    req.token = bearerToken 
    //Use JWT to verify that the token is active session   
      jwt.verify(req.token, 'secretkey', (err, authData) => {

      // if the token isn't active, then a 200 status call with a status property of "404" is sent. 
      if (err) {
       res.json({
         status: '404',
       })
       console.log("token is not valid!")
      } else {
          console.log("token is valid!")
      }
      //proceeds to next middleware/route path. 
      // next() is only achievable if there's no err because there wouldn't be a response sent
       next();
       });

  } else {
    // Forbidden
    console.log("Forbidden")
    res.sendStatus(403)
    
  }
}

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

module.exports = router
