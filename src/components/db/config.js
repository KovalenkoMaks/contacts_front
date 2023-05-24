import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCLeMqTTtfVVaAo3MgPBTHpaoRfmTs60aM',
    authDomain: 'contacts1-3eb1c.firebaseapp.com',
    projectId: 'contacts1-3eb1c',
    storageBucket: 'contacts1-3eb1c.appspot.com',
    messagingSenderId: '94779472344',
    appId: '1:94779472344:web:34519e6f820e47d2429aad',
    measurementId: 'G-BKP91QLB2Z',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
