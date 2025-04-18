
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVg5XAQgFynyIt1ZGDy-_sxFjvaSwAl0Q",
  authDomain: "eventifi1.firebaseapp.com",
  projectId: "eventifi1",
  storageBucket: "eventifi1.firebasestorage.app",
  messagingSenderId: "776642827897",
  appId: "1:776642827897:web:f45955533ce117a251a6a8",
  measurementId: "G-MW2PMCC977"
};

// Initialize Firebase

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getFirestore(app);
export const analytics = () => getAnalytics(app);

// export default app