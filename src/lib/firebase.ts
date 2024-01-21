// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7B8hAPJLQxyYQDRp3n130NLlm29GIw3E",
  authDomain: "r3vive-e9f3e.firebaseapp.com",
  projectId: "r3vive-e9f3e",
  storageBucket: "r3vive-e9f3e.appspot.com",
  messagingSenderId: "986808019576",
  appId: "1:986808019576:web:79063e3eb484e1656fdb8d",
  measurementId: "G-F5NFX2R7D6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)