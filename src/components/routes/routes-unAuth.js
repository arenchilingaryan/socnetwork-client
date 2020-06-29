import React from 'react'
import AuthPage from '../auth/auth'
import { Route, Redirect } from 'react-router-dom'


function UnAuthRoutes() {
    return (
        <div>
            <Route path='/' component={AuthPage} />
            <Redirect to="/login" />
        </div>
    )
}

export default UnAuthRoutes