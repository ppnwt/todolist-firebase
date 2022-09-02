// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/database";
const firebaseConfig = {
  apiKey: "AIzaSyDsv1j7GhRo1z1ubTu0XbcY1EKCvRW5QwU",
  authDomain: "fir-crud-6269f.firebaseapp.com",
  databaseURL:
    "https://todo-crud-eaeaa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-crud-6269f",
  storageBucket: "fir-crud-6269f.appspot.com",
  messagingSenderId: "733416716429",
  appId: "1:733416716429:web:619a48273cdf67a09b8ac4",
  measurementId: "G-FVSFE9TNZZ",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
