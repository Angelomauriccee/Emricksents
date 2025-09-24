// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// 🔥 Replace with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDj9mGqXqY7Z8Z7X8Y8Z9Y9Z9Y9Z9Y9Z9Y",
  authDomain: "emrickscents-store.firebaseapp.com",
  projectId: "emrickscents-store",
  storageBucket: "emrickscents-store.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };