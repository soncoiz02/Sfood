import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faShoppingCart, faWallet } from '@fortawesome/free-solid-svg-icons'
import './checkout.scss'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ChooseAddress from '../../components/ChooseAddress/ChooseAddress'
import { useRef } from 'react'
import { arrayUnion, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { getDatabase, onValue, ref, remove } from 'firebase/database'
import { addCartData } from '../../redux/action/cart'
import { setUserInfor } from '../../redux/action/user'
import { getCartData } from '../../utils/firebase'

const db = getFirestore(app)
const cartDb = getDatabase(app)

const Checkout = () => {
    const navigate = useNavigate()

    const [listTotalDish, setListTotalDish] = useState([])

    const lineRef = useRef()
    const iconRef = useRef()

    const cart = useSelector(state => state.cart.list)
    const userInfor = useSelector(state => state.user.infor)
    const dispatch = useDispatch()

    const [listAddress, setListAddress] = useState([])
    const [mainAddress, setMainAddress] = useState('')
    const [hasCheckout, setHasChecout] = useState(false)

    const userRef = doc(db, 'users', userInfor.uid)

    useEffect(() => {
        cart.length > 0 ? setListTotalDish(cart.map(e => e.quantity * e.price)) : navigate('/menu/our-foods')
        getRecieveAddress()
    }, [])

    const getRecieveAddress = async () => {
        const docSnap = await getDoc(userRef)
        const docData = docSnap.data()
        setListAddress(docData.recieveAddress)
    }

    const format = (value) => {
        const formatVal = value < 10 ? "0" + value : value
        return formatVal
    }

    const handleCheckout = async () => {
        const date = new Date()
        const bill = {
            recieveAddress: mainAddress,
            cart: cart,
            total: listTotalDish.reduce((a, b) => a + b),
            date: `${format(date.getDate())}/${format(date.getMonth() + 1)}/${date.getFullYear()} - ${format(date.getHours())}:${format(date.getMinutes())}:${format(date.getSeconds())}`
        }

        await updateDoc(userRef, {
            orderHistory: arrayUnion(bill)
        })

        await remove(ref(cartDb, `cart/${userInfor.uid}/value`))
        dispatch(addCartData([]))

        userInfor.orderHistory.push(bill)
        dispatch(setUserInfor(userInfor))

        lineRef.current.classList.add('checked')
        iconRef.current.classList.add('checked')
        setHasChecout(true)
    }

    return (
        <div className='Checkout'>
            <div className="container">
                <div className="box">
                    <div className="progress-line">
                        <div className="top">
                            <div className="icon checked">
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </div>
                            <div className="line checked"></div>
                            <div className="icon checked">
                                <FontAwesomeIcon icon={faWallet} />
                            </div>
                            <div className="line" ref={lineRef}></div>
                            <div className="icon" ref={iconRef}>
                                <FontAwesomeIcon icon={faCheck} />
                            </div>

                        </div>
                        <div className="bottom">
                            <p>Order</p>
                            <p>Checkout</p>
                            <p>Done</p>
                        </div>
                    </div>
                    {
                        hasCheckout === false ?
                            <>
                                <div className="your-address">
                                    <p className='title'>Choose your receive address</p>
                                    <ChooseAddress
                                        mainAddress={mainAddress}
                                        setMainAddress={setMainAddress}
                                        listAddress={listAddress}
                                        getListAddress={getRecieveAddress}
                                    />
                                </div>

                                <div className="your-order">
                                    <p className="title">Your order</p>
                                    <div className="list-dish">
                                        {
                                            cart &&
                                            cart.map((dish, index) =>
                                                <div className="item" key={index}>
                                                    <div className="img">
                                                        <img src={dish.img} alt="" />
                                                    </div>
                                                    <div className="quantity">{dish.quantity}</div>
                                                    <div className="detail">
                                                        <div className="name">{dish.name}</div>
                                                        <div className="size">"{dish.size}"</div>
                                                        <div className="price">${dish.price}</div>
                                                    </div>
                                                    <div className="total-dish-price">${dish.quantity * dish.price}</div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="total-price">
                                        Total: <span>${listTotalDish.length > 0 && listTotalDish.reduce((a, b) => a + b)}</span>
                                    </div>
                                </div>
                                <div className="btn-checkout" onClick={handleCheckout}>
                                    Checkout
                                </div>
                            </>
                            :
                            <div className="checkout-success">
                                <div className="circle">
                                    <p>&#x02713;</p>
                                </div>
                                <p>Succesfully!</p>
                                <Link to='/' >Back to home page</Link>
                            </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Checkout