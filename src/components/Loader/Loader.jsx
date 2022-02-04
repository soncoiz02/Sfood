import React from 'react'
import gif from '../../assets/img/burger-gif.gif'
import './loader.scss'
const Loader = () => {
    return (
        <div className='loader'>
            <img src={gif} alt="" />
            <div className="dots">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader
