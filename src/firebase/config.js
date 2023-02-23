// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATmZpq4memYQsNNwrdBJqd6SOgfe2QpJI",
  authDomain: "train-on-level-2-and-3.firebaseapp.com",
  projectId: "train-on-level-2-and-3",
  storageBucket: "train-on-level-2-and-3.appspot.com",
  messagingSenderId: "316275922139",
  appId: "1:316275922139:web:d9e9b2e3130347f7d2e8fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
