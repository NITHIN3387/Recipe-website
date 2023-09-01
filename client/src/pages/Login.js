import { Link } from 'react-router-dom'
import '../assets/styles/pages/Login.css'
import { useRef, useState } from 'react'
import Logo from '../components/Logo'
import showPassword from '../assets/images/view-password.png'
import hidePassword from '../assets/images/hide-password.png'

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const passwordVisibleButton = useRef()
    const errorMessage = useRef()

    // the details entered by the user to register will be stored here 
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    //function to post the data to database and to handle errors
    async function handlesubmit(e) {
        e.preventDefault()
        await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then((res) => (res.json()))
        .then((json) => {
            //throwing error if email or password is wrong
            if (json['message'] !== 'ok'){
                errorMessage.current.innerHTML = 'Invalid email ID or password'
                errorMessage.current.style.color = 'red'
            }else{
                errorMessage.current.innerHTML = `We'll never share your email with anyone else.`
                errorMessage.current.style.color = 'initial'
                //redirecting to Home page
                window.location.href = '/'
            }
        })
    }

    function handlePasswordVisible() {
        //toggling the visibility of password by changing its type attribute
        passwordVisibleButton.current.type = passwordVisible ? 'password' : 'text' 
        setPasswordVisible(!passwordVisible)
    }

    return (
        <div className="d-flex login-page">

            {/* login page background image  */}
            <div className="login-bg-img w-100 d-lg-inline d-md-inline d-none" />

            <div className='p-5 w-100'>
                {/* website logo */}
                <Logo size={2} />

                {/* login form  */}
                <form className='login-form pt-5 mt-5 justify-content-center'>
                    <h1>Login</h1>

                    <p>
                        Don't have an account?
                        <Link to='/register' className='regsiter-page-link'> Create your account</Link>
                        , it takes less than a minute
                    </p>

                    {/* data entry block  */}
                    {/* email */}
                    <div className="row mb-3 pt-5">
                        <label htmlFor="Email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-7">
                            <input type="email" className="form-control" id="Email" autoComplete='off' onChange={(e) => setEmail(e.target.value)} required/>
                            {/* error messages */}
                            <div className="form-text ps-2" ref={errorMessage}>We'll never share your email with anyone else.</div>
                        </div>
                    </div>

                    {/* password  */}
                    <div className="row input-group mb-3">
                        <label htmlFor="Password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-7">
                            <div className="row ps-1">
                                <div className="col-sm-12 pe-0 d-flex justify-content-end">
                                    <input type="password" className="form-control" ref={passwordVisibleButton} autoComplete='off' onChange={(e) => setPassword(e.target.value)} required/>
                                    {/* show or hide password button  */}
                                    <div
                                        className="password-status bg-light position-absolute m-1 mx-2"
                                        style={{backgroundImage: !passwordVisible ? `url(${hidePassword})` : `url(${showPassword})`}}
                                        onClick={handlePasswordVisible} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* submit button  */}
                    <div className="row mb-3">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-7 align-items-center">
                            <button type="submit" className="btn col-sm-3" onClick={(e) => handlesubmit(e)}>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}