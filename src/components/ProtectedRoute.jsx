
import React from 'react'
import { Redirect } from 'react-router-dom'
import UserPage from './userPage/userPage';

function ProtectedRoute(props) {
    const user = props.user

    console.log('user', user)

    return user ? (
        <UserPage {...props} />
    ) : (
            <Redirect to={{ pathname: '/' }} />
        );

}

export default ProtectedRoute;