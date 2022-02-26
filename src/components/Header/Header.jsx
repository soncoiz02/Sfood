import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faShoppingBasket, faSignInAlt, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './header.scss'

import { useSelector, useDispatch } from 'react-redux'
import { setUserInfor, setIsSigned } from '../../redux/action/user'
import { addCartData, addItem } from '../../redux/action/cart'

import { getAuth, signOut } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database'
import { app } from '../../firebaseConfig'

const auth = getAuth()
const db = getDatabase(app)

const Header = ({ handleAviveMobileNav, activeMobileNav }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const isSigned = useSelector(state => state.user.isSigned)
    const userInfor = useSelector(state => state.user.infor)
    const dispatch = useDispatch()

    const [activeUserNav, setActiveUserNav] = useState(false)
    const [activeHeader, setActiveHeader] = useState(false)

    const [cartLength, setCartLength] = useState(0)


    window.addEventListener('scroll', () => {
        if (location.pathname === '/') {
            if (window.pageYOffset > 50) {
                setActiveHeader(true)
            }
            else {
                setActiveHeader(false)
            }
        }
    })

    window.addEventListener('unload', () => {
        signOut(auth)
        dispatch(setIsSigned(false))
        dispatch(setUserInfor({}))
    })

    useEffect(() => {
        if (isSigned === true) {
            onValue(ref(db, `cart/${userInfor.uid}/value/`), (snapshot) => {
                const data = snapshot.val()
                if (data !== null) {
                    setCartLength(data.length)
                    dispatch(addCartData(data))
                }
            })
        }
        else {
            setCartLength(0)
        }
    }, [cartLength, isSigned])


    const handleLogout = async () => {
        dispatch(setIsSigned(false))
        dispatch(setUserInfor({}))
        signOut(auth)
            .then(() => {
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <header className={`Header${location.pathname !== '/' ? ' active' : ''} ${activeHeader === true ? ' active' : ''}`} style={location.pathname === '/login' ? { display: "none" } : { display: 'flex' }}>
            <div className="container">
                <Link to='/' className="Header-logo">
                    <div className="img">
                        <img src={logo} alt="" />
                    </div>
                    <div className="text"><span>s</span>Food</div>
                </Link>
                <div className="Header-nav">
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to='/menu/our-foods' className={`${location.pathname.includes('/menu') ? 'active' : ''}`}>Menu</NavLink>
                    <NavLink to='/about'>About us</NavLink>
                    <NavLink to='/contact'>Contact</NavLink>
                </div>
                <div className="Header-items">
                    <Link to={'/cart'} className="btn-cart">
                        <FontAwesomeIcon icon={faShoppingBasket} />
                        {
                            cartLength > 0 &&
                            <div className="num">{cartLength}</div>
                        }
                    </Link>
                    {
                        isSigned === true ?
                            <div className="user-infor" onClick={() => setActiveUserNav(!activeUserNav)}>
                                <div className="avt">
                                    <img src={userInfor.photoURL} alt="" />
                                </div>
                                <div className="name">{userInfor.username ? userInfor.username : userInfor.displayName}</div>
                                <div className={`more-detail ${activeUserNav === true ? 'active' : ''}`}>
                                    <Link to={'/account/account-infor'} className="link">
                                        <FontAwesomeIcon icon={faUser} />
                                        Your Account
                                    </Link>
                                    <div className="link" onClick={handleLogout}>
                                        <FontAwesomeIcon icon={faSignOutAlt} />
                                        Logout
                                    </div>
                                </div>
                            </div>
                            :
                            <Link to={'/login'} className="btn-login">
                                Login
                                <FontAwesomeIcon icon={faSignInAlt} />
                            </Link>
                    }
                    <div className="btn-bar" onClick={() => handleAviveMobileNav(!activeMobileNav)}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
            </div >
        </header >
    )
}

export default Header
