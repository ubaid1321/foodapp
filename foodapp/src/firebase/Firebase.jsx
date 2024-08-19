import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDcflC68BIYNyYGtRDtgGYU9ErR4olGLfY",
  authDomain: "foodapp1-1efe9.firebaseapp.com",
  projectId: "foodapp1-1efe9",
  storageBucket: "foodapp1-1efe9.appspot.com",
  messagingSenderId: "531745714786",
  appId: "1:531745714786:web:1f72160811e3b49e9d173b"
};


const app = initializeApp(firebaseConfig);
const fireDB= getFirestore(app)
const auth = getAuth(app)
export {fireDB,auth}