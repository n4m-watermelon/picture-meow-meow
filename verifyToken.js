const jwt = require('jsonwebtoken');

module.exports = function checkToken (req, res, next) {
    const token  = req.header('auth-token');
    if(!token) return res.status(401).send("Access denied")
    try {
       const verified = jwt.verify(token , process.env.TOKEN_SECRET_KEY)    
       req.user = verified
       next()
    } 
    catch (error) {
         res.status(400).send("Token is invalid")
    }
}