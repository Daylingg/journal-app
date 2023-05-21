//import firebase from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
//import 'firebase/auth';

import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAiNhZna_yZCfW0oe0bmCYTkKQuXfl2RpU",
  authDomain: "journal-app-2ca89.firebaseapp.com",
  projectId: "journal-app-2ca89",
  storageBucket: "journal-app-2ca89.appspot.com",
  messagingSenderId: "664605994657",
  appId: "1:664605994657:web:48cf28117bafbeee3acae0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app)
const auth = getAuth(app)
//const googleAuthProvider = new GoogleAuthProvider()

//const db= firebase.firestore()
//const googleAuthProvider= new firebase.auth.GoogleAuthProvider()

export{
    db,
    auth
}