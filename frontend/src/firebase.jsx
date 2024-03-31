import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBX3EO4NDaPmIjErsK7O5CpwpcbJJBvApM",
    authDomain: "retinamed-prognosis.firebaseapp.com",
    projectId: "retinamed-prognosis",
    storageBucket: "retinamed-prognosis.appspot.com",
    messagingSenderId: "648132583252",
    appId: "1:648132583252:web:500b1a096f805a8ebf32c1",
    measurementId: "G-S8RSH1TCEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);




