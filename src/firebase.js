import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDopKMT9aPXVIx3tp-tC4ALj5kQS1ELYQk",
    authDomain: "instagram-clone-89a49.firebaseapp.com",
    databaseURL: "https://instagram-clone-89a49.firebaseio.com",
    projectId: "instagram-clone-89a49",
    storageBucket: "instagram-clone-89a49.appspot.com",
    messagingSenderId: "312084206229",
    appId: "1:312084206229:web:a5b26a9aa2759d95d9819c",
    measurementId: "G-F35F83X7RR"
  };
// Initializing App With The Following Configuration
  const firebaseApp=firebase.initializeApp(firebaseConfig);
//   Real Time DatabBase (Firestore)
  const db=firebaseApp.firestore();
//   Authentication
const auth=firebase.auth();
// Storage For Storing Images
const storage=firebase.storage();

export {db,auth,storage};