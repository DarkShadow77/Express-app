var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var port = process.env.PORT || 3000 

var port = 3000 || process.env.port


var mongoose = require('mongoose')  // this is the same as var mongoose = require('mongoose')


const uri = "mongodb+srv://Dark_Shadow:123123Merry@expressapp-2gnjk.mongodb.net/test?retryWrites=true";

var options = {
	reconnectTries : Number.MAX_VALUE,
	poolSize : 10
}

mongoose.connect(uri, options)
.then( () => {console.log("connection established") },
   err => { console.log("Connection error due to: ",err) }
 );

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



//import database model
var Login = require('./model/login')
var SignUp = require('./model/signup')
var Task = require('./model/task')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())




//we need to to provide route for our application
//the user will post data to the server when signing up so we need to use a post method
app.post('/signup', function(req, res){
	//i'm expecting data from a form from the server so i will use a bodule called Body Parser to achieve that.
	var signupData = req.body

	// then save the data inside my databse
	var saveSignUpData = new SignUp(req.body)  // this create a new model from our database model
	saveSignUpData.save(function (err, dataSignUp){   // this save to the SignUp collection
		if(err){ res.json(err)}
		else{
			var saveLoginData = new Login({ username : req.body.username, password : req.body.password})

			saveLoginData.save(function(err, data){  // if signup save is successful, it saves to the login collection
				if(err) { res.json(err)}
				else{ res.json(dataSignUp)} // this sends the data that is saved to the signup collection to the user
			})
		}
	})
})



//handle login route
//this is also going to be a post method because it is going to send data to the server
app.post('/login', function(req, res){
	//extract the data that is coming in from your response
	var loginData = req.body

	// check if the login credentials is correct in your database
	Login.find({username: req.body.username, password: req.body.password}, function(err, data){
		if(err){ res.json(err)}
		else{ 
			console.log(data)
			if(data[0]){
				res.json(data[0])
			}
			else{
				res.json({
					text: "User doeas not exist"
				})
			}
			
		}
	})

})


//handle the route for posting task
app.post('/task', function(req, res){
	var taskData = req.body

	//save task to the database
	var saveTaskData = new Task(req.body)
	saveTaskData.save((err, data) => {
		if(err){ res.json(err)}
			else{ res.json(data)}
	})
})


//route to update the task if it is completed
app.patch('/update/:taskId', function(req, res){
	//get the data from the request
	var update = req.body
	//update your database
	Task.findByIdAndUpdate(req.params.taskId, update, function(err, data){
		if(err){ res.json(err)}
		else{ res.json(data)}
	})
})


//handle the delete task route
app.delete('/delete/:taskId', function(req, res){
	//if i want to delete a task i need to know which task to delete. thats why i need the task id
	//get the task id
	var taskID = req.params.taskId  // the req.params is made available to me for use by the body parser module.

	//search for the task in the database using its id and delete if found
	Task.findByIdAndRemove(taskID, function(err){
		if(err){ res.json(err)}
		else{ res.json({
			text: " task deleted."})}
	})
})


//handle logout route
app.get('/logout', function(req, res){
	res.json({
		text: "Log out successful."})
})

app.get('/all_task', function(req, res){
	Task.find({}, function (err,data){
		if(err){res.json({err})}
		else{
			res.json(data)
		}
	})
})

app.listen(port, function(){ console.log(`Server started at port ${port}`)})