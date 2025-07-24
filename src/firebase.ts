// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD65VVQkeWnriYe2PH0ZoER0Z8FtBrzZ9c",
  authDomain: "cookmate-47cec.firebaseapp.com",
  projectId: "cookmate-47cec",
  storageBucket: "cookmate-47cec.firebasestorage.app",
  messagingSenderId: "31418361801",
  appId: "1:31418361801:web:fe7af7961cabd52ab1aa18",
  measurementId: "G-R1CBJHN9SP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };
