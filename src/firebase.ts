// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4vwl_1hSQKhcNmSJ-qdWrBBN7bTOEBF4",
  authDomain: "taskwise-9b04b.firebaseapp.com",
  projectId: "taskwise-9b04b",
  storageBucket: "taskwise-9b04b.firebasestorage.app",
  messagingSenderId: "533657576365",
  appId: "1:533657576365:web:8c832ae589f733db87b724",
  measurementId: "G-00MVCBMKP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);