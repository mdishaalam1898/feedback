import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCW9FUUjyEA-L939MgbQjRVA2vZ_lRO-bQ",
  authDomain: "feedbacks-d5051.firebaseapp.com",
  projectId: "feedbacks-d5051",
  storageBucket: "feedbacks-d5051.firebasestorage.app",
  messagingSenderId: "239583710277",
  appId: "1:239583710277:web:3213cf27861abac057672c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
