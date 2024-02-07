// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase/compat/app";
import "firebase/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-11277.firebaseapp.com",
  projectId: "mern-auth-11277",
  storageBucket: "mern-auth-11277.appspot.com",
  messagingSenderId: "880330713946",
  appId: "1:880330713946:web:a753451db8259875d92163"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);