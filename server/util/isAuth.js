const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AuthenticationError } = require("apollo-server-express");

const authorize = (req) => {
    const authorizationHeader = req.headers.authorization || '';
    if(!authorizationHeader){
        req.isAuth = false;
        throw new AuthenticationError("Not authorized");
    }

    const token = authorizationHeader.replace('Bearer ','');
    if(!token || token===''){
        req.isAuth = false;
        throw new AuthenticationError("Not authorized");
    }

    let  decodedJwt;
    try {
        decodedJwt = jwt.verify(token, process.env.SECRET);

        if(!decodedJwt){
            req.isAuth = false;
            throw new AuthenticationError("Not authorized");
        }

        req.isAuth = true;
        req._id = decodedJwt._id;
        req.email = decodedJwt.email;
    } catch (error) {
        req.isAuth = false;
        throw new AuthenticationError("Not authorized");
    }
    return req;
}