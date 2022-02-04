import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Slider from "react-slick";

import Evans from '../../../assets/img/customer/evans.jpg'
import Gordon from '../../../assets/img/customer/gordon.jpg'
import Hemsworth from '../../../assets/img/customer/hemsworth.jpg'
import Tom from '../../../assets/img/customer/tom.jpg'
import Tony from '../../../assets/img/customer/tony.jpg'

import './customer.scss'

const customers = [
    {
        name: 'Gordon Ramsay',
        avt: Gordon,
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus numquam, dicta quas enim dignissimos, distinctio officia quibusdam quae porro nulla repudiandae iste omnis. Suscipit, atque. Quam, sequi? Perferendis, ut vel!',
        nickname: '1St Chef in the World',
        rate: 4.5
    },
    {
        name: 'Robert Downey',
        avt: Tony,
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus numquam, dicta quas enim dignissimos, distinctio officia quibusdam quae porro nulla repudiandae iste omnis. Suscipit, atque. Quam, sequi? Perferendis, ut vel!',
        nickname: 'Ironman',
        rate: 4.8
    },
    {
        name: 'Tom Holland',
        avt: Tom,
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus numquam, dicta quas enim dignissimos, distinctio officia quibusdam quae porro nulla repudiandae iste omnis. Suscipit, atque. Quam, sequi? Perferendis, ut vel!',
        nickname: 'Spiderman',
        rate: 5.0
    },
    {
        name: 'Chris Evans',
        avt: Evans,
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus numquam, dicta quas enim dignissimos, distinctio officia quibusdam quae porro nulla repudiandae iste omnis. Suscipit, atque. Quam, sequi? Perferendis, ut vel!',
        nickname: 'Captain America',
        rate: 5.0
    },
    {
        name: 'Chris Hemsworth',
        avt: Hemsworth,
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus numquam, dicta quas enim dignissimos, distinctio officia quibusdam quae porro nulla repudiandae iste omnis. Suscipit, atque. Quam, sequi? Perferendis, ut vel!',
        nickname: 'Odin son - Thor',
        rate: 4.7
    }
]

const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                centerPadding: '0px'
            }
        }
    ]
}
const Customer = () => {

    return (
        <div className="Home__customer">
            <div className="container">
                <h2>What Customers Say About us</h2>
                <Slider {...settings}>
                    {
                        customers &&
                        customers.map((item, index) => (
                            <div className="card" key={index}>
                                <div className="img">
                                    <img src={item.avt} alt="" />
                                </div>
                                <div className="rate">
                                    <p>{item.rate.toFixed(1)}</p>
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                                <div className="content">{item.content}</div>
                                <div className="sign">
                                    <div className="name">{item.name}</div>
                                    <div className="nickname">{item.nickname}</div>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}

export default Customer
