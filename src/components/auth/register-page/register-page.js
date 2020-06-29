import React, { useState, Fragment } from 'react'
import { useHttp } from '../../../hooks/http-hook'
import './register-page.scss'
import Spinner from '../../spinner/spinner'
import { useHistory } from 'react-router-dom'
import { serverURL } from '../../app/app'

const RegisterPage = () => {
    const [done, setDone] = useState(false)
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: ''
    })
    
    const history = useHistory()
    const { request, loading, error, clearError } = useHttp()

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        try {
            const data = await request(`${serverURL}/api/auth/register`, 'POST', form, false)
            if (data) {
                setDone(true)
                clearError()
                setForm('')
                setTimeout(() => {
                    history.push('/login')
                },500)
            }
        } catch (e) {
            
        }
    }


    return (
        <Fragment>
            {
                loading
                ? <Spinner />
                : <div className="authRegister">
                    <h1 className="authRegister__error" style={ error ? {display: 'block'} : {display: 'none'} }> Error!</h1>
                    <h1 className="authRegister__done" style={ done ? {display: 'block'} : {display: 'none'} } >User Registered Successfully!</h1>
                    <label htmlFor="firstName">First name</label>
                        <input onChange={changeHandler} className="authRegister__input" type="text" name="firstName"/>
                    <label htmlFor="lastName">Last name</label>
                        <input onChange={changeHandler} className="authRegister__input" type="text" name="lastName"/>
                    <label htmlFor="email">Email</label>
                        <input onChange={changeHandler} className="authRegister__input" type="text" name="email"/>
                    <label htmlFor="password">Password</label>
                        <input onChange={changeHandler} className="authRegister__input" type="text" name="password"/>
                    <label htmlFor="rePassword">Enter Password</label>
                        <input onChange={changeHandler} className="authRegister__input" type="text" name="rePassword"/>
                    <button onClick={submitHandler} className="authRegister__button">Sign Up</button>
                </div>
            }
        </Fragment>
        
    )
}

export default RegisterPage
