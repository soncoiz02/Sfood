import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig'
import { getDatabase, onValue, ref, remove } from 'firebase/database'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Bg from '../../assets/img/bg-cart.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './cart.scss'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const db = getDatabase(app)

const Cart = () => {
    const userInfor = useSelector(state => state.user.infor)
    const cart = useSelector(state => state.cart.list)

    useEffect(() => {
    }, [cart.length])


    const handleDeleteItem = async (index) => {
        await remove(ref(db, `cart/${userInfor.uid}/value/${index}`))
    }

    const handleDeleteAllItem = async () => {
        await remove(ref(db, `cart/${userInfor.uid}/value`))
    }

    return (
        <div className='Cart'>
            {
                cart.length > 0 ?
                    <div className="container">
                        <div className="Cart-list">
                            <h2>Your order</h2>
                            <div className="list">
                                {
                                    cart.map((e, index) => (
                                        <div className="item" key={index}>
                                            <div className="left">
                                                <div className="img">
                                                    <img src={e.img} alt="" />
                                                </div>
                                                <div className="detail">
                                                    <div className="name">{e.name}</div>
                                                    <div className="price">${e.price}</div>
                                                    <div className="size">"{e.size}"</div>
                                                    <div className='quantity'>
                                                        <button className="btn-minus" onClick={() => e.quantity -= 1}>-</button>
                                                        <div className="num">{e.quantity}</div>
                                                        <button className="btn-plus" onClick={() => e.quantity += 1}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div className="total">Total: ${e.quantity * e.price}</div>
                                                <div className="btn-delete" onClick={() => handleDeleteItem(index)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="list-btn">
                                <div className="btn-delete-all" onClick={handleDeleteAllItem}>Delete all</div>
                                <Link to={'/checkout'} className="btn-checkout">Check out</Link>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="Cart-empty">
                        <div className="img">
                            <img src={Bg} alt="" />
                        </div>
                        <div className="text">
                            <p>You have not ordered any food yet.</p>
                            <Link to="/menu/our-foods" className='btn-order'>Order now</Link>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Cart
