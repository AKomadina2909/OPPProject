import firebase from 'firebase/app';
import 'firebase/storage';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBXZ4w2YvzKKQylFfwqXqNTt0eo36_-XKg",
    authDomain: "oppprojekt-e2c67.firebaseapp.com",
    databaseURL: "https://oppprojekt-e2c67.firebaseio.com",
    projectId: "oppprojekt-e2c67",
    storageBucket: "oppprojekt-e2c67.appspot.com",
    messagingSenderId: "471676795656"
  };
  firebase.initializeApp(config);

  const storage=firebase.storage();
  export{
      storage, firebase as default
  }