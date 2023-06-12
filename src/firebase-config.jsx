// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-q2_dwLpsPj5kyJJ5mq9WyAjmw2diCkY",
  authDomain: "octs-37cd6.firebaseapp.com",
  projectId: "octs-37cd6",
  storageBucket: "octs-37cd6.appspot.com",
  messagingSenderId: "791843106649",
  appId: "1:791843106649:web:6b837c4a235ea34c7da648",
  measurementId: "G-T449M87R2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

//const analytics = getAnalytics(app);