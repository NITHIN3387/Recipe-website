import { useEffect, useState } from "react"
import ActiveTab from "../utils/ActiveTab"
import '../assets/styles/pages/loadAnimation.css'
import { RecipeCard } from "../components/RecipeCard"

export default function Favorite() {
    const [user, setUser] = useState([])
    const [recipies, setRecipies] = useState([])

    useEffect(() => {
        try {
            fetch('http://localhost:4000/api/auth/user', {
                method: 'GET',
                credentials: 'include'
            })
                .then((res) => res.json())
                .then((res) => {
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
            fetch('http://localhost:4000/api/recipe/all-recipies', {
                method: 'GET'
            })
                .then((res) => res.json())
                .then((res) => {
                    function check(likedUsers) {
                        if (likedUsers.includes(user._id))
                            return true
                        else
                            return false
                    }

                    res = res.filter((ele) => (
                        check(ele.likedUsers)
                    ))
                    setRecipies(res)
                })
        } catch {
            console.log('fail to fetch');
        }

        ActiveTab(156.2, 2)
    }, [user])

    return (
        <div className="load-animation my-5">
            <div className="d-flex justify-content-between">
                <h4>Your Best-Loved Recipes</h4>
            </div>
            <div className="recipe-cards mt-4 container p-0" style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '37.5rem' }}>
                <div className="row">
                    {
                        recipies.length ? recipies.map((ele, i) => (
                            <RecipeCard recipe={ele} key={ele._id} user={user} />
                        ))
                            : <h3 className="w-100 text-center">Your Favorite section is empty !!!</h3>
                    }
                </div>
            </div>
        </div>
    )
}