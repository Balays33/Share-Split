
console.log("Hello world!");

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
const preObject = document.getElementById('object');
const userdata = document.getElementById('userdata');
const inputTotalBill = document.getElementById('inputTotalBill');
const yourOwed = document.getElementById('yourOwed');
const NumberofPeople = document.getElementById('NumberofPeople');

// create references
const dbRefObject = firebase.database().ref().child('object');
const dbRefUserCode = firebase.database().ref("User/Codes");

//Sync object changes
//dbRefObject.on('value', snap =>  console.log(snap.val()));
dbRefObject.on('value', snap => { 
  preObject.innerHTML = JSON.stringify(snap.val(), null, 3);
});
dbRefUserCode.on('value', snap => { 
  userdata.innerHTML = JSON.stringify(snap.val(), null, 3);
  console.log(snap.val());
});

const age = document.getElementById('age');
var testcode;
function Testuser(){
  console.log('Testuser '+age.value);
  console.log('testcode '+testcode);
  name = testcode;
  firebase.database().ref('User/Codes' +name).set({
    age: age.value,
    testcode : testcode
  });

}


function UploadBill(){
  GenerateACode(4);
  console.log("Upload Bill");
  var genCODE = document.getElementById('generatedNumber').innerHTML;
  console.log(genCODE);
  console.log(" inputTotalBill : "+inputTotalBill.value+" yourOwed : "+yourOwed.value+" Upload NumberofPeople : "+NumberofPeople.value+" Tip : "+tip.value);
  firebase.database().ref('codes/' +genCODE).set({
    inputTotalBill: inputTotalBill,
    yourOwed: yourOwed,
    NumberofPeople: NumberofPeople
  });
}

// get elements
const finalMoney = document.getElementById("finalPay");
// create refeences
const dbfinalMoney = firebase.database().ref().child('code');
//Sync object changes
dbfinalMoney.on('value',snap => console.log(snap.val()));



function writeUserData(userId, name) {
  console.log("working");
  firebase.database().ref('users/' + userId).set({
    username: name,
  });
}


const carList = document.querySelector('#car-list');

function pushcustomer() {

  console.log("test here",email);
  window.alert("Thanks for the update personal details");
  var firstname = document.getElementById("firstname").value;
  var secondname = document.getElementById("secondname").value;
  var phonenumber = document.getElementById("phonenumber").value;
  
  var address = document.getElementById("address").value;
  var birthday = document.getElementById("birthday").value;
  var comment = document.getElementById("comment").value;
  console.log('send data up');
  // Add a new document in collection "cities"
  db.collection("customers").doc(email).set({
      CustomerFirstName: firstname,
      CustomerSecondName: secondname,
      CustomerMobileNumber: phonenumber,
      CustomerEmail: email,
      CustomerAddress: address,
      CustomerBday: birthday,
      CustomerComments: comment
})
      .then(function () {
          console.log("Document successfully written!");
      })
      .catch(function (error) {
          console.error("Error writing document: ", error);
      });

}



 function GenerateACode(length) {
  console.log("Generate a Code");
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  document.getElementById("generatedNumber").innerHTML = result;
  testcode = result;
  return result;
}


function sentCode(){
  var getCode = document.getElementById("inputCode").value;
  console.log(getCode);
  //console.log("test");


}


