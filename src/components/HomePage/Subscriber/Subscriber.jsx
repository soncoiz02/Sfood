import React, { useState } from 'react'
import './subscriber.scss'

const Subscriber = () => {
    const [activeForm, setActiveForm] = useState(false)

    return (
        <div className="Home__subscribe">
            <div className="container">
                <div className="card">
                    <h2>Subscribe To Get Some Good Vouchers from Us</h2>
                    <div className="dsc">We recommended you to subscribe to get some newest voucher, drop email your email below and we will send it to you</div>
                    <div className={`form ${activeForm ? 'active' : ''}`}>
                        <input type="text" placeholder='Enter your email address' onFocus={() => setActiveForm(true)} onBlur={() => setActiveForm(false)} />
                        <input type="submit" value='Subscribe' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscriber
