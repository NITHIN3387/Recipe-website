import { useEffect, useState } from 'react'
import Select from 'react-select'
import '../assets/styles/pages/loadAnimation.css'
import '../assets/styles/pages/AddRecipe.css'
import ActiveTab from '../utils/ActiveTab'
import AddIngredient from '../assets/images/add-ingredient.png'
import { useNavigate, useParams } from 'react-router-dom'


export default function EditRecipe() {
    const [recipe, setRecipe] = useState([])
    const [recipeName, setRecipeName] = useState()
    const [ingredient, setIngredient] = useState()
    const [quantity, setQuantity] = useState()
    const [instructions, setInstructions] = useState()
    const [type, setType] = useState()
    const [serves, setServes] = useState()
    const [image, setImage] = useState()
    const [ingredientList, setIngredientList] = useState([])
    const [category, setCategory] = useState()
    const [veg, setVeg] = useState()
    const [nonVeg, setNonVeg] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    const options = [
        { value: 'Appetizers and Snacks', label: 'Appetizers and Snacks' },
        { value: 'Soups and Stews', label: 'Soups and Stews' },
        { value: 'Main Meals', label: 'Main Meals' },
        { value: 'Side Dishes', label: 'Side Dishes' },
        { value: 'Pasta and Noodles', label: 'Pasta and Noodles' },
        { value: 'Baking and Breads', label: 'Desserts' },
        { value: 'Desserts and Sweets', label: 'Desserts and Sweets' },
        { value: 'Drinks and Beverages', label: 'Drinks and Beverages' },
        { value: 'Sauces and Condiments', label: 'Sauces and Condiments' },
        { value: 'Starters and Snacks', label: 'Starters and Snacks' },
        { value: 'One-Pot and One-Pan Meals', label: 'One-Pot and One-Pan Meals' },
        { value: 'Global Cuisines', label: 'Global Cuisines' },
        { value: 'Healthy and Special Diets', label: 'Healthy and Special Diets' },
        { value: 'Grilling and BBQ', label: 'Grilling and BBQ' },
        { value: 'Breakfast and Brunch', label: 'Breakfast and Brunch' },
        { value: 'Comfort Foods', label: 'Comfort Foods' },
        { value: 'Party Foods and Appetizers', label: 'Party Foods and Appetizers' },
        { value: 'Homemade Basics', label: 'Homemade Basics' },
        { value: 'Special Occasions', label: 'Special Occasions' },
        { value: 'Quick and Easy', label: 'Quick and Easy' },
    ]


    async function handleSubmit(e) {
        e.preventDefault()

        let formData = new FormData()

        formData.append('userId', recipe.userId)
        formData.append('recipeName', recipeName || recipe.recipeName)
        formData.append('ingredient', JSON.stringify(ingredientList))
        formData.append('instructions', instructions || recipe.instructions)
        formData.append('category', category || recipe.category)
        formData.append('type', type)
        formData.append('serves', serves || recipe.serves)
        formData.append('recipe-image', image || recipe.image)

        try {
            await fetch('http://localhost:4000/api/recipe/update-recipe/' +  id, {
                method: 'PUT',
                body: formData
            })
                .then((res) => res.json())
                .then((res) => {
                    setRecipe(res.recipe)
                    navigate(-1)
                })
        } catch {
            console.log('fail to fetch');
        }
    }

    useEffect(() => {
        try {
            fetch('http://localhost:4000/api/recipe/recipe-details/' + id, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((res) => {
                    setRecipe(res.recipe)
                    setIngredientList(JSON.parse(res.recipe.ingredient))
                    res.recipe.type === 'veg' ? setVeg(true) : setVeg(false)
                    res.recipe.type === 'non-veg' ? setNonVeg(true) : setNonVeg(false)
                })
        } catch {
            console.log('somthing went wrong');
        }
        ActiveTab(0, -1)
    }, [recipe, id])

    function handleIngredientAdd() {
        let include = false
        for (const ele of ingredientList) {
            if (ele.ingredient === document.getElementById('ingredients').value)
                include = true
        }
        if (!include)
            setIngredientList([...ingredientList, { ingredient: ingredient, quantity: quantity }])
        document.getElementById('ingredients').value = ''
        document.getElementById('quantity').value = ''
    }

    function handleIngredientRemove(ingredient) {
        const list = ingredientList.filter((ele) => (
            ele.ingredient !== ingredient
        ))
        setIngredientList(list)
    }

    return (

        <div className="load-animation add-recipe bg-light mt-5 p-lg-5 p-4">
            <h1>
                <span>Edit your </span>
                recipe_.
            </h1>
            <form className="fluid-container p-lg-5 pt-lg-4 pt-3">
                <div className="row my-lg-4">
                    <label className="col-lg-2 col-12 col-form-label" htmlFor='recipe-name'>Recipe-name:</label>
                    <div className="col-lg-8 col-12">
                        <input type='text' className='form-control' id='recipe-name' defaultValue={recipe.recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                    </div>
                </div>
                <div className="row my-lg-4 my-md-4 ingredient">
                    <label htmlFor="ingredients" className="col-lg-2 col-md-2 col-12 col-form-label">Ingredients:</label>
                    <div className="col-lg-4 col-md-4 col-12 d-flex">
                        <input type="text" className='form-control' id='ingredients' onChange={(e) => setIngredient(e.target.value)} />
                    </div>
                    <label htmlFor="ingredients" className="col-lg-1 col-md-2 col-12 col-form-label">Quantity:</label>
                    <div className="col-lg-3 col-md-4 col-12 d-flex">
                        <input type="text" className='form-control' id='quantity' onChange={(e) => setQuantity(e.target.value)} />
                        <div className='btn ms-3' onClick={handleIngredientAdd}>
                            <img src={AddIngredient} alt="" width={13} />
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-10 col-12 mt-lg-4 mt-md-4 mt-2">
                        {
                            ingredientList.map((ele, i) => (
                                <div className='border border-success rounded-pill py-1 ps-3 pe-1 me-2 my-1 d-inline-block' key={i}>
                                    <div className='me-3 d-inline-block text-success'>{ele.ingredient}</div>
                                    <div className='border border-success rounded-circle d-inline-block text-center text-success' style={{ width: '27px', height: '27px', cursor: 'pointer' }} onClick={() => handleIngredientRemove(ele.ingredient)}>x</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="row my-lg-4">
                    <label htmlFor="describtion" className="form-label col-12">Instructions:</label>
                    <div className="col-lg-10 col-12">
                        <textarea className="form-control" id="describtion" rows="10" onChange={(e) => setInstructions(e.target.value)} defaultValue={recipe.instructions} />
                    </div>
                </div>
                <div className="row my-lg-4 my-md-4">
                    <div className='col-lg-5 col-md-12 d-lg-flex d-md-flex align-items-center my-lg-0 my-md-0 my-3'>
                        <label className="form-check-label col-lg-3 col-md-3 col-12 mb-lg-0 mb-md-0 mb-2" htmlFor="category">Category:</label>
                        <Select options={options} id='category' className='col-lg-9 col-md-9 col-12' onChange={(e) => setCategory(e.value)} />
                    </div>
                    <div className="col-lg-3 col-md-6 col-12 my-lg-0 my-md-4 my-2 d-flex align-items-center justify-content-lg-center">
                        <div className="form-check me-4">
                            <input className="form-check-input" type="radio" name="type" id="veg" onChange={() => setType('veg')} defaultChecked={veg}/>
                            <label className="form-check-label" htmlFor="veg">veg</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="type" id="non-veg" onChange={() => setType('non-veg')} defaultChecked={nonVeg}/>
                            <label className="form-check-label" htmlFor="non-veg">non-veg</label>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12 d-lg-flex d-md-flex align-items-center">
                        <label className="form-label col-lg-2 col-md-4" htmlFor="serves">serves:</label>
                        <div className='col-lg-3 col-md-5'>
                            <input className="form-control" type="number" id="serves" onChange={(e) => setServes(e.target.value)} defaultValue={recipe.serves}/>
                        </div>
                    </div>
                </div>
                {/* <div className="row mb-lg-5 my-4">
                    <label htmlFor="img" className="form-label">choose the recipe image:</label>
                    <div className="col-lg-7">
                        <input className="form-control" type="file" id="img" name='recipe-image' accept='image/*' onChange={(e) => setImage(e.target.files[0])}/>
                    </div>
                </div> */}
                <button className="btn" type='submit' onClick={(e) => handleSubmit(e)}>Update Recipe</button>
            </form>
        </div>
    )
}