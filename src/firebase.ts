// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZGnXJ-DdSv1OM6YILca1GP-dEja7VD5o",
  authDomain: "soluces-dao.firebaseapp.com",
  projectId: "soluces-dao",
  storageBucket: "soluces-dao.appspot.com",
  messagingSenderId: "446045924300",
  appId: "1:446045924300:web:28065c48c99adc7d0f8b69",
  measurementId: "G-CD37YV3ZNH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
