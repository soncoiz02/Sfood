// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDcBJWXumGeqmfTIo9EVHVsJ4ALLffVGUA",
    authDomain: "sfood-f2033.firebaseapp.com",
    databaseURL: "https://sfood-f2033-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sfood-f2033",
    storageBucket: "sfood-f2033.appspot.com",
    messagingSenderId: "425051355235",
    appId: "1:425051355235:web:5e7e87a9a0d51bff322056",
    measurementId: "G-DJGV0YLFHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app }