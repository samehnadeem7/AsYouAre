import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDi78g-Nb9vGDRTIZVUMAK28EX8EItQ7EA",
  authDomain: "asyouare-4a199.firebaseapp.com",
  projectId: "asyouare-4a199",
  storageBucket: "asyouare-4a199.firebasestorage.app",
  messagingSenderId: "902894704692",
  appId: "1:902894704692:web:526dd7c4fb44387a411261",
  measurementId: "G-0TH1K1M8C9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Sign in anonymously immediately
signInAnonymously(auth).catch(err => console.error("Firebase Auth Error", err));

export { auth, db, storage };
