
import './LoginPage.css'
import { NavLink } from 'react-router-dom'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { MyContext } from '../../App'


function LoginPage(props) {
    const test = useContext(MyContext);
    // const [loginValidation, useLoginValidation] = useState(null);
    const history = useHistory();
    const [error, setError] = useState('')
    const [usersList, setUsersList] = useState([])
    const prevUsersListCount = useRef(usersList.length);
    const [valid, setvalid] = useState(false)
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })


    const changeLoginForm = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setLoginForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    async function validateForm() {
        const checkEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(loginForm.email);
        const user = props.user
        const checkPassword = loginForm.password.length > 7
        console.log('.user', user)
        setvalid(checkEmail && checkPassword)
        return checkEmail && checkPassword
    }
    useEffect(() => {
        const userslistNew = localStorage.getItem('usersList')
        if (userslistNew) {
            setUsersList(JSON.parse(userslistNew))
        }
    }, [])

    // useEffect(() => {
    //     if (usersList.length > prevUsersListCount.current) {
    //         history.push("/");
    //     }
    // }, [usersList])

    function loginButton() {
        const isValid = validateForm();
        validateForm();
        if (isValid) {
            const userLogin = usersList.length > 0 && usersList.find(element => element.email === loginForm.email && element.password === loginForm.password)

            if (userLogin) {
                test.setUser(loginForm)
                history.push('/userPage')

            } else {
                setError('User with this email or password is not registered)')
            }
        } else {
            setError('incorect email or password(password cannot be shorter than 8)')
        }


    }
    return (
        <div className='loginBody'>
            <div className='loginPage'>
                <div className='logoDiv'>
                    <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/4/4c/Sport-1-Logo%2C_2013.svg' />
                </div>
                <div className='loginForm'>
                    <div>
                        <div>
                            <input
                                onChange={changeLoginForm}
                                type='text'
                                name='email'
                                value={loginForm.email}
                                className='emailInp'
                                placeholder='Email'
                            />

                        </div>
                        <div>
                            <input
                                onChange={changeLoginForm}
                                type='password'
                                name='password'
                                minLength='8'
                                maxLength='16'
                                value={loginForm.password}
                                className='passwordInp'
                                placeholder='Password'
                            />
                        </div>
                    </div>
                </div>
                <div className='error'>{error}</div>
                <button className='loginBtn' onClick={loginButton} >LogIn</button>
                <NavLink to='/registration'><button className='registrationBtn'>Registration</button></NavLink>
            </div>
        </div>
    )

}
export default LoginPage