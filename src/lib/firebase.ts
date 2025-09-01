// src/lib/firebase.js
import { initializeApp } from "firebase/app";
// Import other Firebase services you plan to use, for example:
import { getAuth } from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore"; // For Firestore
import { getStorage } from "firebase/storage"; // For Storage (Photos)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHMkhPQoP3XNp1o2n03MItSNK-617aFRk",
  authDomain: "ghotokderbari-mofizul.firebaseapp.com",
  projectId: "ghotokderbari-mofizul",
  storageBucket: "ghotokderbari-mofizul.firebasestorage.app",
  messagingSenderId: "867587737189",
  appId: "1:867587737189:web:97da0f40558b4fc5d8a88c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export the app instance if needed elsewhere
export default app;