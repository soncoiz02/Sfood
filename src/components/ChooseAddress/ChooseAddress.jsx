import { faCog, faMapMarkerAlt, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import './choose.scss'

import { doc, updateDoc, arrayUnion, getFirestore, getDoc } from 'firebase/firestore'
import { app } from '../../firebase'
import { useSelector } from 'react-redux'

const db = getFirestore(app)

const ChooseAddress = () => {
    const userInfor = useSelector(state => state.user.infor)

    const [listAddress, setListAddress] = useState([])
    const [popupChangeActive, setPopupChangeActive] = useState(false)
    const [popupAddActive, setPopupAddActive] = useState(false)

    const [mainAddress, setMainAddress] = useState('')

    const [address, setAddress] = useState('')
    const [reciever, setReciever] = useState('')
    const [phoneNum, setPhoneNum] = useState('')

    const userRef = doc(db, 'users', userInfor.uid)

    useEffect(() => {
        getRecieveAddress()
    }, [listAddress.length])

    const getRecieveAddress = async () => {
        const docSnap = await getDoc(userRef)
        const docData = docSnap.data()
        setListAddress(docData.recieveAddress)
        const mainAddress = listAddress[0]
        if (mainAddress)
            setMainAddress(`Reciever: ${mainAddress.reciever} - ${mainAddress.phoneNum}, ${mainAddress.address}`)
    }

    const getDocument = async (data) => {
        await updateDoc(userRef, {
            recieveAddress: arrayUnion(data)
        })
        setPopupAddActive(false)
        getRecieveAddress()
    }

    const handleAddAddress = (e) => {
        e.preventDefault()
        const addressData = {
            reciever: reciever,
            phoneNum: phoneNum,
            address: address
        }
        getDocument(addressData)
    }

    const handleChangeMainAddress = (reciever, phoneNum, address) => {
        setMainAddress(`Reciever: ${reciever} - ${phoneNum}, ${address}`)
        setPopupChangeActive(false)
    }

    return (
        <div className="address-box">
            {
                listAddress.length > 0 ?
                    <>
                        <div className="address-detail">
                            <div className="address">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                <p>{mainAddress}</p>
                            </div>
                            <div className="btn">
                                <div className="btn-add" onClick={() => setPopupAddActive(true)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                                <div className="btn-change" onClick={() => setPopupChangeActive(true)}>
                                    <FontAwesomeIcon icon={faCog} />
                                </div>
                            </div>
                        </div>
                        <div className={`popup ${popupChangeActive ? 'show' : ''}`}>
                            <div className="cover">
                                <p className='title'>Change your receive address</p>
                                <div className="btn-close" onClick={() => setPopupChangeActive(false)}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </div>
                                <div className="list-address">
                                    {
                                        listAddress.map((e, index) => (
                                            <div className="address" key={index} onClick={() => handleChangeMainAddress(e.reciever, e.phoneNum, e.address)}>
                                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                                <p>Reciever: {e.reciever} - {e.phoneNum}, {e.address}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={`popup ${popupAddActive ? 'show' : ''}`}>
                            <div className="cover">
                                <p className="title">Add your new receive address</p>
                                <div className="btn-close" onClick={() => setPopupAddActive(false)}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </div>
                                <form>
                                    <input type="text" value={reciever} onChange={(e) => setReciever(e.target.value)} placeholder={"Receiver name"} />
                                    <input type="text" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} placeholder="Phone number" />
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                                    <input type="submit" value={'Add'} onClick={(e) => handleAddAddress(e)} />
                                </form>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="address-detail">
                            <p>You haven't add any receive address yet</p>
                            <div className="btn-add" onClick={() => setPopupAddActive(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                        <div className={`popup ${popupAddActive ? 'show' : ''}`}>
                            <div className="cover">
                                <p className="title">Add your new receive address</p>
                                <div className="btn-close" onClick={() => setPopupAddActive(false)}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </div>
                                <form>
                                    <input type="text" value={reciever} onChange={(e) => setReciever(e.target.value)} placeholder={"Receiver name"} />
                                    <input type="text" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} placeholder="Phone number" />
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                                    <input type="submit" value={'Add'} onClick={(e) => handleAddAddress(e)} />
                                </form>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default ChooseAddress