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
const Transaction = document.getElementById('Transaction');
const inputTotalBill = document.getElementById('inputTotalBill');
const mainOwed = document.getElementById('mainOwed');
const NumberofPeople = document.getElementById('NumberofPeople');
var codeFortransaction;

// create references
const dbTransaction = firebase.database().ref("ShareSplit/Transaction");

//Sync object changes
dbTransaction.on('value', snap => { 
  Transaction.innerHTML = JSON.stringify(snap.val(), null, 3);
  console.log(snap.val());
});



// upload data to cloud
function UploadBill() {
  console.log("upload data to cloud");
  GenerateACode(4);
  console.log(" inputTotalBill : " + inputTotalBill.value + " mainOwed : " + mainOwed.value + " Number of People : " + NumberofPeople.value + " Tip : " + tip.value);
  code = codeFortransaction;
  firebase.database().ref('ShareSplit/Transaction/' + codeFortransaction).set({
    inputTotalBill: inputTotalBill.value,
    mainOwed: mainOwed.value,
    NumberofPeople: NumberofPeople.value
  });

}


// Create a code to the identifiable the transaction
function GenerateACode(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  document.getElementById("generatedCODE").innerHTML = result;
  console.log("Generate a Code : " + result);
  codeFortransaction = result;
  //console.log("codeFortransaction : "+codeFortransaction);
  return result;
}