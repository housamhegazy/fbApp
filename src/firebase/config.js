
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJdKUZoyVModUw2uh3aAZl4puCc8pnPpU",
  authDomain: "level4-mui.firebaseapp.com",
  projectId: "level4-mui",
  storageBucket: "level4-mui.appspot.com",
  messagingSenderId: "811258886993",
  appId: "1:811258886993:web:924cd136134465a27b7170"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
