const dotenv = require ('dotenv');
const jwt  = require("jsonwebtoken")
dotenv.config();

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    //If header is undefined return Forbidden (403)
    if(typeof header===undefined) return res.sendStatus(403);
    const bearer = header.split(' ');
    const token = bearer[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            return res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 
            req.email = authorizedData.email;
            req.name = authorizedData.username;
            next();
        }
    })
}

module.exports = {checkToken};