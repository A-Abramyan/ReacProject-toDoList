import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/Registration/RegistrationPage'
import UserPage from './components/userPage/userPage';
import Settings from './components/Settings/Settings';
import ProtectedRoute from './components/ProtectedRoute'
import ToDoList from './components/toDoList/ToDoList';

export const MyContext = React.createContext({})

function App(props) {
  const [test, setTest] = useState([])
  const [user, setUser] = useState(null)
  console.log('user', user)

  function handleChildClick(notesList) {
    setTest(notesList)
  }
  console.log('test', test)
  useEffect(() => {
    if (user) {
      localStorage.setItem("loginUser", JSON.stringify(user));
      // setFormValues(() => ({
      //   email: '',
      //   password: '',
      //   username: ''
      // }))
    }
  }, [user]);
  return (
    <BrowserRouter>
      <MyContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path='/' render={() => <LoginPage />} />
          <Route path='/registration' component={RegistrationPage} />
          <ProtectedRoute user={user} test={test} path='/userPage' render={() => <UserPage />} />
          <Route path='/settings' render={() => <Settings />} />
          <Route path='/notes' render={() => <ToDoList notesL={test} onChildClick={handleChildClick} />} />
        </Switch>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
