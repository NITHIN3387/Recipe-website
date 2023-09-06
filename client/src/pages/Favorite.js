import { useEffect, useState } from "react"
import ActiveTab from "../utils/ActiveTab"
import '../assets/styles/pages/loadAnimation.css'
import { RecipeCard } from "../components/RecipeCard"
import { useOutletContext } from "react-router-dom"

export default function Favorite() {
    const { use, auth, search } = useOutletContext()
    const [user, setUser] = useState([])
    const [recipies, setRecipies] = useState([])

    useEffect(() => {
        try {
            // api to to user details 
            fetch('http://localhost:4000/api/auth/user', {
                method: 'GET',
                credentials: 'include'
            })
                .then((res) => res.json())
                .then((res) => {
                    // if user is already logged in it will store the user details in user varaible else it will redirect to login page 
                    if (res.status)
                        setUser(res.user)
                    else {
                        window.location.href = '/login'
                    }
                })
        } catch {
            console.log('somthing went wrong', user);
        }

        try {
            // api to get all recipes in our commity 
            fetch('http://localhost:4000/api/recipe/all-recipies', {
                method: 'GET'
            })
                .then((res) => res.json())
                .then((res) => {
                    // checking whether the user is liked this recipe or not 
                    function check(likedUsers) {
                        if (likedUsers.includes(user._id))
                            return true
                        else
                            return false
                    }

                    // filtering the recipe that the user has liked it 
                    res = res.filter((ele) => (
                        check(ele.likedUsers)
                    ))
                    // storing the recipes which user has liked it 
                    setRecipies(res)
                })
        } catch {
            console.log('fail to fetch');
        }

        // this will update the aactive tab in side navbar
        ActiveTab(156.2, 2)
    }, [user])

    return (
        <div className="load-animation my-5">
            <div className="d-flex justify-content-between">
                <h4>Your Best-Loved Recipes</h4>
            </div>
            <div className="recipe-cards mt-4 container p-0" style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '37.5rem' }}>
                <div className="row">
                    {/* mapping all the recipe which user has liked  */}
                    {
                        recipies.length ? recipies.map((ele) => (
                            <RecipeCard recipe={ele} key={ele._id} user={user} auth={auth} />
                        ))
                        // if user didn;t like any recipe this msg wil shown 
                            : <h3 className="w-100 text-center">Your Favorite section is empty !!!</h3>
                    }
                </div>
            </div>
        </div>
    )
}