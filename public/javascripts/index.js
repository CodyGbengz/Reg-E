$(document).ready( function(){
 console.log('login page');

 $('#creator').click(function(){
     createAnEvent()
 })

 $('#facebookIn').click(function(){
     facebookIn();
 });

 $('#googleIn').click(function(){
     googleIn()
 });

 $('.register').click(function(){
     console.log('regos');
     register();
 });

 $(".dropdown").hover(function() { 
     $(this).addClass('open') 
    },

    function(){ 
        $(this).removeClass('open')
    });

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
       
        console.log(userDetail,"user details");
        
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
    guestList = {};
    var bannerUrl = '';
    $('#banner').change(function(e){
        
        let file = e.target.files[0],
        photoRef = firebase.storage().ref('eventbanners/' + file.name),
        uploadTask = photoRef.put(file);
        uploadTask.on('state_changed',null,null,function(){
            let downloadUrl = uploadTask.snapshot.downloadUrl;
            bannerUrl = downloadUrl;
            console.log(downloadUrl);
        })

        
    });
   
    let myEvent ={eventTitle,eventAddress,eventTime,eventDate,guestCount,guestList,bannerUrl};

    console.log(myEvent);
    
    firebase.database().ref().child('events').push().set(myEvent);
    window.location = '/dashboard';
}; 
    firebase.database().ref().child('events').on('child_added', (snapshot) => {
    let event = snapshot.val(),
    key = snapshot.key;
    console.log(snapshot.key,event);
    addEventToDOM(event,key);
});


function addEventToDOM(event,key){

    if(event.guestList !== undefined){
        const count = Object.keys(event.guestList);
        event.guestCount = count.length;
    }
    else{
        event.guestCount = 0;
    }
    let html = '';
    html += '<div class="col-md-3 col-sm-6 event-card" >';
    html += '<div class="row"><div class="col-md-12 "><a class="" href=""><img class="img-responsive" src="../images/cardimg2.jpg"></a></div></div>';
    html += '<div class="row "><div class="col-md-12"><p><span id="">' + event.eventDate +','+ event.eventTime + '</span></p>';
    html += '<p><b><span id="">' + event.eventTitle.toUpperCase() + '</span></b></p>';
    html += '<p><span id="">'+ event.eventAddress + '</span></p></div></div>';
    html += ' <div class="row"><div class="col-md-8"><p>  #catergory   </p></div><div class="col-md-2"><a href=""><i class="fa fa-user"></i>'+event.guestCount+'</a></div>';
    html += ' <div class="col-md-2"><button class="register btn btn-success " id=' + key + ' type= "button" onclick = "register(this)"></button></div></div></div>';        

    $('#insertEvent').append(html);           
};

function register(param){
    const regDate = new Date,
    date = regDate.toLocaleDateString(),
    time = regDate.toLocaleTimeString(),
    currentuser = firebase.auth().currentUser,
    me = currentuser.displayName
    
     const obj = {me,date,time};
     console.log(obj)
    console.log(param.id)

    firebase.database().ref().child('events/' + param.id + '/guestList').push().set(obj);
}
 
                
                    
                        
                        
                   