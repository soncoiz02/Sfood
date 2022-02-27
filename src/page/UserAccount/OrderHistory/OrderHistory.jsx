import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './history.scss'

const OrderHistory = () => {
    const userInfor = useSelector(state => state.user.infor)
    const orderHistory = userInfor.orderHistory
    return (
        <div className='order-history'>
            {
                orderHistory.length > 0 ?
                    <div className='list-order'>
                        {
                            orderHistory.map((e, i) =>
                                <div className='order' key={i}>
                                    <div className="date">
                                        {e.date}
                                    </div>
                                    <div className="status">Done</div>
                                    <div className="reciever">Reciever: {e.recieveAddress}</div>
                                    <div className="list-item">
                                        {e.cart.map((item, index) =>
                                            <div className="item" key={index}>
                                                <div className="img">
                                                    <img src={item.img} alt="" />
                                                </div>
                                                <p className="quantity">{item.quantity}</p>
                                                <div className="detail">
                                                    <Link className='name' to={`/detail/${item.id}`} >{item.name}</Link>
                                                    <p className="size">Size: "{item.size}"</p>
                                                    <p className="price">${item.price}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="total">Total: ${e.total}</div>
                                </div>
                            )
                        }
                    </div>
                    :
                    <div>a</div>
            }
        </div>
    )
}

export default OrderHistory