import { faCheckCircle, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import foodApi from '../../api/foodApi'
import Comment from '../../components/Comment/Comment'
import { addCartData, addItem } from '../../redux/action/cart'
import './detail.scss'
import Loader from '../../components/Loader/Loader'

import { getDatabase, ref, onValue, set } from "firebase/database";
import { app } from '../../firebaseConfig'

const db = getDatabase(app)


const Detail = () => {
    const param = useParams().id

    const [detail, setDetail] = useState({})
    const [sizeValue, setSizeValue] = useState('Small')
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState()
    const [activeNav, setActiveNav] = useState({
        cmt: true,
        rate: false
    })

    const isSigned = useSelector(state => state.user.isSigned)
    const userInfor = useSelector(state => state.user.infor)
    const dispatch = useDispatch()

    const [mess, setMess] = useState('')
    const navigate = useNavigate()

    const [dbData, setDbData] = useState([])

    const [loader, setLoader] = useState(true)

    useEffect(() => {
        onValue(ref(db, `cart/${userInfor.uid}/value`), (snapshot) => {
            const data = snapshot.val()
            if (data !== null) {
                setDbData(data)
            }
            else {
                setDbData([])
            }
        })
        const getDetailData = getDetail()
        setTimeout(() => {
            setLoader(false)
        }, 2000)

        return getDetailData
    }, [])


    const getDetail = async () => {
        const data = await foodApi.getDetail(param)
        setDetail(data)
        setPrice(data.price)
        window.scrollTo(0, 0)
    }

    const handleOrder = () => {
        if (isSigned === true) {
            const detailOrder = {
                id: detail.id,
                name: detail.name,
                img: detail.img,
                price: price,
                size: sizeValue,
                quantity: quantity
            }

            let newCart = dbData
            if (newCart.length > 0) {
                let check = false
                let index = 0
                newCart.forEach((e, i) => {
                    if (e.id === detailOrder.id && e.size === detailOrder.size) {
                        check = true
                        index = i
                    }
                })

                if (check === true) {
                    newCart[index].quantity = newCart[index].quantity + detailOrder.quantity
                    newCart[index].price = newCart[index].price + detailOrder.price
                }
                else {
                    newCart.push(detailOrder)
                }
            }
            else {
                newCart.push(detailOrder)
            }
            dispatch(addCartData(newCart))
            if (dbData.length > 0) {
                let check = false
                dbData.forEach(e => {
                    if (e.uid === userInfor.uid) {
                        check = true
                    }
                })
                if (check === true) {
                    set(ref(db, 'cart/' + userInfor.uid + '/value'), newCart)
                }
                else {
                    set(ref(db, 'cart/' + userInfor.uid), {
                        uid: userInfor.uid,
                        value: newCart
                    })
                }
            }

            setMess(`Add item to cart successfully`)
            setTimeout(() => {
                setMess('')
            }, 2500)
        }
        else {
            navigate('/login')
        }

    }


    return (
        <div className='Detail'>
            {
                loader === true &&
                <Loader />
            }
            <div className="container">
                <div className="Detail__content">
                    {
                        mess &&
                        <div className="mess">
                            {mess}
                        </div>
                    }
                    <div className="img">
                        <img src={detail.img} alt="" />
                    </div>
                    <div className="detail">
                        <p className="name">{detail.name}</p>
                        <p className="dsc">{detail.dsc}</p>
                        <p className="rate">
                            {detail.rate}
                            <FontAwesomeIcon icon={faStar} />
                        </p>
                        <p className="price">${price}</p>
                        <div className="country">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            <p>{detail.country}</p>
                        </div>
                        <div className="size">
                            <p>Choose size</p>
                            <div className="list-size">
                                <input type="radio" id='s' name='size' value="Small" checked={sizeValue === 'Small'} onChange={e => setSizeValue(e.currentTarget.value)} />
                                <label htmlFor="s" onClick={() => setPrice(detail.price)}>Small</label>
                                <input type="radio" id='m' name='size' value="Medium" checked={sizeValue === 'Medium'} onChange={e => setSizeValue(e.currentTarget.value)} />
                                <label htmlFor="m" onClick={() => setPrice(detail.price + detail.price * 0.05)}>Medium</label>
                                <input type="radio" id='l' name='size' value="Large" checked={sizeValue === 'Large'} onChange={e => setSizeValue(e.currentTarget.value)} />
                                <label htmlFor="l" onClick={() => setPrice(detail.price + detail.price * 0.1)}>Large</label>
                            </div>
                        </div>
                        <div className="quantity">
                            <div className="btn-minus" onClick={() => {
                                if (quantity < 2) return
                                setQuantity(quantity - 1)
                            }}>-</div>
                            <div className="num">{quantity}</div>
                            <div className="btn-plus" onClick={() => setQuantity(quantity + 1)}>+</div>
                        </div>
                        <div className="orther">
                            <p><FontAwesomeIcon icon={faCheckCircle} />Freeship within a radius 5Km</p>
                            <p><FontAwesomeIcon icon={faCheckCircle} />Food will be delivered in about 30 minutes to 1 hour</p>
                        </div>
                        <div className="btn-order" onClick={handleOrder}>Order</div>
                    </div>
                </div>
                <div className="nav">
                    <div className={`btn-cmt ${activeNav.cmt === true ? 'active' : ''}`} onClick={() => setActiveNav({ cmt: true, rate: false })}>Review</div>
                    <div className={`btn-rate ${activeNav.rate === true ? 'active' : ''}`} onClick={() => setActiveNav({ cmt: false, rate: true })}>Rating</div>
                </div>
                <Comment productId={detail.id} />
            </div>
        </div>
    )
}

export default Detail
