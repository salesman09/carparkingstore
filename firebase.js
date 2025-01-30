// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwEaK1ZNt1yTveyK_1cMkwCErTH5lfNTw",
  authDomain: "salesman-empire.firebaseapp.com",
  projectId: "salesman-empire",
  storageBucket: "salesman-empire.firebasestorage.app",
  messagingSenderId: "97792040953",
  appId: "1:97792040953:web:900e6ba63c277a59b22728",
  measurementId: "G-7SGT3L94ZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);