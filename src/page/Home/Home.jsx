import React, { useEffect, useState } from 'react'
import Combo from '../../assets/img/combo.png'
import './home.scss'
import 'swiper/css'
import foodApi from '../../api/foodApi'
import { LazyLoad } from 'react-observer-api';
import HomeIcon from '../../components/HomePage/HomeIcon/HomeIcon'
import HomeMenu from '../../components/HomePage/HomeMenu/HomeMenu'
import Hotest from '../../components/HomePage/Hotest/Hotest'
import About from '../../components/HomePage/About/About'
import Why from '../../components/HomePage/Why/Why'
import Subscriber from '../../components/HomePage/Subscriber/Subscriber'
import Customer from '../../components/HomePage/Customer/Customer'



const Home = () => {
    const [foodData, setFoodData] = useState([])
    const [activeBtn, setActiveBtn] = useState(false)

    useEffect(() => {
        const getData = getFoodData()

        return getData
    }, [])

    window.onscroll = () => {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            setActiveBtn(true)
        }
        else {
            setActiveBtn(false)
        }
    }

    const getFoodData = async () => {
        const res = await foodApi.getByCate('burgers')
        const result = await res.filter(e => e.rate === 5).slice(0, 10)
        setFoodData(result)
    }



    return (
        <div className='Home'>
            <div className="Home__hero">
                <div className="container">
                    <div className="Home__hero-content">
                        <h1>You are hungry now?<br /> Here is your <span>Best choice.</span></h1>
                        <div className="dsc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                        <div className="btn-explore">Explore Menu</div>
                    </div>
                    <div className="Home__hero-img">
                        <img src={Combo} alt="" />
                    </div>
                </div>
            </div>
            <LazyLoad>
                <HomeIcon />
            </LazyLoad >
            <LazyLoad>
                <HomeMenu />
            </LazyLoad>
            <LazyLoad>
                {
                    foodData &&
                    <Hotest foodData={foodData} />
                }
            </LazyLoad>
            <LazyLoad>
                <About />
            </LazyLoad>
            <LazyLoad>
                <Why />
            </LazyLoad>
            <LazyLoad>
                <Subscriber />
            </LazyLoad>
            <LazyLoad>
                <Customer />
            </LazyLoad>
        </div >
    )
}

export default Home
