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

        //Make asynchronous request to the database to store the data
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
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    //group all calls together into one big request
    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
    // get a new reference document from firebase collectionRef and generate a random ID
    // for it
    const newDocRef = collectionRef.doc();
    //console.log(newDocRef)
    batch.set(newDocRef, obj);
});
    //fireoff the batch request to create collections in firestore
return await batch.commit();
};

//take snapshot after componentDidMount( from ShopPage) and convert collections snapshot from 
//and array to an object customise it and save it to store in redux
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
        const {title, items } = doc.data();

        //return an actual object from the map function that represents all the data we want
        //for our frontend
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });
    //console.log(transformedCollections);

    //pass in an initial empty object
    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator; //so it goes into the next reduce iteration
    }, {});
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//get  access to the GoogleAuthProvider class from the auth library
export const googleProvider = new firebase.auth.GoogleAuthProvider();

//always trigger the google popup whenever we use the google auth provider for authentication
//and sign in
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;


