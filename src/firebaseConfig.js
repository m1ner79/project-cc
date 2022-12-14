// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqqEIcXcSTbE8F1b52OqNn4r-NlYmKsHg",
  authDomain: "ccdb-f69e9.firebaseapp.com",
  projectId: "ccdb-f69e9",
  storageBucket: "ccdb-f69e9.appspot.com",
  messagingSenderId: "62038044985",
  appId: "1:62038044985:web:c7bd80910a8c0690e278e8",
  measurementId: "G-WMNSJ181YH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
// const analytics = getAnalytics(app);