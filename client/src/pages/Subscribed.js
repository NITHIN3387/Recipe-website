import { useEffect, useState } from "react"
import ActiveTab from "../utils/ActiveTab"
import DefaultUser from '../assets/images/default-user.png'
import '../assets/styles/pages/loadAnimation.css'
import { useOutletContext } from "react-router-dom"
import { RecipeCard } from "../components/RecipeCard"


export default function Setting() {
    const { use, auth, search } = useOutletContext()
    const [recipies, setRecipies] = useState([])
    const [user, setUser] = useState([])
    const [users, setUsers] = useState([])
    const [allUsersID, setAllUsersId] = useState([])
    const [usersId, setUsersId] = useState([-1])
    const [filter, setFilter] = useState()

    function handleFilter(id, i) {
        const chef = document.getElementById(`chef${i}`)
        const chefName = document.getElementById(`chef-name${i}`)
        if ([...chef.classList].includes('bg-primary')) {
            chef.classList.remove('bg-primary')
            chefName.classList.remove('text-light')
            setUsersId(allUsersID)
            setFilter()
        } else {
            setUsersId(id)
            setFilter(id)
        }
    }

    useEffect(() => {
        try {
            fetch('http://localhost:4000/api/auth/user', {
                method: 'GET',
                credentials: 'include'
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.status){
                        setUser(res.user)
                        return fetch('http://localhost:4000/api/auth/subscribed/' + res.user._id, {
                            method: 'GET'
                        })
                    }else {
                        window.location.href = '/login'
                        return res
                    }
                })
                .then((res) => res.json())
                .then((res) => {
                    setUsers(res.user)
                    if (usersId[0] === -1)
                        setUsersId(res.user.map((ele) => ele._id))
                    setAllUsersId(res.user.map((ele) => ele._id))
                })
            fetch('http://localhost:4000/api/recipe/all-recipies', {
                method: 'GET'
            })
                .then((res) => res.json())
                .then((res) => {
                    setRecipies(res.filter((ele) => usersId.includes(ele.userId)))
                })
        } catch {
            user ? console.log("fail to fetch") : window.location.href = '/login'
        }
        ActiveTab(231.7, 3)
    }, [user, usersId, recipies, filter])

    return (
        <div className="load-animation" style={{ overflow: 'auto' }}>
            <div className="chef-list d-flex bg-light my-5 rounded-4 py-3 px-2" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, .05)', overflow: 'auto' }}>
                {
                    users.length ?
                        users.map((ele, i) => (
                            <div className={"chef text-center rounded-4 p-2 mx-2" + (ele._id === filter ? " bg-primary" : "")} id={`chef${i}`} style={{ minWidth: '7.5rem', maxWidth: '5rem' }} key={i} onClick={() => handleFilter(ele._id, i)}>
                                <img src={DefaultUser} alt="" width={80} />
                                <div className={"chef-name" + (ele._id === filter ? " text-light" : "")} id={`chef-name${i}`}>{ele.name}</div>
                            </div>
                        )) :
                        <div className="text-center w-100">
                            <h3>You didn't Subscribe any User at!</h3>
                            <p>Subscrive your favorite user and get daily updated 😊</p>
                        </div>
                }
            </div>

            <div className="container p-0" style={{ overflow: 'auto', maxHeight: '29.4rem'}}>
                <div className="row" style={{maxHeight: '70rem'}}>
                    {
                        recipies.length ? recipies.filter((ele) => users).map((ele, i) => (
                            <RecipeCard recipe={ele} key={ele._id} user={user}  auth={auth}/>
                        )) :
                            <h3 className="text-center w-100">No Recipies to see ..</h3>
                    }
                </div>
            </div>
        </div>
    )
}