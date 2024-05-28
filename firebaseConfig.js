import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyBjy1hjuqeM1z5tnJL4chIUr6YndBE3OpE',
    authDomain: 'firestreamapp-16217.firebaseapp.com',
    projectId: 'firestreamapp-16217',
    storageBucket: 'firestreamapp-16217.appspot.com',
    messagingSenderId: '140826460233',
    appId: '1:140826460233:web:29dd2883379f5ff2e8bf98',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth();
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
