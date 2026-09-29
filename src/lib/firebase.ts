import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, type User, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyPyqunVqQ3r2jJmKyxb9KHITAqplf4fE",
  authDomain: "datahunter-f5894.firebaseapp.com",
  databaseURL: "https://datahunter-f5894-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "datahunter-f5894",
  storageBucket: "datahunter-f5894.firebasestorage.app",
  messagingSenderId: "1032622875209",
  appId: "1:1032622875209:web:67e1824a4104adeef81598",
  measurementId: "G-VP93SFSEKT"
};

// Initialize Firebase - check if app already exists
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth
const auth = getAuth(app);

export type { User };
export { 
  app,
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
};