const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyBxPPdfvrY_SrHBMml_hojWmFa-nlyFvSE",
  authDomain: "viewbond-48dd9.firebaseapp.com",
  projectId: "viewbond-48dd9",
  storageBucket: "viewbond-48dd9.appspot.com",
  messagingSenderId: "407373777340",
  appId: "1:407373777340:web:ce485d153bf5d3d90583b9",
  measurementId: "G-0G9VV0VCSF"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const movies = db.collection("movies");
module.exports = movies;
