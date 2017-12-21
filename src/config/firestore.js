import secrets from './secrets';
const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

/**
 * NOT IN USE FOR NOW
 */
const startFirestore = () => {
  try {
    window.firebaseApp = firebase.initializeApp(secrets.firebase, 'firestoreApp');
    window.firestore = window.firebaseApp.firestore();
  } catch (error) {
    console.error("Couldn't connect to Firebase/Firestore", error);
  }
};

export default startFirestore;
