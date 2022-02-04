import React, { useEffect, useState } from 'react'
import { app } from '../../firebase'
import { getDatabase, onValue, ref, remove } from 'firebase/database'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Bg from '../../assets/img/bg-cart.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './cart.scss'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/action/cart'

const db = getDatabase(app)

const Cart = () => {
    const [listTotalPrice, setListTotalPrice] = useState([])

    const isSigned = useSelector(state => state.user.isSigned)
    const userInfor = useSelector(state => state.user.infor)
    const cart = useSelector(state => state.cart.list)
    const dispatch = useDispatch()

    useEffect(() => {
        setListTotalPrice(cart.map(e => e.price * e.quantity))
    }, [cart.length])

    const handleRemoveItem = async (index) => {
        await remove(ref(db, `cart/${userInfor.uid}/value/${index}`))
        onValue(ref(db, `cart/${userInfor.uid}/value`), (snapshot) => {
            const data = snapshot.val()
            if (data !== null) {
                dispatch(addItem(data))
            }
            else {
                dispatch(addItem([]))
            }
        })
    }

    const deleteAllItem = () => {
        remove(ref(db, `cart/${userInfor.uid}/value`))
    }

    return (
        <div className='Cart'>
            {
                cart.length > 0 ?
                    <div className="container">
                        <div className="Cart-list">
                            <div className="nav">
                                <div className="btn-delete-all" onClick={deleteAllItem}>Delete all</div>
                            </div>
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
                                                    <div className="quantity">Quantity: {e.quantity}</div>
                                                    <div className="size">Size: {e.size}</div>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div className="total">Total: ${e.quantity * e.price}</div>
                                                <div className="btn-delete" onClick={() => handleRemoveItem(index)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="Cart-total">
                            <div className="detail">
                                <div className="total">Total: <span>${listTotalPrice.length > 0 && listTotalPrice.reduce((a, b) => Math.round(a + b))}</span></div>
                                <p className="shipping">Shipping: <span>Freeship</span></p>
                                <p className="voucher">Voucher: <span>No voucher used</span></p>
                            </div>
                            <div className="btn-checkout">Check out</div>
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
