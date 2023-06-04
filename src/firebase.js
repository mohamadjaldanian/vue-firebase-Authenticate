import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDwH2uUtTR7aRXCI5iDjwmxTSY7Xd0dSZk",
  authDomain: "authdb-57ba1.firebaseapp.com",
  projectId: "authdb-57ba1",
  storageBucket: "authdb-57ba1.appspot.com",
  messagingSenderId: "812993377309",
  appId: "1:812993377309:web:3c876b5e31dc92e6b482f4"
};
const firebase = initializeApp(firebaseConfig);

export default firebase;