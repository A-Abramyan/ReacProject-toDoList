import React, { useState, useEffect, useRef, useContext } from 'react';
import { MyContext } from '../../App'
import './ToDoList.css'
import { NavLink } from 'react-router-dom';


function ToDoList({ event, onChildClick, notesL }) {
    const user = useContext(MyContext)



    const [notes, setNotes] = useState({
        notes: '',
        categoris: ''
    })
    const [notesList, setNotesList] = useState(notesL)
    const [categoris, setCategoris] = useState({})



    const changeNotesInput = (event) => {
        const name = event.target.name;
        const value = event.target.value
        // console.log('event', value)
        setNotes({
            ...notes,
            [name]: value
        })
        console.log('notes', notes)
        // console.log('event', value)
    }

    async function addButton() {
        await setNotesList([
            ...notesList,
            notes
        ])


    }

    useEffect(() => {
        onChildClick(notesList)
    }, [notesList])

    console.log('notesList', notesList)

    return (
        <div>
            <div className='header'>
                <div className='poxos'>
                    <button className='menuButton' >
                        <img className='userIcon' src='https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png' />
                    </button>

                    <nav className="menu">
                        <div className='menuItem'>

                            <NavLink to='/settings'>
                                <b>Setting</b>
                            </NavLink>

                            <b> Messages</b>

                            <NavLink to='/userPage'>
                                <p>UserPage</p>
                            </NavLink>

                            <button className='logoutBtn'>
                                LogOut
                         </button>
                        </div>
                    </nav>
                </div>
            </div>
            <input
                name='notes'
                className='notesInput'
                onChange={changeNotesInput}
            />
            <select name='categoris' onChange={changeNotesInput}>
                <option selected hidden>Choose here</option>
                <option>FrontEnd</option>
                <option>BackEnd</option>
            </select>

            <button onClick={addButton}>add</button>

            <ul>{
                notesList.map(elem => <li>{`${elem.notes} ${elem.categoris}`} </li>)
            }</ul>
        </div>
    )

}
export default ToDoList