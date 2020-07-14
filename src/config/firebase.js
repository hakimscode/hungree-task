import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA321r7YJX4yLjPb9bFf_I_NnKNHngmtMM",
    authDomain: "hungree-task.firebaseapp.com",
    databaseURL: "https://hungree-task.firebaseio.com",
    projectId: "hungree-task",
    storageBucket: "hungree-task.appspot.com",
    messagingSenderId: "544947143685",
    appId: "1:544947143685:web:3849f005e5524742d7886c",
    measurementId: "G-8NGWH1H7MW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp;
