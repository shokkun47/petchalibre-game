import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnR0JNWSkK6mvHW7U1KuE4Pn50gNv9gMg",
  authDomain: "petchalibre-game.firebaseapp.com",
  projectId: "petchalibre-game",
  storageBucket: "petchalibre-game.firebasestorage.app",
  messagingSenderId: "885983889552",
  appId: "1:885983889552:web:758c9b9fdfd866379bf015"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);