import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBltASLDDDpPUBEdQ0B2Fn_VBHWYZ_0li8",
  authDomain: "instagram-6e2c6.firebaseapp.com",
  projectId: "instagram-6e2c6",
  storageBucket: "instagram-6e2c6.firebasestorage.app",
  messagingSenderId: "94185266667",
  appId: "1:94185266667:web:c31dc769672b55add9cdae"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };


