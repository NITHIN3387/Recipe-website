const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    subscribed:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Users', userSchema)