// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "business-direct-3fe9f.firebaseapp.com",
    projectId: "business-direct-3fe9f",
    storageBucket: "business-direct-3fe9f.firebasestorage.app",
    messagingSenderId: "54804310998",
    appId: "1:54804310998:web:e4386347222f96875c5277",
    measurementId: "G-CHLVKFSX29"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
//const analytics = getAnalytics(app);