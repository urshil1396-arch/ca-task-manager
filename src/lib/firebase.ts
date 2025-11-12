import { initializeApp } from 'firebase/app';
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut
} from 'firebase/auth';
import {
  getFirestore, collection, doc, getDoc, setDoc, addDoc, updateDoc, serverTimestamp,
  query, where, orderBy, onSnapshot, Timestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth helpers
export function watchAuth(cb: (u: any) => void){ return onAuthStateChanged(auth, cb); }
export async function login(email: string, password: string){ return signInWithEmailAndPassword(auth, email, password); }
export async function logout(){ return signOut(auth); }

// Common Firestore exports
export {
  collection, doc, getDoc, setDoc, addDoc, updateDoc, serverTimestamp,
  query, where, orderBy, onSnapshot, Timestamp
};
