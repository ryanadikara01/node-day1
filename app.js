var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
var session = require("express-session");
var mylogger = require("./middlewares/logger");
var iptracker = require("./middlewares/iptracker");
//var classes = require("./routes/classes");




// Include all routes
var indexRouter = require("./routes/index");
var classRouter = require("./routes/classes");

// Create Express instance
var app = express();

// Middlewares  
//pindah ke folder sendiri 


app.use(mylogger);  

app.use(logger("dev"));   //pakai use semua dihandle
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: "s3cre7", resave: false, saveUninitialized: true}));


// Registering routes

app.use("/",classRouter);

// app.use("/", indexRouter);
app.get("/hello", (req, res) => {
    res.send("Hello World requested at " + req.logTime);
});

app.get("/session", (req, res) => {
	req.session.username = "ryanadikara";
	res.send("Session set");
	// delete req.session.username; 
});

app.post("/session", (req, res) => {
	res.send(req.session.username);
});

app.get("/employees", (req, res, next) => {
	let employees = ["Ujang", "Maman", "Dadang"];
	res.send(employees);
});

app.get("/fo*", (req, res, next) => {
	res.send(req.url);
});

app.get("/[A-Za-z*]{1,3}", (req, res, next) => {
	res.send(req.url);
});


//--
app.get("/hotels/price/:min(\\d{1,16})-:max(\\d{1,16})", (req, res) => {
	let min = req.params.min;
	let max = req.params.max;
	res.send(`Displaying all hotels with price between ${min} and ${max}`);
});

app.get("/banks/:kodeCabang(\\d{1,3}):nip(\\d{1,8})", (req, res) => {
	res.send(req.params);
});

// 404 Handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.send({ msg: err.message || "error" });
});

module.exports = app;