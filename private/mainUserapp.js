console.log("main user app ");

const firebaseConfig = {
    apiKey: "AIzaSyBBq8V3pCR86GhE3XhdaCEQqczfnysZHUk",
    authDomain: "shareandsplit-c1006.firebaseapp.com",
    databaseURL: "https://shareandsplit-c1006.firebaseio.com",
    projectId: "shareandsplit-c1006",
    storageBucket: "shareandsplit-c1006.appspot.com",
    messagingSenderId: "205797103800",
    appId: "1:205797103800:web:3cff34316bed297ae57c4d",
    measurementId: "G-X04ZQ3QW5L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  // Get a reference to the database service
  //var database = firebase.database();
  
  // get elements