import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './comment.scss'

import { app } from '../../firebase'
import { getDatabase, set, ref, onValue } from 'firebase/database'
import { useEffect } from 'react'

const db = getDatabase(app)

const Comment = ({ productId }) => {
    const isSigned = useSelector(state => state.user.isSigned)
    const userInfor = useSelector(state => state.user.infor)

    const [cmtValue, setCmtValue] = useState('')
    const [listCmt, setListCmt] = useState([])

    useEffect(() => {
        if (productId !== undefined) {
            const cmtRef = ref(db, `comment/${productId}/`)
            onValue(cmtRef, (snapshot) => {
                const data = snapshot.val();
                if (data) setListCmt(Object.values(data))
            })
        }
    }, [listCmt.length, productId])


    const handleComment = (e) => {
        e.preventDefault()

        const date = new Date()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const year = date.getFullYear()

        set(ref(db, `comment/${productId}/` + 0 + listCmt.length), {
            uid: userInfor.uid,
            productId: productId,
            userName: userInfor.displayName,
            userAvt: userInfor.photoURL,
            content: cmtValue,
            date: `${day >= 10 ? day : '0' + day}/${month >= 10 ? month : '0' + month}/${year}`
        })

        setCmtValue('')
    }

    return (
        <div className='Comment'>
            {
                listCmt.length > 0 &&
                <div className="Comment-list">
                    {
                        listCmt.map((item, index) => {
                            return (
                                <div className="cmt" key={index}>
                                    <div className="avt">
                                        <img src={item.userAvt} alt="" />
                                    </div>
                                    <div className="detail">
                                        <div className="top">
                                            <div className="name">{item.userName}</div>
                                            <div className="time">{item.date}</div>
                                        </div>
                                        <div className="content">{item.content}</div>
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            }
            {
                isSigned === true &&
                <form className="Comment-form" onSubmit={handleComment}>
                    <input type="text" value={cmtValue} onChange={(e) => setCmtValue(e.target.value)} placeholder='Write your comment' />
                    <FontAwesomeIcon icon={faPaperPlane} />
                </form>
            }
        </div>
    )
}

export default Comment
