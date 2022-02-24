import { faUser, faUserClock, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import './account.scss'

const nav = [
    {
        name: "Account Infor",
        path: '/account/account-infor',
        icon: faUser
    },
    {
        name: "Order History",
        path: '/account/order-history',
        icon: faUserClock
    },
    {
        name: "Change Password",
        path: '/account/change-password',
        icon: faLock
    }
]

const Account = () => {

    return (
        <div className='Account'>
            <div className="container">
                <div className="side-bar">
                    {
                        nav.map((e, index) => (
                            <NavLink className="link" to={e.path} key={index}>
                                <FontAwesomeIcon icon={e.icon} />
                                {e.name}
                            </NavLink>
                        ))
                    }
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Account