import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './RegistrationPage.css'
import { useHistory } from "react-router-dom";

const RegistrationPage = (props) => {
    const [usersList, setUsersList] = useState([])
    const [name, setName] = useState("");
    const [buttonState, setButtonState] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [valid, setValid] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory();
    const prevUsersListCount = useRef(usersList.length);
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        username: ''
    })

    const changeFormValue = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setFormValues({
            ...formValues,
            [name]: value
        })
    }



    useEffect(() => {
        const userslistNew = localStorage.getItem('usersList')
        if (userslistNew) {
            setUsersList(JSON.parse(userslistNew))
        }
    }, [])

    useEffect(() => {
        if (usersList.length) {
            localStorage.setItem("usersList", JSON.stringify(usersList));
            setFormValues(() => ({
                email: '',
                password: '',
                username: ''
            }))
        }
    }, [usersList]);

    const registrButton = (e) => {
        e.preventDefault()
        const isValid = validateForm();
        const isUserExists = usersList.find(element => element.email === formValues.email)
        if (isValid) {
            if (!isUserExists) {
                prevUsersListCount.current = usersList.length;
                setUsersList([
                    ...usersList,
                    formValues
                ])

            } else {
                setError('User with this email is registered')
            }
        } else {
            setError('incorect email or password(password cannot be shorter than 8)')
        }
    }

    const validateForm = () => {
        const checkEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formValues.email);
        const checkPassword = formValues.password.length > 7
        setValid(checkEmail && checkPassword);
        return checkEmail && checkPassword
    }
    function foo() {
        setButtonState(true)
    }
    
    useEffect(() => {
        if (usersList.length > prevUsersListCount.current && buttonState) {
            history.push("/");
        }
    }, [usersList.length])



    return (
        <div className='generalPage'>
            <form onSubmit={registrButton}>
                <NavLink to='/'>
                    <img className='registrationLogo' src='https://upload.wikimedia.org/wikipedia/commons/4/4c/Sport-1-Logo%2C_2013.svg' />
                </NavLink>
                <div className='inputDiv'>
                    Email:<input
                        value={formValues.email}
                        type='text'
                        name='email'
                        placeholder='Email'
                        onChange={changeFormValue}
                    />
               Password: <input
                        value={formValues.password}
                        type='password'
                        name='password'
                        placeholder='Password'
                        onChange={changeFormValue}
                    />
                Nickname
                <input
                        name='username'
                        type='text'
                        value={formValues.username}
                        placeholder='Username'
                        onChange={changeFormValue}
                    />
                    <button type='submit' className='addButton' onClick={foo}>REGIST </button>
                    <p></p>


                    <div className='error'>{error}</div>
                </div>
            </form>
        </div >

    )

}
export default RegistrationPage