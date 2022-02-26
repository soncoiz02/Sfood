import { faSignInAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAuth, signOut } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { app } from '../../firebaseConfig'
import { setIsSigned, setUserInfor } from '../../redux/action/user'
import './mobilenav.scss'

const auth = getAuth(app)

const MobileNav = ({ activeMobileNav, setActiveMobileNav }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isSigned = useSelector(state => state.user.isSigned)
    const userInfor = useSelector(state => state.user.infor)

    const handleLogout = () => {
        dispatch(setIsSigned(false))
        dispatch(setUserInfor({}))
        signOut(auth)
            .then(() => {
                setActiveMobileNav(false)
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
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
                    <Link to="/login" className="btn-login" onClick={() => setActiveMobileNav(false)}>
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
                    <Link to={'/account'} className="link">
                        <FontAwesomeIcon icon={faUser} />
                        Your Account
                    </Link>
                    <div className="link" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        Logout
                    </div>
                </div>
            }
        </div>
    )
}

export default MobileNav
