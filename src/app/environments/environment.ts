// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7_Fnv7X3seinZoTSRhRtml-uU9HAINP8",
  authDomain: "gastos-app-pro.firebaseapp.com",
  databaseURL: "https://gastos-app-pro-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gastos-app-pro",
  storageBucket: "gastos-app-pro.firebasestorage.app",
  messagingSenderId: "546541408657",
  appId: "1:546541408657:web:464ad9f7fc318d202eca30",
  measurementId: "G-PH8D3G82SV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
