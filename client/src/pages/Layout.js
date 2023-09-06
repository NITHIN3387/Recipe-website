import SideNavbar from "../components/SideNavbar";
import '../assets/styles/pages/Layout.css'
import Header from "../components/Header";
import { useEffect, useMemo, useRef, useState } from 'react'
import { Outlet } from "react-router-dom";

export default function Home() {
    const [auth, setAuth] = useState()      //stores a boolean value which will tell user is authorized or not
    const [user, setUser] = useState()      //stores the details or login user
    const [searchRecipe, setSearchRecipe] = useState('')
    const sideNavbar = useRef()

    //fuction which fetch the details of login user and stores in 'user'
    async function fetchUserData() {
        try {
            await fetch('http://localhost:4000/api/auth/user', {
                method: 'GET',
                credentials: 'include'
            })
                .then((res) => (res.json()))
                .then((json) => {
                    //checking whether user is already login or not
                    if (json['status']) {
                        setAuth(true)
                        setUser(json.user)
                    } else
                        setAuth(false)
                })
        } catch {
            console.log('somthing went wrong !!!');
            setAuth(false)
        }
    }

    // function to handle the searched recipies
    function search(recipe) {
        setSearchRecipe(recipe)
    }

    useEffect(() => {
        fetchUserData()
    }, [auth])

    return (
        <div className="fluid-container home-page">
            <div className="row">
                {/* side nav bar  */}
                <div className="d-grid col-xl-2 col-lg-3 col-md-4 col-sm-5 col-9 px-5 py-4 bg-light side-navbar" ref={sideNavbar}>
                    <SideNavbar auth={auth} navbar={sideNavbar} />
                </div>
                <div className="col-xl-10 col-lg-9 col-md-8 pt-4 px-5" style={{ background: '#f3f3ff' }}>
                    {/* useMemo is used to avoid the rerender every time  */}
                    {/* it will rerender if any changes happen in the variable auth or sideNavbar values */}
                    {useMemo(() => <Header auth={auth} user={user} navbar={sideNavbar} search={search} />, [auth, sideNavbar])}
                    <div className="section">
                        <Outlet context={{ user: user, auth: auth, search: searchRecipe }} />
                    </div>
                </div>
            </div>
        </div>
    )
}