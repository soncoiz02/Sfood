import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faShoppingBasket, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import './header.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setUserInfor, setIsSigned } from '../../redux/action/user'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database'
import { app } from '../../firebase'
import { addItem } from '../../redux/action/cart'
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

    useState(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userInfor = user.providerData[0]
                dispatch(setUserInfor(userInfor))
                dispatch(setIsSigned(true))
            }
        })

    }, [])

    useEffect(() => {
        if (isSigned === true) {
            onValue(ref(db, `cart/${userInfor.uid}/value/`), (snapshot) => {
                const data = snapshot.val()
                if (data !== null) {
                    setCartLength(data.length)
                    dispatch(addItem(data))
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
                    <NavLink to='/menu/our-foods' className={`${location.pathname.includes('/menu') ? 'active' : ''}`}>Online Menu</NavLink>
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
                                <div className="name">{userInfor.displayName}</div>
                                <div className={`more-detail ${activeUserNav === true ? 'active' : ''}`}>
                                    <div className="link">Your account</div>
                                    <div className="link">Your order</div>
                                    <div className="link" onClick={handleLogout}>Logout</div>
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
