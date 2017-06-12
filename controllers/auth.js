const firebase = require('firebase');
const config ={ 
    apiKey: "AIzaSyDurlINEMU8gwohskeOpfdkYbXWMnao7go",
    authDomain: "reg-e-12eaf.firebaseapp.com",
    databaseURL: "https://reg-e-12eaf.firebaseio.com",
    projectId: "reg-e-12eaf",
    storageBucket: "reg-e-12eaf.appspot.com",
    messagingSenderId: "655255570020"

};

firebase.initializeApp(config);

module.exports.signUp = (req,res,next) =>{
    let email = req.body.email,
    password = req.body.password;
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((user) => {
        //do some db things
        res.redirect('/dashboard');
    })
    .catch((err) => {
        console.log(error.message);
        res.redirect('/');
    })
}

module.exports.signIn = (req,res,next) => {
    let email = req.body.email,
    password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((user) => {
        console.log(user);
        res.redirect('/dashboard');
    })
    .catch((err) => {
        let errorMessage = err.message
        console.log(errorMessage);
        res.render('/',{error:errorMessage});
    });
};

module.exports.signOut = (req,res) => {
    firebase.signOut()
    .then((user) => {
        res.redirect('/');
    })
    .catch((err) => {
        let errorMessage = err.message
        console.log(errorMessage);
        res.render('/dashboard', {error:errorMessage})
    });
};