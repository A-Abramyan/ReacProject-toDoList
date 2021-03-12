import React, { useState, useEffect, useRef } from 'react';
import './Settings.css'

function Settings() {
    const [userInfo, setUserInfo] = useState('')
    const [loginUser, setloginUser] = useState('')
    const [userPassword, setPassword] = useState(false)
    const [passwordNew, setPasswordNew] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [changingUser, setChangingUser] = useState({})
    const [valid, setValid] = useState(false)
    const [error, setError] = useState('')
    // const [test, setTest] = useState({})

    const validateForm = () => {
        const checkEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(userInfo.email);
        // const checkPassword = formValues.password.length > 7
        setValid(checkEmail);
        return checkEmail
    }

    useEffect(() => {
        setloginUser(JSON.parse(localStorage.getItem('loginUser')))
    }, [])
    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem('loginUser')))
    }, [])


    const changeUserEmail = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    // console.log('userInfo', userInfo)
    const oldPasswordCheck = (event) => {
        const value = event.target.value

        if (userInfo.password === event.target.value) {
            setPassword(true)
        } else {
            setPassword(false)
        }
    }
    function changePassword(event) {
        setPasswordNew(event.target.value)
    }
    function conformPassword(event) {
        setConfirmPassword(event.target.value)
    }
    function newPassword(e) {
        e.preventDefault()
        const isValid = validateForm();
        const ul = JSON.parse(localStorage.getItem('usersList'))
        console.log('1ul', ul)
        // console.log('loginUser', loginUser.email)
        const check = ul.findIndex(element => element.email === loginUser.email)
        console.log('check', check)
        // ul.splice(check, 1)
        ul.splice(check, 1, changingUser)
        console.log('1ul', ul)
        console.log('userInfo', userInfo)
        const checkEmail = ul.find(element => element.email === userInfo.email)

        if (isValid) {
            if (checkEmail) {
                setError('user with this email already registered')

            } else {
                setChangingUser({
                    email: userInfo.email,
                    password: confirmPassword
                })
                setError('')

                // ul.push(changingUser)


            }
        }
        else {
            setError('incorect email')
        }
        console.log('finish', ul)
        localStorage.setItem("usersList", JSON.stringify(ul));
    }


    return (
        <div >
            <form>
                <label className='headingLabel'>
                    Email:
                    <input
                        name='email'
                        onChange={changeUserEmail}
                    />
                </label>
                {error && <div className='error'>{error}</div>}
                <label className='headingLabel'>
                    Old password
                    <input
                        disabled={userPassword}
                        type='password'
                        onChange={oldPasswordCheck} />
                </label>
                {userPassword && (
                    <div>
                        <label className='headingLabel'>
                            New password
                              <input
                                onChange={changePassword}
                            />
                        </label>
                        <label className='headingLabel'>
                            Confirm password
                               <input
                                onChange={conformPassword}
                            />
                        </label>
                    </div>
                )

                }
                <button onClick={newPassword}>
                    Chage
                </button>

            </form>
        </div>

    )

}
export default Settings