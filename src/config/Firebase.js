// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBS9olmsEwi3SYp7fGsn_4vCwvV4fTEUIQ",
    authDomain: "tasktracker-861d4-1f4b6.firebaseapp.com",
    projectId: "tasktracker-861d4",
    storageBucket: "tasktracker-861d4.appspot.com",
    messagingSenderId: "169366732093",
    appId: "1:169366732093:web:9eebc37d1736d524b19954"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 