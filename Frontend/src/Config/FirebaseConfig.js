import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCrl7JQaMab48IgXsbTk4bj-mBpafrJDNQ",
    authDomain: "probo-app-72626.firebaseapp.com",
    projectId: "probo-app-72626",
    storageBucket: "probo-app-72626.firebasestorage.app",
    messagingSenderId: "672319493772",
    appId: "1:672319493772:web:1d311954830e923940cda9",
    measurementId: "G-128HQBNNL1"
  };



  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);