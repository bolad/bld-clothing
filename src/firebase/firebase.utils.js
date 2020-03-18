import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAzY3p9bkFJMvS9mcbpqWpcsKsA4g1rojA",
    authDomain: "bld-clothing.firebaseapp.com",
    databaseURL: "https://bld-clothing.firebaseio.com",
    projectId: "bld-clothing",
    storageBucket: "bld-clothing.appspot.com",
    messagingSenderId: "76192001705",
    appId: "1:76192001705:web:9cdb1ad71fd706280903b8",
    measurementId: "G-WQR7SMQQBJ"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;


