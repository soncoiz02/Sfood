import { faBars, faShoppingBasket, faSignInAlt, faSignOutAlt, faUser, faUserClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAuth, signOut } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { app } from '../../firebaseConfig'
import { addCartData } from '../../redux/action/cart'
import { setIsSigned } from '../../redux/action/user'
import './header.scss'



const auth = getAuth()
const db = getDatabase(app)

const Header = ({ handleAviveMobileNav, activeMobileNav }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const isSigned = useSelector(state => state.user.isSigned)
    const userInfor = useSelector(state => state.user.infor)
    const cart = useSelector(state => state.cart.list)
    const dispatch = useDispatch()

    const [activeUserNav, setActiveUserNav] = useState(false)
    const [activeHeader, setActiveHeader] = useState(false)


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
    })

    useEffect(() => {
        if (isSigned === true) {
            onValue(ref(db, `cart/${userInfor.uid}/value/`), (snapshot) => {
                const data = snapshot.val()
                if (data !== null) {
                    dispatch(addCartData(data))
                }
            })
        }
    }, [cart.length, isSigned])


    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch(setIsSigned(false))
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
                            cart.length > 0 &&
                            <div className="num">{cart.length}</div>
                        }
                    </Link>
                    {
                        isSigned === true ?
                            <div className="user-infor" onClick={() => setActiveUserNav(!activeUserNav)}>
                                <div className="avt">
                                    <img src={userInfor.photoURL} alt="" />
                                </div>
                                <div className="name">{userInfor.displayName}</div>
                                <div className={`more-detail ${activeUserNav === true ? 'active' : ''}`}>
                                    <Link to={'/account/account-infor'} className="link">
                                        <FontAwesomeIcon icon={faUser} />
                                        Account
                                    </Link>
                                    <Link to={'/account/order-history'} className="link">
                                        <FontAwesomeIcon icon={faUserClock} />
                                        Order History
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
