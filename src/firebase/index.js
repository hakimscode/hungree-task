import firebase from 'firebase';
import { firebaseConfig } from './config';

const FirebaseApp = firebase.initializeApp(firebaseConfig)
const FirebaseDB = FirebaseApp.database();

export { FirebaseApp, FirebaseDB };
