// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4VzUyuuOqzW-QFYNqbq1gGmBoCdQinY4",
  authDomain: "singup-50afd.firebaseapp.com",
  projectId: "singup-50afd",
  storageBucket: "singup-50afd.appspot.com",
  messagingSenderId: "13399250674",
  appId: "1:13399250674:web:b6617e3ab031ba0e94626b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth}
export default firebaseConfig
