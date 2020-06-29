import { useState, useCallback, useContext } from 'react'
import { AuthContext } from '../context/auth-context'
import axios from 'axios'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const auth = useContext(AuthContext)

    

    const request = useCallback(async (url, method = 'GET', body = null, isAuth = false ) => {

        let headers = {}

        if (body && isAuth) {
            headers = { 'Authorization': `Bearer ${auth.token}`, 'Content-Type': 'application/json' }
        }
        if (body && !isAuth) {
            headers = { 'Content-Type': 'application/json' }
        }

        setLoading(true)
        try {
            const response = await axios({
                method,
                url,
                data: body,
                headers
            })

            setLoading(false)

            return response.data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [auth.token])

    const clearError = () => setError(null)

    return { loading, request, error, clearError }
}
