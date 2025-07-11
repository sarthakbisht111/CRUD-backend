const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async (req,res,next) => {
    let authHeader = req.headers.authorization || req.headers.Authorization

    if(authHeader && authHeader.startsWith('Bearer')){
        let token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=> {
            if(err){
                res.status(401)
                throw new Error("User Unauthorized")
            }
            req.user = decoded.user
            next()
        })
    } else{
        res.status(401)
        throw new Error("No token provided")
    }
})
module.exports = validateToken