import React from 'react'
import { Outlet } from 'react-router-dom'
import './account.scss'

const Account = () => {

    return (
        <div className='Account'>
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}

export default Account