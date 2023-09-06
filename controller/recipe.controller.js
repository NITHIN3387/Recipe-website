const recipeModel = require('../models/recipes.model')
const users = require('../models/auth.model')

const addRecipe = (req, res) => {
    const {userId, recipeName, ingredient, instructions, category, type, serves} = req.body
    const imagePath = `${req.file.path}`
    console.log(ingredient);
    recipeModel.create({
        userId,
        recipeName,
        ingredient,
        instructions,
        category,
        type,
        serves,
        image: imagePath,
        likes: 0,
        likedUsers: "[]"
    })
    res.send({status: true})
}

const getAllRecipe = (req, res) => {
    recipeModel.find()
    .then((result) => {
        res.send(result)
    })
}

const getRecipe = (req, res) => {
    recipeModel.findOne({_id: req.params.id})
    .then((result) => {
        res.send({recipe: result})
    })
}

//discription: recipe uploader user's detail
//method: GET
//access: Public
const recipeUploader = async (req, res) => {
    const user = await users.findOne({_id: req.params.id})
    res.send({user: user})
}

const userUploadedRecipies = async (req, res) => {
    const recipies = await recipeModel.find({userId: req.params.id})
    res.send({recipies: recipies})
}

const updateRecipe = async (req, res) => {
    const {userId, recipeName, ingredient, instructions, category, type, serves, likes, likedUsers} = req.body
    const imagePath = req.file
    await recipeModel.findOneAndUpdate({_id: req.params.id}, {
        userId,
        recipeName,
        ingredient,
        instructions,
        category,
        type,
        serves,
        image: imagePath,
        likes,
        likedUsers
    },
    {
        returnDocument: 'after'
    })
    .then((resp) => {
        res.send({status: true, recipe: resp})
    })
}

const deleteRecipe = async (req, res) => {
    await recipeModel.findOneAndDelete({_id: req.params.id})
    res.send('deleted')
}

module.exports = {addRecipe, getAllRecipe, getRecipe, recipeUploader, updateRecipe, userUploadedRecipies, deleteRecipe}