import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './mobilenav.scss'

const MobileNav = ({ activeMobileNav, setActiveMobileNav }) => {
    const location = useLocation()
    const isSigned = useSelector(state => state.user.isSigned)
    const userInfor = useSelector(state => state.user.infor)

    const handleLogout = () => {

    }
    return (
        <div className={`Mobile-nav ${activeMobileNav === true ? 'active' : ''}`}>
            {
                isSigned === true ?
                    <div className="user-infor">
                        <div className="avt">
                            <img src={userInfor.photoURL} alt="" />
                        </div>
                        <div className="name">{userInfor.displayName}</div>
                    </div> :
                    <Link to="/login" className="btn-login">
                        <FontAwesomeIcon icon={faSignInAlt} />
                        Login
                    </Link>
            }
            <div className="nav">
                <NavLink to={'/'} onClick={() => setActiveMobileNav(false)}>Home</NavLink>
                <NavLink to='/menu/our-foods' className={`${location.pathname.includes('/menu') ? 'active' : ''}`} onClick={() => setActiveMobileNav(false)}>Online Menu</NavLink>
                <NavLink to='/about' onClick={() => setActiveMobileNav(false)}>About us</NavLink>
                <NavLink to='/contact' onClick={() => setActiveMobileNav(false)}>Contact</NavLink>
            </div>
            {
                isSigned === true &&
                <div className="user-option">
                    <div className="link">Your account</div>
                    <div className="link">Your order</div>
                    <div className="link" onClick={handleLogout}>Logout</div>
                </div>
            }
        </div>
    )
}

export default MobileNav
