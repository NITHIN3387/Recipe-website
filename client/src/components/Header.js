import SearchIcon from '../assets/images/search-icon.png'
import DefaultUser from '../assets/images/default-user.png'
import Logout from '../assets/images/logout-icon.png'
import Logo from './Logo'
import NavbarIcon from '../assets/images/navbar-toggle.png'
import '../assets/styles/components/Header.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Header(props) {
    const navigate = useNavigate()

    function handleNavbarToggle() {
        props.navbar.current.style.zIndex = 1
        props.navbar.current.style.animation = 'open 0.5s'
    }

    function handleSearchBar(search) {
        if (window.location.pathname !== '/recipe')
            navigate('/recipe')
        props.search(search)
    }

    async function handleLogout() {
        try {
            await fetch('http://localhost:4000/api/auth/clear-cookies', {
                method: 'GET',
                credentials: 'include'
            })
        } catch {
            console.log('somthing went wrong')
        }
    }

    function UserDetail(params) {
        if (!params.auth) {
            return (
                <div className="login-register p-0 col-xl-2 col-lg-3 col-md-5 col-sm-4 col-3 d-lg-flex d-md-flex d-none align-items-center justify-content-center ps-3">
                    <Link to='/register' className='p-2 text-light'>Register</Link>
                    <div className='mx-2'>or</div>
                    <Link to='/login' className='p-2 text-light'>Login</Link>
                </div>
            )
        } else {
            return (
                <div className="user-info col-xl-1 col-lg-2 col-md-3 col-sm-2 col-4 d-lg-flex d-md-flex d-none align-items-center justify-content-center ps-3">
                    <Link to={'/profile/' + props.user._id}>
                        <img src={DefaultUser} alt="" width={45} className='pe-2' />
                    </Link>
                    <Link to='/login' onClick={handleLogout}>
                        <img src={Logout} alt="" width={35} />
                    </Link>
                </div>
            )
        }
    }

    function UserDetailMobileView(params) {
        if (!params.auth) {
            return (
                <div className="login-register d-flex align-items-center justify-content-center ps-3">
                    <Link to='/login' className='p-2 text-light'>Login</Link>
                </div>
            )
        } else {
            return (
                <div className="user-info d-flex align-items-center justify-content-center ps-3">
                    <Link to={'/profile/' + props.user._id}>
                        <img src={DefaultUser} alt="" width={45} className='pe-2' />
                    </Link>
                    <Link to='/login' onClick={handleLogout}>
                        <img src={Logout} alt="" width={35} />
                    </Link>
                </div>
            )
        }
    }

    function SearchBar() {
        if (!props.auth) {
            return (
                <div className="col-xl-10 col-lg-9 col-md-7 col-12 d-flex bg-light py-2 px-3 align-items-center search-box" onClick={() => handleSearchBar('')}>
                    <img src={SearchIcon} alt="" height={17} />
                    <input type="text" className='form-control px-3 bg-light border-0' id='search-bar' placeholder='Search by food name' onChange={(e) => handleSearchBar(e.target.value)}/>
                </div>
            )
        } else {
            return (
                <div htmlFor='search-bar' className="col-xl-11 col-lg-10 col-md-9 col-12 d-flex bg-light py-2 px-3 align-items-center search-box" onClick={() => handleSearchBar('')}>
                    <img src={SearchIcon} alt="" height={17} />
                    <input type="text" className='form-control px-3 bg-light border-0' id='search-bar' placeholder='Search by food name' onChange={(e) => handleSearchBar(e.target.value)}/>
                </div>
            )
        }
    }

    return (
        <div className='fluid-container'>
            <div className="row m-0">
                <div className='col-12 d-lg-none d-md-none d-flex px-0 justify-content-between pb-4'>
                    <img src={NavbarIcon} alt="" width={40} onClick={handleNavbarToggle} />
                    <Logo size={1.5} />
                    <UserDetailMobileView auth={props.auth} />
                </div>
                <SearchBar />
                <UserDetail auth={props.auth} />
            </div>
        </div>
    )
}