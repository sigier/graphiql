const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AuthenticationError } = require("apollo-server-express");

const throwAuthError = () => {
    throw new AuthenticationError("Not authorized");
}

const authorize = (req, verify = false) => {
    const authorizationHeader = req.headers.authorization || '';
    if(!authorizationHeader){
        req.isAuth = false;
        return !verify ? throwAuthError() : req;
     }

    const token = authorizationHeader.replace('Bearer ','');
    if(!token || token===''){
        req.isAuth = false;
        return !verify ? throwAuthError() : req;
    }

    let  decodedJwt;
    try {
        decodedJwt = jwt.verify(token, process.env.SECRET);

        if(!decodedJwt){
            req.isAuth = false;
            return !verify ? throwAuthError() : req;
        }

        req.isAuth = true;
        req._id = decodedJwt._id;
        req.email = decodedJwt.email;
        req.token = token;

        return req;

    } catch (error) {
        req.isAuth = false;
        return !verify ? throwAuthError() : req;
    }   
}