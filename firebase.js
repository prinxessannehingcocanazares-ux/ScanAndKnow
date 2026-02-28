import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAG2Hr3l39IUWMZb9J6VoJmAgHqo1quLM",
  authDomain: "scanandknow-14d98.firebaseapp.com",
  projectId: "scanandknow-14d98",
  storageBucket: "scanandknow-14d98.firebaseapp.com",
  messagingSenderId: "572867739400",
  appId: "1:572867739400:web:72fe1a6981418ca6fd76bd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
