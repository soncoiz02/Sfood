import React from 'react'
import './icon.scss'
import Deliver from '../../../assets/img/deliver.png'
import Rider from '../../../assets/img/rider.png'
import Cute from '../../../assets/img/cute.png'

const HomeIcon = () => {
    return (
        <div className="Home__icon">
            <div className="container">
                <div className="item" style={{ animationDelay: '0.2s' }} >
                    <div className="img">
                        <img src={Rider} alt="" />
                    </div>
                    <div className="number">About 1,541</div>
                    <p className='dsc'>Dishes sold everyday</p>
                </div>
                <div className="item" style={{ animationDelay: '0.4s' }}>
                    <div className="img">
                        <img src={Deliver} alt="" />
                    </div>
                    <div className="number">Over 50</div>
                    <p className='dsc'>Deliver are alway ready to serve</p>
                </div>
                <div className="item" style={{ animationDelay: '0.6s' }}>
                    <div className="img">
                        <img src={Cute} alt="" />
                    </div>
                    <div className="number">About 146,356</div>
                    <p className='dsc'>Good reviews from customers</p>
                </div>
            </div>
        </div>
    )
}

export default HomeIcon
