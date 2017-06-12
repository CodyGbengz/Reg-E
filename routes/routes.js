const express = require('express'),
router = express.Router();

//get homepage route
router.get('/', (req,res,next) => {
    console.log('index route');
    res.send('index');
    (next);
});

//set up error handlers
router.use((err,req,res,next) => {
    console.log('unhandled error detected: ' + err.message );
    res.send('500 - server error');
});

router.use((req,res) => {
    console.log('route not handled');
    res.send('404 - not found');
});

module.exports = router;