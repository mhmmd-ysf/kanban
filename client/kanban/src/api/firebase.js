// Initialize Firebase
import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBqV0g_lZmMpCi4T3J_D_vbcwFB_hb779s',
  authDomain: 'kanban-19bad.firebaseapp.com',
  databaseURL: 'https://kanban-19bad.firebaseio.com',
  projectId: 'kanban-19bad',
  storageBucket: 'kanban-19bad.appspot.com',
  messagingSenderId: '603905184669',
};
firebase.initializeApp(config);
const db = firebase.firestore();

export default db;
