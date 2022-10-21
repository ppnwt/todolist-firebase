import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyAbTWgS2Fs7bBjFby57cnExArvas4MG8Z0",
  authDomain: "new-pro-2caca.firebaseapp.com",
  databaseUrl: "https://new-pro-2caca-default-rtdb.firebaseio.com/",
  projectId: "new-pro-2caca",
  storageBucket: "new-pro-2caca.appspot.com",
  messagingSenderId: "1064283490598",
  appId: "1:1064283490598:web:7b2cea3e3907360879d9e7",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
