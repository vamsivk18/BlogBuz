// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogbuz-592f3.firebaseapp.com",
  projectId: "blogbuz-592f3",
  storageBucket: "blogbuz-592f3.appspot.com",
  messagingSenderId: "725725482306",
  appId: "1:725725482306:web:2679302eb2aff2abf6ccdb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
