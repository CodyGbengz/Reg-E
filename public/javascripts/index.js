$(document).ready( function(){
 console.log('login page');

 $('#creator').click(function(){
     createAnEvent()
 })

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
        userDbEntry = {username: user.displayName,
        email: user.email};
        
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
        userDbEntry = {username: user.displayName,
        email: user.email};
   
        firebase.database().ref().child('users').push().set(userDbEntry);
        window.location = '/dashboard';
    })
    .catch((error) => {

    });
};


function createAnEvent(){
    let eventTitle = $('#title').val(),
    eventAddress = $('#address').val(),
    eventDate = $('#date').val(),
    eventTime = $('#time').val(),
    guestCount = 0,
    guestList = {
        guest:{username:'user', date:'date', time:'time'}
    },
    myEvent ={eventTitle,eventAddress,eventTime,eventDate,guestCount,guestList};

    console.log(myEvent);
    
    firebase.database().ref().child('events').push().set(myEvent);
    window.location = '/dashboard';
}; 

    $('#banner').change(function(e){
        let file = e.target.file[0];
        firebase.storage().ref('eventbanners' + file.name).put(file);
        
    });


firebase.database().ref().child('events').on('child_added', (snapshot) => {
    let event = snapshot.val();
    addEventToDOM(event);
});


function addEventToDOM(event){
    let html = '';
    html += '<div class="col-md-3 col-sm-6 event-card">';
    html += '<div class="row"><div class="col-md-12 "><a class="" href=""><img class="img-responsive" src="../images/cardimg2.jpg"></a></div></div>';
    html += '<div class="row "><div class="col-md-12"><p><span id="">' + event.eventDate +','+ event.eventTime + '</span></p>';
    html += '<p><b><span id="">' + event.eventTitle.toUpperCase() + '</span></b></p>';
    html += '<p><span id="">'+ event.eventAddress + '</span></p></div></div>';
    html += ' <div class="row"><div class="col-md-8"><p>  #catergory   </p></div><div class="col-md-2"><a href=""><i class="fa fa-user"></i></a></div>';
    html += ' <div class="col-md-2"><a href=""><i class="fa fa-check"></i></a></div></div></div>';        

    $('#insertEvent').append(html);           
};
 
                
                    
                        
                        
                   