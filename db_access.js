// Firebase authentication info
firebase.initializeApp({
    apiKey: "AIzaSyCPj531s2dFYG8iDslbg6s38HH9XvlXFD0",
    authDomain: "poolparty-9f325.firebaseapp.com",
    databaseURL: "https://poolparty-9f325.firebaseio.com",
    projectId: "poolparty-9f325",
    storageBucket: "poolparty-9f325.appspot.com",
    messagingSenderId: "964598333927",
    appId: "1:964598333927:web:7d2fda41e5f2dcd3"
});

var db = firebase.firestore();

/**
 * Get user data from the username
 * 
 * @param {*} username Account username of the user
 */
function getUserData(username) {
    db.collection("Users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().username == username) {
                console.log(doc.data());
                return doc.data();
            }
        })
    })

    return undefined;
}

/**
 * Add a new user into the user database
 * 
 * @param {*} em Email Address of the user
 * @param {*} nm Full name of the user
 * @param {*} nu Phone Number of the user
 * @param {*} pss Account Password of the user
 * @param {*} usr Account username of the user
 */
function addNewUser(em, nm, nu, pss, usr) {
    if(em == undefined || nm == undefined || pss == undefined || usr == undefined || nu == undefined)
        return 'ERROR: Invalid fields';
    
    if(getUserData(usr) == undefined)
        return 'ERROR: Username already exists';

    var jsonData = {
        email: em,
        name: nm,
        number: nu,
        password: pss,
        username: usr
    };

    db.collection("users").add(jsonData)
    .then(function(docRef) {

        console.log("New Document: " + docRef.id);
        return 'SUCCESS';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        return 'ERROR: ' + error;
    });
}

function test_data() {
    getData('test_username');
}