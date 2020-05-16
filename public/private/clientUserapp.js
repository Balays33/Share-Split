console.log("client user app ");

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
const getdataForCloud = document.getElementById('getdataForCloud');


// create references
//const dbTransaction = firebase.database().ref("ShareSplit/Transaction");
//const dbGetData = firebase.database().ref("ShareSplit/Transaction/"+getCodeFromUser);


//teststartF();
// if you want to see all of the data from the server
function teststartF(){
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

// get data from the cloud
function pulldata() {
    // get elements
    var xCode = document.getElementById("clientcode").value;
    console.log("Pull data from Cloud, your code : " + xCode);
    // create references
    // const url = 'https://api.darksky.net/forecast/3ad7f8e54c6fdcafbe0dfa539a9ae18c/' + Latitude + ',' + Longitude +'';
    const dbGetData = firebase.database().ref("ShareSplit/Transaction/" + xCode + "");
    SyncCloudData(dbGetData);

}

// update client bill to the cloud
function yourBillupdate() {
    var clientBill = document.getElementById("yourBill").value;
    var xCode = document.getElementById("clientcode").value;
    console.log("client bill : " + clientBill + " euro");

    if (xCode != "????"){
         //  block of code to be executed if the condition is true
        pushClientBill(xCode, clientBill);
        const dbGetData = firebase.database().ref("ShareSplit/Transaction/" + xCode + "");
            SyncCloudData(dbGetData);
            count(xCode);
            SyncCloudData(dbGetData);
    } else {
        //  block of code to be executed if the condition is false
        console.log("Not correct code");
        document.getElementById('notcorrectCode').innerHTML = "Not correct code";
    }
    

}

// Sync cloud data
function SyncCloudData(dbGetData) {
    //Sync object changes
    dbGetData.on('value', snap => {
        getdataForCloud.innerHTML = JSON.stringify(snap.val(), null, 3);
        console.log(snap.val());
    });
}

// update the bill
function pushClientBill(xCode, clientBill) {
    console.log("update the bill " + xCode +" " +clientBill);
    firebase.database().ref('ShareSplit/Transaction/' + xCode).update({
    clientBill: clientBill
    });

    

}

// count how much have to pay the guest 
function count(xCode){
        var finalbill;
        var NumberofPeople;
        var clientBill;
        var mainOwed;
        // on() method
        firebase.database().ref('ShareSplit/Transaction/' + xCode).on('value',(snap)=>{
            //console.log(snap.val().FinalPay);
            finalbill = snap.val().FinalPay;
            NumberofPeople = snap.val().NumberofPeople;
            clientBill = snap.val().clientBill;
            mainOwed = snap.val().mainOwed;
            console.log(finalbill);
        });
        var clientbilltoPAYstep = ((finalbill-mainOwed-clientBill) / NumberofPeople) ;
        var clientbilltoPAY = +clientbilltoPAYstep + +clientBill;
        console.log(clientbilltoPAY)
        document.getElementById('finalPayclient').innerHTML = clientbilltoPAY;

}