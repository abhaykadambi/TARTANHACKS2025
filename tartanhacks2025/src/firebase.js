// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwbmMlIXcTjy8o-GwkjnjTfHU7Xz8vAd4",
  authDomain: "tartanhacks25.firebaseapp.com",
  projectId: "tartanhacks25",
  storageBucket: "tartanhacks25.firebasestorage.app",
  messagingSenderId: "107127850175",
  appId: "1:107127850175:web:d0f59d2a047599a5b2320a",
  measurementId: "G-SB9X07CR8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
