const express = require('express');
const app = express();                 // define our app using express
const fileUpload = require('express-fileupload');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

//configure session management using a file-based schema
const cookie = { secure: false, httpOnly: false };
app.use(session({
   store: new FileStore({ path: './session', ttl: 86400 }),
   secret: "super secret hash",
   resave: false,
   saveUninitialized: false,
   cookie: cookie
}));

 // ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 

// test route to make sure everything is working 
router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
 });

 // REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//configure listening port
const port = process.env.PORT || 8080;

//configure release / debug settings
const runtime_mode = (process.env.mode === "release" ? "release" : "debug");
if (runtime_mode === "debug") {
   console.log("running in debug mode.");
}

//configure CORS from react (not safe for production)
app.use((req, res, next) => {

    if (runtime_mode === "debug") {
       const origin = req.get('origin');
       res.header('Access-Control-Allow-Origin', origin);
    }
 
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
 
    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
       res.sendStatus(204);
    } else {
       next();
    }
 });

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on port ' + port);