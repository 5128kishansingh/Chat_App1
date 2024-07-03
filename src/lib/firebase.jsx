
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-c5eca.firebaseapp.com",
  projectId: "reactchat-c5eca",
  storageBucket: "reactchat-c5eca.appspot.com",
  messagingSenderId: "559962360152",
  appId: "1:559962360152:web:e73ef6f553ac2d96833d2d"
};


const app = initializeApp(firebaseConfig);

export const auth =getAuth()
export const db=getFirestore()
export const storage=getStorage()