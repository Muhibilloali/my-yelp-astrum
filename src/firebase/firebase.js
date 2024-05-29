import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


//yangi
const firebaseFirebase = {
  apiKey: "AIzaSyCO2HSgfyBKdVBWvLV26oZ759enlIjG1W8",
  authDomain: "o-tkirbek-yelp-19c55.firebaseapp.com",
  projectId: "o-tkirbek-yelp-19c55",
  storageBucket: "o-tkirbek-yelp-19c55.appspot.com",
  messagingSenderId: "1070499994814",
  appId: "1:1070499994814:web:0cc3bcc650d7315a82d2ef"
};

// Initialize Firebase
const app = initializeApp(firebaseFirebase );
export default app;

export const db = getFirestore(app);
