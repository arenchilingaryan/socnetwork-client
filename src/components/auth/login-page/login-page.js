import React, { useState, useContext, Fragment } from 'react'
import Spinner from '../../spinner/spinner'
import { useHttp } from '../../../hooks/http-hook'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../../context/auth-context'
import { serverURL } from '../../app/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import './login-page.scss'

const LoginPage = () => {
    const [openPassword, setOpenPassword] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const auth = useContext(AuthContext)
    const history = useHistory()

    const { request, loading, error, clearError } = useHttp()

    const setOpenPass = () => {
        setOpenPassword(!openPassword)
    }

    const loginChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const loginHandler = async (event) => {
        event.preventDefault()
        const data = await request(`${serverURL}/api/auth/login`, 'POST', form, false)
        if (data) {
            clearError()
            auth.login(data.token, data.userId, data.email)
            history.push('/profile')
            window.location.reload()
        }
    }

    return (
        <Fragment>
            {
                loading
                    ? <Spinner />
                    : <form className="authLogin">
                        <h1 style={error ? { display: 'block' } : { display: 'none' }} >Incorrect Email Or Password!</h1>
                        <label htmlFor="email">Email</label>
                        <input onChange={loginChangeHandler} className="authLogin__input" type="text" name="email" />
                        <div className="authLogin__password-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={loginChangeHandler}
                                className="authLogin__input"
                                type={openPassword ? 'text' : 'password'}
                                name="password" />
                            <FontAwesomeIcon
                                icon={faLock}
                                onClick={setOpenPass}
                                className="authLogin__password-icon"
                                style={openPassword ? { display: 'none' } : { display: 'block' }}
                            />
                            <FontAwesomeIcon
                                icon={faLockOpen}
                                onClick={setOpenPass}
                                className="authLogin__password-icon"
                                style={openPassword ? { display: 'block' } : { display: 'none' }}
                            />
                        </div>
                        <button onClick={loginHandler} className="authLogin__button">Log In</button>
                    </form>
            }
        </Fragment>

    )
}

export default LoginPage
