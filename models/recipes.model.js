const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    userId:{
        type: String,
    },
    recipeName:{
        type: String,
        required: true
    },
    ingredient:{
        type: Object,
        required: true 
    },
    instructions:{
        type: String,
        required: true 
    },
    category:{
        type: String,
        required: true 
    },
    type:{
        type: String,
        required: true 
    },
    serves:{
        type: String,
        required: true 
    },
    image:{
        type: String,
        required: true 
    },
    likes:{
        type: Number,
    },
    likedUsers:{
        type: String,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('recipes', recipeSchema)