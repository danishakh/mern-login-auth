const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const logger = require("morgan");
const cors = require('cors');
const keys = require("./config/keys.js");
const path = require('path');
const passport = require('passport');


const app = express();
const PORT = process.env.PORT || 3001;
// const MONGO_URI = process.env.MONGO_URI || keys.mongoURI;

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Enable CORS by using it before your routes. This will allow axios to trigger API calls to server port (from a diff port 3000 -> 3001) 
app.use(cors());

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Add routes
app.use(routes);


// Define any API routes before this runs
// Serve up static assets if node env is production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static("client/build"));
	
	// Send every request to the React app (directing the /client/build/index.html file for every request that's not an API request)
	app.get("/", function(req, res) {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}




// Set up promises with mongoose
mongoose.Promise = global.Promise;

//Connect to MongoDB
mongoose.connect(
	process.env.MONGODB_URL || keys.mongoURI,
	{ useNewUrlParser: true }
)

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("mLab MongoDB Connection Established");
});


// Start API Server
app.listen(PORT, () => {
	console.log(`🌎  ==> API Server now listening on PORT ${ PORT }`);
});