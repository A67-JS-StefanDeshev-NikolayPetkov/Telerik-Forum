// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD65cq3mYFgitmUcEcseWhP4Caw3vRVywo",
  authDomain: "mountain-forum.firebaseapp.com",
  projectId: "mountain-forum",
  storageBucket: "mountain-forum.firebasestorage.app",
  messagingSenderId: "972829323396",
  appId: "1:972829323396:web:be65012d0c3b7e9b6c52d1",
  databaseURL: "https://mountain-forum-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);