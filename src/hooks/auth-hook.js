import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [email, setEmail] = useState(null)


    const login = useCallback((jwtToken, id, userEmail) => {
        // Set data of login-button for drop to state and localstore
        setToken(jwtToken)
        setUserId(id)
        setEmail(userEmail)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, 
            token: jwtToken, 
            email: userEmail
        }))
    }, [])
    const logout = useCallback(() => {
        // Remove state and localstorage
        setToken(null)
        setUserId(null)
        setEmail(null)
        localStorage.removeItem(storageName)
        window.location.reload()
    }, [])

    useEffect(() => {
        // Add data of localstore to auth-context
        const data = JSON.parse(localStorage.getItem(storageName))
        window.data = data
        if (data && data.token) {
            login(data.token, data.userId, data.email)
        }
    }, [login])

    return { login, logout, token, userId, email }}