// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA4vwl_1hSQKhcNmSJ-qdWrBBN7bTOEBF4",
  authDomain: "taskwise-9b04b.firebaseapp.com",
  projectId: "taskwise-9b04b",
  storageBucket: "taskwise-9b04b.firebasestorage.app",
  messagingSenderId: "533657576365",
  appId: "1:533657576365:web:8c832ae589f733db87b724",
  measurementId: "G-00MVCBMKP9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
