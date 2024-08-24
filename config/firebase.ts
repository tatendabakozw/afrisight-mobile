// lib/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2q-XZYZJv92uvriS6QerY9O42hOXo3Xg",
  authDomain: "afrisight-forms.firebaseapp.com",
  projectId: "afrisight-forms",
  storageBucket: "afrisight-forms.appspot.com",
  messagingSenderId: "275397252203",
  appId: "G-4VB0RJ7E96",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
