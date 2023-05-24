import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnmJoWO-z8l5ZUEw3OgzcsJgoCLsrboRs",
  authDomain: "momazos-react.firebaseapp.com",
  projectId: "momazos-react",
  storageBucket: "momazos-react.appspot.com",
  messagingSenderId: "112917249068",
  appId: "1:112917249068:web:f181b029a134b1f00d2589"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const storage = firebase.storage();

export{
storage, firestore as default
} 
