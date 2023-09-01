import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import '../assets/styles/pages/Register.css'
import Logo from '../components/Logo'
import showPassword from '../assets/images/view-password.png'
import hidePassword from '../assets/images/hide-password.png'

export default function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const passwordVisibleButton = useRef()
    const errorMessage = useRef()
    
    // the details entered by the user to register will be stored here 
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    //function to toggle the visibility of the password
    function handlePasswordVisible() {
        //toggling the visibility of password by changing its type attribute
        passwordVisibleButton.current.type = passwordVisible ? 'password' : 'text'
        setPasswordVisible(!passwordVisible)
    }

    //function to post the data to database and to handle errors
    async function handlesubmit(e) {
        e.preventDefault()
        await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify({
                name: `${name}`,
                email: `${email}`,
                password: `${password}`
            })
        })
        .then((res) => (res.json()))
        .then((json) => {
            //throwing error if email is not unic
            if (json['message'] === 'duplicate'){
                errorMessage.current.innerHTML = 'An user is already registered with this email'
                errorMessage.current.style.color = 'red'
            }else{
                errorMessage.current.innerHTML = `We'll never share your email with anyone else.`
                errorMessage.current.style.color = 'initial'
                window.location.href = '/login'
            }
        })
    }

    return (
        <div className="d-flex register-page">
            <div className='p-5 w-100'>
                {/* website logo */}
                <Logo size={2} />

                {/* registration form  */}
                <form className='register-form pt-4 mt-5'>
                    <h1>Register</h1>

                    <p>
                        Already have an account?
                        <Link to='/login' className='login-page-link'> Login to your account</Link>
                    </p>

                    {/* data entry block  */}
                    {/* name  */}
                    <div className="row input-group mb-3 pt-5">
                        <label htmlFor="Name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="Name" autoComplete='off' onChange={(e) => setName(e.target.value)} required />
                        </div>
                    </div>

                    {/* email */}
                    <div className="row input-group mb-3">
                        <label htmlFor="Email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-7">
                            <input type="email" className="form-control" id="Email" autoComplete='off' onChange={(e) => setEmail(e.target.value)} required />
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
                                    <input type="password" className="form-control" ref={passwordVisibleButton} autoComplete='off' onChange={(e) => setPassword(e.target.value)} required />
                                    {/* show or hide password button  */}
                                    <div
                                        className="password-status bg-light position-absolute m-1 mx-2"
                                        style={{ backgroundImage: !passwordVisible ? `url(${hidePassword})` : `url(${showPassword})` }}
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
                            <button type='submit' className="btn col-sm-3" onClick={(e) => handlesubmit(e)}>Register</button>
                        </div>
                    </div>
                </form>
            </div>

            {/* regestration page background image  */}
            <div className="register-bg-img w-100 d-xl-inline d-lg-inline d-md-inline d-none" />
        </div >
    )
}