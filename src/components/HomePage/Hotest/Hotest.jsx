import React from 'react'
import { faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import './hotest.scss'

const Hotest = ({ foodData }) => {
    return (
        <div className="Home__hostest">
            <div className="container">
                <h2>Our Hotest Dish</h2>
                <Swiper
                    spaceBetween={30}
                    navigation={true}
                    breakpoints={{
                        320: {
                            spaceBetween: 0,
                            slidesPerView: 2
                        },
                        767: {
                            spaceBetween: 30,
                            slidesPerView: 4
                        }
                    }
                    }
                >
                    {
                        foodData &&
                        foodData.map(item => (
                            <SwiperSlide key={item.id}>
                                <div className="img">
                                    <img src={item.img} alt="" />
                                </div>
                                <Link to={`/detail?id=${item.id}`} className='name'>{item.name}</Link>
                                <p className="dsc">{item.dsc}</p>
                                <div className="price">${item.price}</div>
                                <div className="bottom">
                                    <div className="country">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        {item.country}
                                    </div>
                                    <div className="rate">
                                        {item.rate}
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <Link to='/products' className='btn-view'>View More</Link>
            </div>
        </div>
    )
}

export default Hotest
