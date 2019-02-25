 import firebase from 'firebase'
 import firestore from 'firebase/firestore'
 // Initialize Firebase
 var config = {
   apiKey: "AIzaSyBZfyWqYVMuuabrdIdm9wQKbsfen3zsZ0M",
   authDomain: "recipe-app-3f29f.firebaseapp.com",
   databaseURL: "https://recipe-app-3f29f.firebaseio.com",
   projectId: "recipe-app-3f29f",
   storageBucket: "recipe-app-3f29f.appspot.com",
   messagingSenderId: "616122635416"
 };
 const firebaseApp = firebase.initializeApp(config);
 firebaseApp.firestore().settings({
   timestampsInSnapshots: true
 })
 //  const firestore = firebase.firestore();
 //  const settings = { /* your settings... */
 //    timestampsInSnapshots: true
 //  };
 //  firestore.settings(settings);

 export default firebaseApp.firestore()
