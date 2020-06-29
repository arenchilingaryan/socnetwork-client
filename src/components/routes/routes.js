import React from 'react'
import AuthRoutes from './routes-auth'
import UnAuthRoutes from './routes-unAuth'
import './routes.scss'



export const useRoutes = (isAuthenticated) => {


    if (isAuthenticated) {
        return (
            <div>
                <AuthRoutes />
            </div>
        )
    }
    return (
        <div>
            <UnAuthRoutes />
        </div>
    )
}