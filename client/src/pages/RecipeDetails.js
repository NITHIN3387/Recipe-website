import { useEffect, useState } from "react"
import { Link, useOutletContext, useParams } from "react-router-dom"
import ActiveTab from "../utils/ActiveTab"
import Favorite from '../assets/images/favorite-icon.png'
import Liked from '../assets/images/liked.png'
import DefaultUser from '../assets/images/default-user.png'
import NonVeg from '../assets/images/non-veg.png'
import Veg from '../assets/images/veg.png'
import Delete from '../assets/images/delete.png'
import HandleUpdateRecipe from "../utils/HandleUpdateRecipe"

export default function RecipeDetails() {
    const { id, name } = useParams()
    const { user, auth } = useOutletContext()
    const [uploader, setUploader] = useState([])
    const [recipe, setRecipe] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState('')
    const [subscribed, setSubscribed] = useState([])

    async function handleLike() {
        // checking whether user is authenticated or not if not it will redirect to login page 
        if (auth) {
            // parsing the JSON string and storing the liked user to variable
            const likedUsers = JSON.parse(recipe.likedUsers)

            let formData = new FormData()

            // storing all the updated recipe detailes to formData variable 
            formData.append('userId', recipe.userId)
            formData.append('recipeName', recipe.recipeName)
            formData.append('ingredient', recipe.ingredient)
            formData.append('instructions', recipe.instructions)
            formData.append('category', recipe.category)
            formData.append('type', recipe.type)
            formData.append('serves', recipe.serves)
            formData.append('recipe-image', recipe.image)

            // changing the view according to whether user have liked the recipe of not 
            if (!likedUsers.includes(user._id)) {
                document.getElementById('like').src = Liked
                // increasing the count of like 
                formData.append('likes', recipe.likes + 1)
                // adding the liked users 
                formData.append('likedUsers', JSON.stringify([...likedUsers, user._id]))
            } else {
                document.getElementById('like').src = Favorite
                // decreamenting the likes of the recipe 
                formData.append('likes', recipe.likes - 1)
                // deleting the user id 
                const users = likedUsers.filter((ele) => (ele !== user._id))
                formData.append('likedUsers', JSON.stringify([...users]))
            }

            const res = await HandleUpdateRecipe(recipe, formData)
            // updating the updated recipe values 
            setRecipe(res)
        } else {
            window.location.href = '/login'
        }
    }

    // function to handle the subscribing the favarite user 
    async function handleSubscribe(sub) {
        try {
            // api to update the user details 
            await fetch('http://localhost:4000/api/auth/update-user/' + recipe.userId, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: uploader.name,
                    email: uploader.email,
                    password: uploader.password,
                    subscribed: sub ? JSON.stringify([...subscribed, user._id]) : JSON.stringify(subscribed.filter((ele) => ele !== user._id))
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    // updating the updated user details 
                    setUploader(res.user)
                    setSubscribed(JSON.parse(res.user.subscribed))
                })
        } catch {
            console.log('fail to fetch');
        }
    }

    //function to handle the delete of the recipe
    function handleDeleteRecipe() {
        try {
            // api to delete the recipe
            fetch('http://localhost:4000/api/recipe/delete-recipe/' + id, {
                method: 'DELETE',
            })
                // it will redirect to home page after deleting the recipe 
                .then(() => {
                    window.location.href = '/'
                })
        } catch {
            console.log('fail to delete');
        }
    }

    useEffect(() => {
        try {
            // api to fetch the recipe details
            fetch('http://localhost:4000/api/recipe/recipe-details/' + id, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((res) => {
                    // storing the recipe detailes in the variable recipe 
                    setRecipe(res.recipe)
                    setIngredients(JSON.parse(res.recipe.ingredient))
                    setInstructions(res.recipe.instructions)
                    try {
                        document.getElementById('recipe-image').style.backgroundImage = `url('http://localhost:4000/${res.recipe.image.replace('\\', '/')}')`
                    } catch {
                        console.log('fail to update image');
                    }
                    // api to get the detailes of recipe uploaded user
                    return fetch('http://localhost:4000/api/auth/user/' + res.recipe.userId, {
                        method: 'GET'
                    })
                })
                .then((res) => res.json())
                .then((res) => {
                    // storing the details of recipe uploader details 
                    setUploader(res.user)
                    setSubscribed(JSON.parse(res.user.subscribed))
                })
        } catch {
            console.log('somthing went wrong');
        }

        // this will update the aactive tab in side navbar
        ActiveTab(0, -1)
    }, [id, recipe, user, uploader])

    return (
        <div className="load-animation fluid-container bg-white mt-lg-5 mt-md-5 mt-5 rounded-4" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="row py-3 px-4 bg-light">
                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-5 col-12 rounded-2"
                    style={{
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        minHeight: '13rem'
                    }}
                    id="recipe-image"
                />
                <div className="col-xl-9 col-lg-8 col-md-12 col-sm-7 col-12 ps-sm-4 ps-0 mt-md-3 mt-3 d-flex flex-column">
                    <div className="p-0 d-flex justify-content-between">
                        <div className="row">
                            {/* recipe name  */}
                            <div className="fs-1 d-xl-inline d-lg-inline d-none">{recipe.recipeName}</div>
                            <div className="fs-2 d-xl-none d-lg-none d-md-inline d-none">{recipe.recipeName}</div>
                            <div className="fs-3 d-xl-none d-lg-none d-md-none d-sm-inline d-inline">{recipe.recipeName}</div>
                            {/* recipe uploader  */}
                            <div className="mt-2 d-flex align-items-center">
                                <div className="text-muted">by</div>
                                <div className="ps-3 pe-2">
                                    <img src={DefaultUser} alt="" width={30} height={30} />
                                </div>
                                {/* link to the profile of recipe uploader  */}
                                <Link to={'/profile/' + recipe.userId} className="text-dark">{name}</Link>
                            </div>
                            {/* subscribe button  */}
                            {/* if the recipe is uploaded by the logged in user it will be display edit button  */}
                            <div className="col-12 d-lg-inline d-xl-flex align-items-center justifi-content-between">
                                {
                                    user ?
                                        recipe.userId !== user._id ?
                                            !subscribed.includes(user._id) ?
                                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 text-light text-center rounded-2 py-2 my-4 fs-6 me-xl-5 me-lg-4 me-md-3" style={{ background: '#FA9200', cursor: 'pointer' }} onClick={() => handleSubscribe(true)}>Subscribe</div> :
                                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 text-center border border-3 rounded-2 py-2 my-4 fs-6 me-xl-5 me-lg-4 me-md-3" style={{ cursor: 'pointer' }} onClick={() => handleSubscribe(false)}>Subscribed</div> :
                                            <Link to={'/edit-recipe/' + recipe._id} >
                                                <div className="col-12 text-center text-dark border border-3 rounded-2 py-2 px-5 my-4 fs-6 me-xl-5 me-lg-4 me-md-3">
                                                    Edit
                                                </div>
                                            </Link> :
                                        null
                                }
                                {/* extra details  */}
                                <div className={"d-flex " + (user ? "" : " pt-4")}>
                                    <div className={"text-center pe-lg-4 pe-md-3" + (user ? " px-xl-5" : " px-xl-0")}>
                                        <img src={recipe.type === 'veg' ? Veg : NonVeg} alt="" width={25} height={25} />
                                        <span className="ms-2">{recipe.type}</span>
                                    </div>
                                    <div className="text-center pe-xl-5 pe-lg-4 pe-md-3 px-sm-3 px-3">•</div>
                                    <div className="text-center">servers {recipe.serves}</div>
                                </div>
                            </div>
                        </div>
                        {/* like button  */}
                        <div className="d-flex flex-column align-items-end justify-content-between pt-2 px-1">
                            <div onClick={handleLike}>
                                <img src={recipe.likedUsers && user ? JSON.parse(recipe.likedUsers).includes(user._id) ? Liked : Favorite : Favorite} alt="" width={40} height={40} id="like" />
                                <div className="text-center">{recipe.likes}</div>
                            </div>
                            {/* delete button  */}
                            {/* if the recipe is uploaded by the logged in user it will be displayed else not  */}
                            <div className="mb-lg-4 pb-2 px-1 text-center">
                                {
                                    user ?
                                        recipe.userId === user._id ?
                                            <img src={Delete} alt="" className="ms-5" onClick={handleDeleteRecipe} width={25} />
                                            : null
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row px-md-5 px-sm-4 px-3 py-4">
                {/* ingredients  */}
                <div className="ingredients my-md-3 my-0">
                    <h4>Ingredients</h4>
                    <ul>
                        {
                            ingredients.map((ele, i) => (
                                <li key={i}>
                                    {ele.quantity}, {ele.ingredient}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {/* instruction  */}
                <div className="mt-3 my-0">
                    <h4>Instructions</h4>
                    <ul>
                        {
                            instructions.split('.').map((ele, i) => (
                                <li key={i}>{ele}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
