import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2rhLc-C5wMiA6BqKNSmPGck4ioJrDeF8",
    authDomain: "cajeroautomaticotrz.firebaseapp.com",
    databaseURL: "https://cajeroautomaticotrz.firebaseio.com",
    projectId: "cajeroautomaticotrz",
    storageBucket: "cajeroautomaticotrz.appspot.com",
    messagingSenderId: "117140734692",
    appId: "1:117140734692:web:50eedd09c9bcbb1545a2f1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()

export { auth, firebase, db }