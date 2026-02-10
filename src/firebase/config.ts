// Firebase configuration for Abu Zaid Store
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCZZd43THVyLv6R4Az9AwqCGUzCrgh4Tds",
    authDomain: "abuzaidstore.firebaseapp.com",
    projectId: "abuzaidstore",
    storageBucket: "abuzaidstore.firebasestorage.app",
    messagingSenderId: "280450439481",
    appId: "1:280450439481:web:1bb95aed675bbf9e9830e8",
    measurementId: "G-DMWCLMK4PM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
