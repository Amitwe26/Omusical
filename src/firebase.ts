// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_paslBzd19LU2ot-ZRIDPIk8bKJWNayM",
    authDomain: "musicchat-50099.firebaseapp.com",
    projectId: "musicchat-50099",
    storageBucket: "musicchat-50099.firebasestorage.app",
    messagingSenderId: "753523812399",
    appId: "1:753523812399:web:206e778fe76d1ceb827eda",
    measurementId: "G-MMD92LF2NT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
