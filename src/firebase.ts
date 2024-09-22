// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW4h-vwHc9OjdpOSCEsGuj-Pd7BQ5k-Fs",
  authDomain: "nwitter-reloaded-3a783.firebaseapp.com",
  projectId: "nwitter-reloaded-3a783",
  storageBucket: "nwitter-reloaded-3a783.appspot.com",
  messagingSenderId: "1023480565261",
  appId: "1:1023480565261:web:6346a7fa72a74d88c14f44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);