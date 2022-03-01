import { connectAuthEmulator, getAuth } from 'firebase/auth'
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { app } from '../firebaseConfig'

const RequireAuth = () => {
    let auth = getAuth(app)
    connectAuthEmulator(auth, "https://sfood.vercel.app/")
    const location = useLocation()
    if (!auth.currentUser) {
        return <Navigate to={'/login'} state={{ from: location }} />
    }

    return <Outlet />
}

export default RequireAuth