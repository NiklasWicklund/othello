import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB2rVeSuILMSyJw5CbNeSXgSLh9w7Ni_ZY",
    authDomain: "othello-2394a.firebaseapp.com",
    projectId: "othello-2394a",
    storageBucket: "othello-2394a.appspot.com",
    messagingSenderId: "156988134707",
    appId: "156988134707:web:b87811f11e3eccc20a1a46",
    measurementId: "G-QPKYBSLE94"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);