// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8nVtLDB51L--F6VcAikwbGGZJZO75VmE",
  authDomain: "pcweb6-974ee.firebaseapp.com",
  projectId: "pcweb6-974ee",
  storageBucket: "pcweb6-974ee.appspot.com",
  messagingSenderId: "1074553760514",
  appId: "1:1074553760514:web:0f5f303c0555879015301b",
  measurementId: "G-38ZCCHWQ55"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);