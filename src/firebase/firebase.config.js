// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrV3mgzr3FOZ1xAc8tMDsbM7bCy0ciuPA",
  authDomain: "m59-email-password-auth.firebaseapp.com",
  projectId: "m59-email-password-auth",
  storageBucket: "m59-email-password-auth.appspot.com",
  messagingSenderId: "553564692127",
  appId: "1:553564692127:web:6ca07fa4b0ef497aba8caa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;