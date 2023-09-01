const express = require('express');
const multer = require('multer');
const { addRecipe, getAllRecipe, getRecipe, recipeUploader, updateRecipe, userUploadedRecipies, deleteRecipe } = require('../controller/recipe.controller');

const upload = multer({dest: 'recipeImage/'})

const router = express.Router()

// const auth = require('../middleware/auth.middleware')

router.post('/add', upload.single('recipe-image'), addRecipe)
router.get('/all-recipies', getAllRecipe)
router.get('/recipe-details/:id', getRecipe)
router.get('/recipe-uploader/:id', recipeUploader)
router.get('/user-recipies/:id', userUploadedRecipies)
router.put('/update-recipe/:id', upload.single('recipe-image'), updateRecipe)
router.delete('/delete-recipe/:id', deleteRecipe)

module.exports = router