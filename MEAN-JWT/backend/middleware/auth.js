const jwt = require('jsonwebtoken');

const auth = async(req, res, next)=>{
    const token = req.body.authorization;
    if(!token){
        return res.status(401).send("unauthorized")
    }
    const decode = jwt.verify(token, 'secret') 
    if(!decode){
        return res.status(401).send("token invalid")
    }
    req.id = decode;
    next();
};

module.exports = auth;