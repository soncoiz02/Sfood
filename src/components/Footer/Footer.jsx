import { faClock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Logo from '../../assets/img/logo.png'
import './footer.scss'
import { useLocation } from 'react-router-dom'
const Footer = () => {
    const location = useLocation()
    return (
        <footer className='Footer' style={location.pathname === '/login' ? { display: 'none' } : { display: 'flex' }}>
            <div className="Footer-top">
                <div className="container">
                    <div className="col col-1">
                        <div className="logo">
                            <div className="img">
                                <img src={Logo} alt="" />
                            </div>
                            <div className="text"><span>s</span>Food</div>
                        </div>
                        <div className="label">
                            <FontAwesomeIcon icon={faClock} />
                            <p>Open from Monday to Sunday every Week</p>
                        </div>
                        <div className="label">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <p>info-sfood@gmail.com</p>
                        </div>
                    </div>
                    <div className="col col-2">
                        <h2>About</h2>
                        <ul>
                            <li>
                                <p>About Us</p>
                            </li>
                            <li>
                                <p>Why choose us</p>
                            </li>
                            <li>
                                <p>Contact us</p>
                            </li>
                            <li>
                                <p>Blog</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col col-3">
                        <h2>Feature</h2>
                        <ul>
                            <li>
                                <p>Menu</p>
                            </li>
                            <li>
                                <p>Promo</p>
                            </li>
                            <li>
                                <p>Contact</p>
                            </li>
                            <li>
                                <p>About Us</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col col-4">
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faFacebookSquare} />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faInstagramSquare} />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faTwitterSquare} />
                            </li>
                        </ul>
                        <p>Follow our social media</p>
                    </div>
                </div>
            </div>
            <div className="Footer-bottom">
                ©Copyright by SonTran 2021, All Right Reserved
            </div>
        </footer>
    )
}

export default Footer
