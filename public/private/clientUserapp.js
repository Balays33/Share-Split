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
const Transaction = document.getElementById('Transaction');
const getdataForCloud = document.getElementById('getdataForCloud');


// create references
const dbTransaction = firebase.database().ref("ShareSplit/Transaction");
//const dbGetData = firebase.database().ref("ShareSplit/Transaction/"+getCodeFromUser);


//Sync object changes
dbTransaction.on('value', snap => {
    Transaction.innerHTML = JSON.stringify(snap.val(), null, 3);
    console.log(snap.val());
});

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


    pushClientBill(xCode, clientBill);
    const dbGetData = firebase.database().ref("ShareSplit/Transaction/" + xCode + "");
    SyncCloudData(dbGetData);

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
    console.log("update the bill" + xCode + clientBill);
    //firebase.database().ref('ShareSplit/Transaction/' + xCode).set({
    //clientBill: clientBill
    //});

    // A post entry.
    var postData = {
        author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture
        
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('ShareSplit/Transaction/' + xCode).push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    

    return firebase.database().ref().update(updates);

}