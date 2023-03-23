
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// const firebase = require('firebase');
const firebaseConfig = {
  apiKey: "AIzaSyB-TtiSJnxzOMLNWPiUdd1Ayt_Yo-sx18I",
  authDomain: "metfolio-a4114.firebaseapp.com",
  databaseURL: "https://metfolio-a4114-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "metfolio-a4114",
  storageBucket: "metfolio-a4114.appspot.com",
  messagingSenderId: "1081224747539",
  appId: "1:1081224747539:web:674f6d7cae4f5676af3de6",
  measurementId: "G-9E7K37VNBB"
};
const fb = initializeApp(firebaseConfig);
const db = getFirestore(fb);
const graph = collection(db, 'graph');

export default graph;