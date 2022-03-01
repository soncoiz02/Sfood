import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ChooseAddress from '../../../components/ChooseAddress/ChooseAddress'
import { app } from '../../../firebaseConfig'
import './infor.scss'

import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { setUserInfor } from '../../../redux/action/user'

const storage = getStorage(app)
const db = getFirestore(app)

const AccountInfor = () => {
    const userInfor = useSelector(state => state.user.infor)
    const dispatch = useDispatch()

    const [imgNameFile, setImgNameFile] = useState('')
    const [imgFile, setImgFile] = useState()
    const [fullname, setFullname] = useState('')
    const imgRef = useRef()

    const [listAddress, setListAddress] = useState([])
    const [mainAddress, setMainAddress] = useState('')

    const userRef = doc(db, 'users', userInfor.uid)

    useEffect(() => {
        setFullname(userInfor.displayName)
        getRecieveAddress()
    }, [userInfor])

    const getRecieveAddress = async () => {
        const docSnap = await getDoc(userRef)
        const docData = docSnap.data()
        setListAddress(docData.recieveAddress)
    }

    const handleChangeImg = (e) => {
        const file = e.target.files[0]
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.addEventListener('load', () => {
                imgRef.current.innerHTML = `<img src="${fileReader.result}" />`
            })
            setImgNameFile(file.name)
            setImgFile(file)
        }
    }

    const getImgLink = async () => {
        const storageRef = ref(storage, 'image')
        const snapshot = await uploadBytes(storageRef, imgFile)
        if (snapshot) {
            const url = await getDownloadURL(storageRef)
            return url
        }
    }

    const handleUpdate = async () => {
        const userRef = doc(db, 'users', userInfor.uid)

        if (imgNameFile !== '') {
            const imgLink = await getImgLink()
            await updateDoc(userRef, {
                photoURL: imgLink
            })

            const newUserInfor = {
                ...userInfor,
                photoURL: imgLink
            }

            dispatch(setUserInfor(newUserInfor))
        }

        if (fullname !== '' && fullname !== userInfor.displayName) {
            await updateDoc(userRef, {
                displayName: fullname
            })

            const newUserInfor = {
                ...userInfor,
                displayName: fullname
            }

            dispatch(setUserInfor(newUserInfor))
        }
    }

    return (
        <div className='account-infor'>
            <div className="avt">
                <div className="img" ref={imgRef}>
                    <img src={userInfor.photoURL} alt="" />
                </div>
                <label htmlFor="img-upload">
                    <FontAwesomeIcon icon={faImage} />
                    Upload your avatar
                </label>
                <input type="file" id="img-upload" onChange={(e) => handleChangeImg(e)} />
            </div>
            <div className="detail">
                <div className="cover">
                    <p className='title'>Fullname</p>
                    <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </div>
                <div className="cover">
                    <p className='title'>Email</p>
                    <input type="text" value={userInfor.email} readOnly />
                </div>
                <div className="cover">
                    <p className='title'>Your recieve address</p>
                    <ChooseAddress
                        mainAddress={mainAddress}
                        setMainAddress={setMainAddress}
                        listAddress={listAddress}
                        getListAddress={getRecieveAddress}
                    />
                </div>
                <button className='btn-apply' onClick={handleUpdate}>Apply</button>
            </div>
        </div>
    )
}

export default AccountInfor