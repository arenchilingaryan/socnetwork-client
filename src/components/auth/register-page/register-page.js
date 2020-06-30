import React, { useState, Fragment } from 'react'
import { useHttp } from '../../../hooks/http-hook'
import './register-page.scss'
import Spinner from '../../spinner/spinner'
import { useHistory } from 'react-router-dom'
import { serverURL } from '../../app/app'

const RegisterPage = () => {
    const [done, setDone] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
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
            if (!form.firstName.trim().length) {
                setErrorMsg('')
                return setErrorMsg('Please, enter your Firstname')
            }
            if (!form.lastName.trim().length) {
                return setErrorMsg('Please, enter your Lastname')
            }
            if (form.password.trim().length < 6) {
                return setErrorMsg('Minimum password length 6 characters')
            }
            if (form.rePassword !== form.password) {
                return setErrorMsg('Confirm Password')
            }
            const data = await request(`${serverURL}/api/auth/register`, 'POST', form, false)
            if (data) {
                setErrorMsg('')
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
                    <h2 className="authRegister__error" style={ error || errorMsg ? {display: 'block'} : {display: 'none'} }> {errorMsg || 'Error'} </h2>
                    <h1 className="authRegister__done" style={ done ? {display: 'block'} : {display: 'none'} } >User Registered Successfully!</h1>
                    <label htmlFor="firstName">Firstname</label>
                        <input onChange={changeHandler} className="authRegister__input" type="text" name="firstName"/>
                    <label htmlFor="lastName">Lastname</label>
                        <input onChange={changeHandler} className="authRegister__input" type="text" name="lastName"/>
                    <label htmlFor="email">Email</label>
                        <input onChange={changeHandler} className="authRegister__input" type="text" name="email"/>
                    <label htmlFor="password">Password</label>
                        <input onChange={changeHandler} className="authRegister__input" type="text" name="password"/>
                    <label htmlFor="rePassword">Confirm Password</label>
                        <input onChange={changeHandler} className="authRegister__input" type="text" name="rePassword"/>
                    <button onClick={submitHandler} className="authRegister__button">Sign Up</button>
                </div>
            }
        </Fragment>
        
    )
}

export default RegisterPage
