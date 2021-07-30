//mongodb+srv://Pawan:<password>@cluster0.tr7p6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportLocalMongoose =require('passport-local-mongoose');
//const User = require("./models/user");
//const Task = require("./models/task");
const port = process.env.PORT || 3000;

const DB = 'mongodb+srv://Pawan:Pawan123@cluster0.tr7p6.mongodb.net/LMS?retryWrites=true&w=majority';
mongoose.connect(DB,{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify:false
}).then(()=>{
	console.log("Connection to database established");
}).catch((err)=>console.log("Could not connect to database"));

const app = express();
app.use('/assets',express.static('assets'));
app.use('/videos',express.static('videos'));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(require('express-session')({
	secret: "This is a secret?",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//DataSchema
const UserSchema1 = new mongoose.Schema({
	Fname: String,
	Lname: String,
	Email: String,
	Phone: Number,
	Username: String,
	Password: String
});
const User = mongoose.model('User',UserSchema1);


var signedUp =false;

//Now we need to write the routes. When user clicks one of the nav links these routes must come
app.get('/',function(req,res){
	res.render("home");
});
app.get('/home',function(req,res){
	res.render("home");
});
app.get('/SignUp',function(req,res){
	res.render('SignUp');
});
app.post('/SignUp',function(req,res){
	// get data from the view and add it to mongodb
	var user_data
	var Fname = req.body.Fname;
	var Lname = req.body.Lname;
	var Email = req.body.Email;
	var Phone = req.body.Phone;
	var Username = req.body.Username;
	var Password = req.body.Password;
	var user_data1 = {
		"Fname": Fname,
		"Lname": Lname,
		"Email": Email,
		"Phone": Phone,
		"Username": Username,
		"Password": Password
	}
	var user_data = User({
		"Fname": Fname,
		"Lname": Lname,
		"Email": Email,
		"Phone": Phone,
		"Username": Username,
		"Password": Password
	}).save(function(err){
		if(err) throw err;
	});
	console.log("User data saved");
	res.render('Dashboard',{data:user_data1});
});
app.get('/Dashboard',function(req,res){
	//we need to get data fromm Mongo and send to the view
	signedUp==true;
	if(signedUp===true){
		User.find({},function(err,data){
			if (err) throw err;
			res.render('Dashboard');
		});
	}else{
		console.log('You need to be signed in to access this');
		app.get('/home',function(req,res){
			res.render("home");
		});
	}
});
app.post('/Dashboard',function(req,res){
	res.render('Dashboard');
});
app.get('/TaskManager',function(req,res){
	res.render('TaskManager');
});
app.get('/CoursePage',function(req,res){
	res.render('CoursePage');
});
app.get('/logout',function(req,res){
	req.logout();
	res.redirect('/');
	console.log("You have been logged out");
});

app.listen(port,function(){
	console.log("Server listening to port 3000");
});





