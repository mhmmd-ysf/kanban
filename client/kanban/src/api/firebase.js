// Initialize Firebase
import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: process.env.VUE_APP_GOOGLE_APIKEY,
  authDomain: process.env.VUE_APP_GOOGLE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_GOOGLE_DATABASE_URL,
  projectId: process.env.VUE_APP_GOOGLE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_GOOGLE_MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);
const db = firebase.firestore();

export default db;
