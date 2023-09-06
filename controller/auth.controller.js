const users = require('../models/auth.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//discription: Registration controll
//method: POST
//access: Public
const RegisterControll = async (req, res) => {

    const {name, email, password} = req.body

    //checking whether email is already registered or not
    if ((await users.find({email: email})).length){
        console.log('an user is already registered with this email');
        res.send({message: 'duplicate'})
    }else{
        try{
            //converting Password enter by user to Hash code
            bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS)).then((salt) => {
                return bcrypt.hash(password, salt)
            }).then((hash) => {
                //storing user details in database
                users.create({
                    name,
                    email,
                    password: hash,
                    subscribed: "[]",
                })
                console.log('registered succesfully')
                res.send({message: 'ok'})
            })
        }catch(err){
            throw new Error(err)
        }
    }
}

const LoginControl = async(req, res) => {
    const {email, password} = req.body
    
    const user = await users.findOne({email: email})

    //checking user is valid or not
    if (user){
        if(bcrypt.compare(password, user.password)){ //comparing password with hash code stored in database
            //generating jsonwebtoken 
            const token = jwt.sign(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                },
                process.env.SECRETE_KEY,
                { expiresIn: '7d'}
            )
            //storing the generated token in cookie
            res.cookie('token', token, {
                withCredentials: true,
                maxAge: 604800000,
                httpOnly: true
            })
            .send({message: 'ok', token: `${token}`})
        }
    }else{
        res.send({message: 'incorrect email'})
    }
}

//discription: Login user's detail
//method: GET
//access: Private
const User = async (req, res) => {
    const user = await users.findOne({_id: req.user._id})
    res.send({status: true, user: user})
}

const Subscribed = async (req, res) => {
    const user = await users.find({subscribed: new RegExp(req.params.id, 'i')})
    res.send({status: true, user: user})
}

const UserById = async (req, res) => {
    const user = await users.findOne({_id: req.params.id})
    res.send({status: true, user: user})
}

const updateUser = async (req, res) => {
    const {name, email, password, subscribed} = req.body
    const user = await users.findOneAndUpdate({_id: req.params.id}, {
        name,
        email,
        password,
        subscribed
    },{
        returnDocument: 'after'
    })
    res.send({message: 'updated', user: user})
}

const ClearCookies = (req, res) => {
    res.clearCookie('token')
    res.send({message: 'cleared'})
}

module.exports = {RegisterControll, LoginControl, User, updateUser, UserById, ClearCookies, Subscribed}