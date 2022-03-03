import React from 'react'
import { Link } from 'react-router-dom'
import Bg from '../../assets/img/404.jpg'
import './notfound.scss'

const NotFound = () => {
    return (
        <div className='not-found'>
            <div className="img">
                <img src={Bg} alt="" />
            </div>

            <Link to='/'>Back to Home</Link>
        </div>
    )
}

export default NotFound