import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, type User, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJrtnwpSKpRZgjI3bRqK-mW9CCrv56aaw",
  authDomain: "datahunter-website.firebaseapp.com",
  projectId: "datahunter-website",
  storageBucket: "datahunter-website.firebasestorage.app",
  messagingSenderId: "315734599304",
  appId: "1:315734599304:web:41b98f2b9bf52a88dca13d"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

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