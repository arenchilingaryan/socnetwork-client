import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'

export default function OtherRoute() {
    const auth = useContext(AuthContext)
    const [isAuth, setIsAuth] = useState(false)
    function setAuth() {
        setIsAuth(true)
    }
    useEffect(() => {
        setAuth()
        console.log(auth)
    }, [auth])

    if (isAuth) {
        return (
            <Redirect to='/profile' />
        )
    }
    return (
        <Redirect to='/login' />
    )
}
