var mongoose = require('mongoose')
var Schema = mongoose.Schema;

let signupSchema = new Schema({
	"firstName" : String,
	"lastName": String,
	"userName" : String,
	"password": String,
	"bio": String,
	"email": String,
	"gender": String,
	"phoneNumber": Number,
	"address": String,
	"state": String
})


module.exports = mongoose.model("SignUp", signupSchema)