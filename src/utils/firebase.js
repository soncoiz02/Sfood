import { getDatabase, onValue, ref } from "firebase/database"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { app } from "../firebaseConfig"

const db = getFirestore(app)
const realDb = getDatabase(app)

export const getUserData = async (uid) => {
    const userDocRef = doc(db, 'users', uid)
    const docSnap = await getDoc(userDocRef)
    const userInfor = docSnap.data()
    return userInfor
}

export const getCartData = (uid) => {
    onValue(ref(realDb, `cart/${uid}/value/`), (snapshot) => {
        const data = snapshot.val()
        return data
    })
}