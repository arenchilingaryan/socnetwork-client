import { createContext } from 'react'

function noop () {}

export const AuthContext = createContext({
    token: '',
    userId: '',
    email: '',
    userName: '',
    login: noop,
    logout: noop,
    isAuthenticated: false
})