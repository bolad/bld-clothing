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

  //take the userAuth object received from authentication library and store in database
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    //Get the user reference from firestore
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //wait to GET the data from userRef and store it in snapShot
    const snapShot = await userRef.get();

    //Save snapShot to database if it does not exist
    if(!snapShot.exists) {
        //Destructure which data from userAuth you want to save to database
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        //Make asynchronous to the database to store the data
        try {
            //Create user with .set()
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
            
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    //return the user reference so we can call it in App.js
    return userRef;
  }

  export const addCollectionAndDocuments = (collectionKey, objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);
  }

  // Initialize Firebase
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;


