import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {};
// Initializing App With The Following Configuration
  const firebaseApp=firebase.initializeApp(firebaseConfig);
//   Real Time DatabBase (Firestore)
  const db=firebaseApp.firestore();
//   Authentication
const auth=firebase.auth();
// Storage For Storing Images
const storage=firebase.storage();

export {db,auth,storage};