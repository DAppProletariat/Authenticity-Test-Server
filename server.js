// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require(‘express’);        // call express
var app        = express();                 // define our app using express
var bodyParser = require(‘body-parser’);
var http = require('http');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get(‘/test’, function(req, res) {
    console.log(req.query.id);
   res.json({ message: ‘hooray! welcome to our api!’ });  
});

router.get(‘/update’, function(req, res) {
    updateFBIMostWanted();
});

// more routes for our API will happen here
    
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(‘/api’, router);
// localhost:8080/api/test -> above function

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(‘Magic happens on port ’ + port);

function updateFBIMostWanted(){
    https.get('https://api.fbi.gov/wanted/v1/list', (resp) => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
}