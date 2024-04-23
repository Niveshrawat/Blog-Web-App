import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD6BMeDBk17PbQtOWQvR7AliILRdosaMw",
  authDomain: "blog-521ab.firebaseapp.com",
  projectId: "blog-521ab",
  storageBucket: "blog-521ab.appspot.com",
  messagingSenderId: "383424485157",
  appId: "1:383424485157:web:17a77da152372f520caccc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
