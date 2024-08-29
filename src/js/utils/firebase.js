// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaAMkgWczOeKIZokoeRfrEj50rHRqUvCA",
  authDomain: "story-app-db880.firebaseapp.com",
  projectId: "story-app-db880",
  storageBucket: "story-app-db880.appspot.com",
  messagingSenderId: "792200133024",
  appId: "1:792200133024:web:b9bb9ee24c4e8444884cc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };