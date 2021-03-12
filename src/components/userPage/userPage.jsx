import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { MyContext } from '../../App'
import './userPage.css'

function UserPage({ test }) {
    const user = useContext(MyContext)
    const [userRemove, setUserRemove] = useState(false)
    const [developerName, setDeveloperName] = useState({
        name: ''
    })
    const [filterDev, setFilterDev] = useState({
        categoris: ''
    })
    const [searchInp, setSearchInp] = useState('')
    const history = useHistory();

    // const foo5 = (event) => {
    //     if (test.length > 0) {
    //         setDeveloperName(test.filter(elem => elem.categoris == filterDev.categoris))
    //     }
    // }
    const filterDeveloper = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setFilterDev({
            [name]: value
        })

    }
    const filterDeveloperName = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setDeveloperName({
            [name]: value
        })
    }


    async function removeUser(e) {
        e.preventDefault()
        await setUserRemove(true)
    }
    console.log('userRemove', userRemove)

    useEffect(() => {
        localStorage.removeItem('loginUser')
        console.log('userRemove', userRemove)
        if (userRemove) {
            user.setUser(null)
            history.push('/')
        }
    }, [userRemove])
    console.log('userRemove', userRemove)
    function searchDeveloper() {
        test.filter()
    }
    function reset(params) {
        setFilterDev({
            categoris: ''
        })
        setDeveloperName({
            name: ''
        })
    }
    console.log('test', test)
    return (
        <div className='userPage'>

            <div className='header'>

                <div className='poxos'>
                    <button className='menuButton'  >
                        <img className='userIcon' src='https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png' />
                    </button>

                    <nav className="menu">
                        <div className='menuItem'>

                            <NavLink to='/settings'>
                                <b>Setting</b>
                            </NavLink>

                            <b> Messages</b>

                            <NavLink to='/notes'>
                                <p>Notes</p>
                            </NavLink>

                            <button className='logoutBtn'
                                onClick={removeUser} >
                                LogOut
                                </button>

                        </div>
                    </nav>
                </div>
            </div >
            <div className='search'>
                <input name='name' value={developerName.name} onChange={filterDeveloperName} className='searchInput' />
                <select value={filterDev.categoris} className='filter' name='categoris' onChange={filterDeveloper}>
                    <option selected hidden>Choose here</option>
                    <option>FrontEnd</option>
                    <option>BackEnd</option>
                </select>
            </div>
            <div className='content'>{test.length > 0 ? test.map(elem => {
                const valid = !developerName.name || elem.notes.includes(developerName.name)
                const valid1 = !filterDev.categoris || elem.categoris === filterDev.categoris
                if (valid && valid1) {
                    return <p className='content'> {elem.notes} - {elem.categoris}</p>
                }
            }) : ''}</div>
            ,<button className='resetButton' onClick={reset}>Reset </button>
        </div >

    )

}
export default UserPage