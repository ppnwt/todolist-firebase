import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDuCdn-6FDguf2AXNFhGoR2Pyi1UldhKbE",
  authDomain: "todo-1-1caf2.firebaseapp.com",
  databaseURL:
    "https://todo-1-1caf2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-1-1caf2",
  storageBucket: "todo-1-1caf2.appspot.com",
  messagingSenderId: "219249354834",
  appId: "1:219249354834:web:087d4c96db0a977877978b",
  measurementId: "G-EHMLKV0YJS",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
