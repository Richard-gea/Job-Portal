import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyALQimH4d0tI9muLxtBsmJvgTX-4x1ZSfI",
  authDomain: "jobportal-lite.firebaseapp.com",
  projectId: "jobportal-lite",
  storageBucket: "jobportal-lite.firebasestorage.app",
  messagingSenderId: "991955712848",
  appId: "1:991955712848:web:0e989f6036c889c5dd0a55",
  measurementId: "G-K3K10YQ3SE"
};

export const app = initializeApp(firebaseConfig);
export const fireDB = getFirestore(app);