import React from 'react'
import { Outlet } from 'react-router-dom'

const Menu = () => {
    return (
        <div className='Menu'>
            <Outlet />
        </div>
    )
}

export default Menu
