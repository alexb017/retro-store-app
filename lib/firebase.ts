// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore';
import { getApps, getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAUplzHtMeWK4wjmq-JEPrpmUyrS_XQvyo',
  authDomain: 'task-app-771ec.firebaseapp.com',
  projectId: 'task-app-771ec',
  storageBucket: 'task-app-771ec.appspot.com',
  messagingSenderId: '710444371656',
  appId: '1:710444371656:web:833f6eae99446a5b159ffd',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth };
