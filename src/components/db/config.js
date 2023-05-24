import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD26pUm2WUSFU0YLZk9LcAr7qnHlcXvJEQ",
    authDomain: "contacts-df9cc.firebaseapp.com",
    projectId: "contacts-df9cc",
    storageBucket: "contacts-df9cc.appspot.com",
    messagingSenderId: "182250173432",
    appId: "1:182250173432:web:dc384ee543dbf6963fdc0d",
    measurementId: "G-70PJ6C39BN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
