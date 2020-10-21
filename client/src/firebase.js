import firebase from "firebase/app";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  //firebase config
});

const auth = firebaseApp.auth();

export { auth };
