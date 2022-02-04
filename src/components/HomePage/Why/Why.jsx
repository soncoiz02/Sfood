import React from 'react'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Bg2 from '../../../assets/img/bg2.jpg'
import './why.scss'

const Why = () => {
    return (
        <div className="Home__why">
            <div className="container">
                <div className="Home__why-img">
                    <img src={Bg2} alt="" />
                </div>
                <div className="Home__why-content">
                    <h2>Why we are the Best</h2>
                    <p className="dsc">We always maintain the quality of our food to serve our customers and ensure their satisfaction.</p>
                    <div className="reason">
                        <div className="item">
                            <div className="icon">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <div className="content">
                                <p className="title">Fresh food</p>
                                <div className="dsc">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="icon">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <div className="content">
                                <p className="title">Fast delivery</p>
                                <div className="dsc">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="icon">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <div className="content">
                                <p className="title">Maintain quality</p>
                                <div className="dsc">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Why
