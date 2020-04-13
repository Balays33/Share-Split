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
//const Transaction = document.getElementById('Transaction');
const inputTotalBill = document.getElementById('inputTotalBill');
const mainOwed = document.getElementById('mainOwed');
const NumberofPeople = document.getElementById('NumberofPeople');
var codeFortransaction;




// start the website you get a code what you can use
GenerateACode(4);
UploadBill();

//teststartF();
//   -------TEST-------------------            
// if you want to see all of the data from the server
function teststartF() {
  // get elements
      const Transaction = document.getElementById('Transaction');
  // create references
      const dbTransaction = firebase.database().ref("ShareSplit/Transaction");
  //Sync object changes
      dbTransaction.on('value', snap => {
        Transaction.innerHTML = JSON.stringify(snap.val(), null, 3);
        console.log(snap.val());
      });
}


// upload data to cloud
function UploadBill() {
  console.log("upload data to cloud");
  //GenerateACode(4);
  var getCodefromUser = document.getElementById("getCode").value;
  console.log("getCodefromUser : "+getCodefromUser);
  console.log(" inputTotalBill : " + inputTotalBill.value + " mainOwed : " + mainOwed.value + " Number of People : " + NumberofPeople.value + " Tip : " + tip.value);
  //console.log(finalpay);
  code = getCodefromUser;
  firebase.database().ref('ShareSplit/Transaction/' + code).set({
    inputTotalBill: inputTotalBill.value,
    mainOwed: mainOwed.value,
    NumberofPeople: NumberofPeople.value,
    tip : tip.value
  });
  counter(inputTotalBill.value,tip.value,code);
  var sizeOfFor = NumberofPeople.value;
  for ( step = 0; step < sizeOfFor; step++) {
    // Runs few times
    console.log('step : '+(step+1));
    firebase.database().ref('ShareSplit/Transaction/' + code).update({
      clientBill: step+1
      });
  }
  result = code;
  getdataStart(code);
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
  document.getElementById("getCode").value = result;
  getdataStart(result);
  //console.log("codeFortransaction : "+codeFortransaction);
  return result;
}

// get your emty data when you start the app
function getdataStart(result) {
  //Sync object changes
  const dbGetData = firebase.database().ref("ShareSplit/Transaction/" + result + "");
  dbGetData.on('value', snap => {
    yourpersonalDATA.innerHTML = JSON.stringify(snap.val(), null, 3);
    console.log(snap.val());
  });

}

function counter(inputTotalBill,tip,code){
  //console.log("counter : "+inputTotalBill+" "+tip);
  var finalpay   = inputTotalBill*(1+(tip/100));
  //console.log(finalpay);
  var shfinalpay = finalpay.toFixed(0);
  //console.log(shfinalpay);
  document.getElementById('finalPay').innerHTML = shfinalpay;
  // add final pay bill  + tip
  firebase.database().ref('ShareSplit/Transaction/' + code).update({
    FinalPay: shfinalpay
    });
 
} 