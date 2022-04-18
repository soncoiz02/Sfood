import { faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getDatabase } from "firebase/database"
import PropTypes from 'prop-types'
import React from 'react'
import LazyLoad from 'react-lazyload'
import { Link, useLocation } from 'react-router-dom'
import { app } from '../../firebaseConfig'
import './listproducts.scss'

const database = getDatabase(app);

const LoadComponent = () => {
    return (
        <div className="loading"><div></div><div></div></div>
    )
}

const ListProducts = props => {
    const { data } = props
    const { pathname } = useLocation()
    return (
        <div className='list-products'>
            {
                data.length > 0 &&
                data.map(item => (
                    <LazyLoad placeholder={<LoadComponent />} key={item.id}>
                        <div className="item">
                            <div className="img">
                                <img src={item.img} alt="" />
                            </div>
                            <Link to={`${pathname}/${item.id}`} className="name">{item.name}</Link>
                            <div className="dsc">{item.dsc}</div>
                            <div className="price">${item.price}</div>
                            <div className="bottom">
                                <div className="country">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    <p>{item.country}</p>
                                </div>
                                <div className="rate">
                                    <p>{item.rate}</p>
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                            </div>
                        </div>
                    </LazyLoad>
                ))
            }
        </div >
    )
}

ListProducts.propTypes = {
    data: PropTypes.array,
    loadData: PropTypes.func,
}

export default ListProducts
