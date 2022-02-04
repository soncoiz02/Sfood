import React from 'react'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from '../routes/Router'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import MobileNav from './MobileNav/MobileNav'
import ScrollToTop from './ScrollTop/ScrollTop'

const Layout = () => {
    const [activeMobileNav, setActiveMobileNav] = useState(false)
    return (
        <BrowserRouter>
            <Header handleAviveMobileNav={setActiveMobileNav} activeMobileNav={activeMobileNav} />
            <MobileNav activeMobileNav={activeMobileNav} setActiveMobileNav={setActiveMobileNav} />
            <div className='App'>
                <Router />
            </div>
            <ScrollToTop />
            <Footer />
        </BrowserRouter>
    )
}

export default Layout
