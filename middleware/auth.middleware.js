const jwt = require('jsonwebtoken');
const users = require('../models/auth.model')

function authenticate(req, res, next) {
    const token = req.cookies.token     //getting token stored in the cookies
    if (!token)
    return res.json({status: false})

    //checking whether token is valid or not
    jwt.verify(token, process.env.SECRETE_KEY, async (err, decode) => {
        if(err)
            return res.json({status: false})

        const user = await users.findOne({email: decode.email})
        
        if(user){
            req.user = user
            next()
        }else
            return res.json({status: false})
    })
}

module.exports = authenticate