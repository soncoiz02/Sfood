import React from 'react'
import Clock from '../../../assets/img/clock.png'
import Chef from '../../../assets/img/chef.png'
import Bg1 from '../../../assets/img/bg1.jpg'
import './about.scss'

const About = () => {
    return (
        <div className="Home__about">
            <div className="container">
                <div className="Home__about-content">
                    <h2>About Sfood</h2>
                    <p className="dsc">We are Best Food Maker and Best Delivery restaurant to our customers.</p>
                    <ul>
                        <li>
                            <div className="img">
                                <img src={Chef} alt="" />
                            </div>
                            <div className="content">
                                <p className="title">Best Chefs</p>
                                <p className="dsc">
                                    We have best chefs have many years of experience to cook.
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="img">
                                <img src={Clock} alt="" />
                            </div>
                            <div className="content">
                                <p className='title'>On Time</p>
                                <div className="dsc">
                                    We have best chefs have many years of experience to cook.
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="Home__about-img">
                    <img src={Bg1} alt="" />
                </div>
            </div>
        </div>
    )
}

export default About
