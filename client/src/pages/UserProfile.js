import { useEffect, useState } from 'react'
import DefaultUser from '../assets/images/default-user.png'
import ActiveTab from '../utils/ActiveTab'
import { RecipeCard } from '../components/RecipeCard'
import { useParams } from 'react-router-dom'

export default function UserProfile() {
    const [user, setUser] = useState([])
    const [userDetail, setUserDetail] = useState([])
    const [recipies, setRecipies] = useState([])

    const { id } = useParams()

    async function fetchUserDetais() {
        try{
            await fetch('http://localhost:4000/api/auth/user', {
                method: 'GET',
                credentials: 'include'
            })
                .then((res) => res.json())
                .then((res) => {
                    setUser(res.user)
                })
            await fetch('http://localhost:4000/api/auth/user/' + id, {
                method: 'GET',
                credentials: 'include'
            })
                .then((res) => res.json())
                .then((res) => {
                    setUserDetail(res.user)
                })
        }catch{
            console.log('fail to fetch');
        }
    }

    async function fetchUserRecipies() {
        try{
            await fetch('http://localhost:4000/api/recipe/user-recipies/' + id, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((res) => {
                    setRecipies(res.recipies)
                })
        }catch{
            console.log('fail to fetch');
        }
    }

    async function handleSubscribe(sub) {
        try {
            await fetch('http://localhost:4000/api/auth/update-user/' + user._id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: userDetail.name,
                    email: userDetail.email,
                    password: userDetail.password,
                    subscribed: sub ? JSON.stringify([...(JSON.parse(userDetail.subscribed)), userDetail._id]) : JSON.stringify((JSON.parse(userDetail.subscribed)).filter((ele) => ele !== userDetail._id))
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    setUserDetail(res.user)
                })
        } catch {
            console.log('fail to fetch');
        }
    }

    useEffect(() => {
        fetchUserDetais()
        fetchUserRecipies()

        ActiveTab(0, -1)
    }, [id])

    return (
        <div className="load-animation rounded-4 mt-5" style={{overflowY: 'auto', overflowX: 'hidden'}}>
            <div className="rounded-4">
                <div className="row p-3 rounded-4" style={{ background: 'white' }}>
                    <div
                        className="col-xl-2 col-lg-3 col-md-4 col-sm-3 col-5"
                        style={{
                            background: `url('${DefaultUser}')`,
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat'
                        }}>
                    </div>
                    <div className="col-xl-10 col-lg-9 col-md-8 col-sm-9 col-7">
                        <div className='fs-2 fw-bold'>{userDetail.name}</div>
                        <div className='fs-6'>
                            <span className='fw-semibold'>
                                {
                                    userDetail.subscribed !== undefined ? 
                                        JSON.parse(userDetail.subscribed).length > 100000000000 ? `${(JSON.parse(userDetail.subscribed).length / 1000000000).toFixed(2)}b ` :
                                        JSON.parse(userDetail.subscribed).length > 100000000 ? `${(JSON.parse(userDetail.subscribed).length / 1000000).toFixed(2)}m ` :
                                        JSON.parse(userDetail.subscribed).length > 100000 ? `${(JSON.parse(userDetail.subscribed).length / 1000).toFixed(2)}k ` 
                                        : `${JSON.parse(userDetail.subscribed).length} `
                                    : `0 `
                                }
                            </span>
                            subscribers
                        </div>
                        {
                            userDetail.subscribed !== undefined && user ?
                                !(userDetail._id === user._id) ?
                                    JSON.parse(userDetail.subscribed).includes(user._id) ?
                                        <div className="col-xl-4 col-lg-6 col-md-9 col-12 border border-3 text-center rounded-2 py-2 my-4 fs-6" style={{ cursor: 'pointer' }} onClick={() => handleSubscribe(false)}>Subscribed</div> :
                                        <div className="col-xl-4 col-lg-6 col-md-9 col-12 text-light text-center rounded-2 py-2 my-4 fs-6" style={{ background: '#FA9200', cursor: 'pointer' }} onClick={() => handleSubscribe(true)}>Subscribe</div>
                                    : <div className="col-xl-4 col-lg-6 col-md-9 col-12 border border-3 text-center rounded-2 py-2 my-4 fs-6">Edit</div>
                                : null
                        }
                    </div>
                </div>
                <div className='rounded-4 px-4 pb-4 mt-3' style={{background: 'white'}}>
                    <div className="mb-4 row">
                        <h4 className="col-12 pt-4 border-bottom pb-3">Posts</h4>
                    </div>
                    <div className="container p-0 d-flex" style={{overflowX: 'auto'}}>
                        {
                            recipies.length ? recipies.map((ele, i) => (
                                <RecipeCard recipe={ele} user={userDetail} key={i} />
                            )) : <h3 className='text-center w-100'>You didn't post any recipies at !!</h3>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}
