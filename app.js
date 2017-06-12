const express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
favicon = require('serve-favicon'),
firebase = require('firebase');

const port = process.env.PORT || 8080;


const app = express();

// set up EJS as views engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//set up middleware
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req,res) =>{
    res.send('hello bitches');
})
app.listen(port, () => {
    console.log('Action live on ' + port);
});