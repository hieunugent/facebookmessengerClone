import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCs2lEkqi7JektqshDUSW-USYCzxE99zu0",
  authDomain: "facebookclone-d6aca.firebaseapp.com",
  databaseURL: "https://facebookclone-d6aca.firebaseio.com",
  projectId: "facebookclone-d6aca",
  storageBucket: "facebookclone-d6aca.appspot.com",
  messagingSenderId: "251074480316",
  appId: "1:251074480316:web:50cfcaddbc5a12e0f068b9",
  measurementId: "G-CLRR5LGL1W",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export default db;