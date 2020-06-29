import React from 'react'
import { NavLink } from 'react-router-dom'
import './auth-header.scss'

const AuthHeader = () => {
    return (
        <div className="authHeader__wrapper">
            <div className="authIcon">
                <span className="authIcon__item"></span>
                <span className="authIcon__item"></span>
                <span className="authIcon__item"></span>
                <span className="authIcon__item"></span>
            </div>
            <div className="authHeader__body">
                <NavLink className="authHeader__item" to="/login">SIGN IN</NavLink>
                <NavLink className="authHeader__item" to="/register">SIGN UP</NavLink>
            </div>
        </div>
    )
}

export default AuthHeader
