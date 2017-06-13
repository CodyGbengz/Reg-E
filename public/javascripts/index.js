$(document).ready( function(){
 console.log('login page');

 $('#facebookIn').click(function(){
     facebookIn();
 });

 $('#googleIn').click(function(){
     googleIn();
 })
});

const config ={ 
    apiKey: "AIzaSyDurlINEMU8gwohskeOpfdkYbXWMnao7go",
    authDomain: "reg-e-12eaf.firebaseapp.com",
    databaseURL: "https://reg-e-12eaf.firebaseio.com",
    projectId: "reg-e-12eaf",
    storageBucket: "reg-e-12eaf.appspot.com",
    messagingSenderId: "655255570020"

};
firebase.initializeApp(config);

function googleIn(){
    console.log('google login clicked');
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        let token = result.credential.accessToken,
        user = result.user,
        userDbEntry = {}
        firebase.database().ref().child('users').push().set(userDbEntry);

        window.location = '/dashboard';
    })
    .catch((error) => {

    });
};

function facebookIn(){
    console.log('facebook login clicked');
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        let token = result.credential.accessToken,
        user = result.user,
        userDbEntry = {}
        firebase.database().ref().child('users').push().set(userDbEntry);

        window.location = '/dashboard';
    })
    .catch((error) => {

    });
};
