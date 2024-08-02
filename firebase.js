
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlwsZJBv2aTNEZnxF44FpE90lGlNAgiMc",
  authDomain: "inventory-8bf8a.firebaseapp.com",
  projectId: "inventory-8bf8a",
  storageBucket: "inventory-8bf8a.appspot.com",
  messagingSenderId: "1097294251043",
  appId: "1:1097294251043:web:2d69fa488109dcc16f1d96",
  measurementId: "G-GFYJW788GX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}