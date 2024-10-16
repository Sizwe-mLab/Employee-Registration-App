
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const FirebaseConfig = {
  apiKey: "AIzaSyB9cneA0GI-NTv-wQkyNHvO3OGQ6AybZGQ",
  authDomain: "employee-app-nodejs-9a093.firebaseapp.com",
  projectId: "employee-app-nodejs-9a093",
  storageBucket: "employee-app-nodejs-9a093.appspot.com",
  messagingSenderId: "428720044099",
  appId: "1:428720044099:web:7cf9553f904f85e77a7cf6",
  measurementId: "G-41S004S7LM"
};

const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);

export { db };