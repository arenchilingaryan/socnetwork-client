import React from 'react'
import AuthHeader from "./auth-header/auth-header"
import { Route } from 'react-router-dom'
import LoginPage from "./login-page/login-page";
import RegisterPage from "./register-page/register-page";

const AuthPage = () => {
    return (
        <div>
            <AuthHeader/>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
        </div>
    )
}

export default AuthPage
