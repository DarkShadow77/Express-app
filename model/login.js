var mongoose = require('mongoose')
var Schema = mongoose.Schema;

let loginSchema = new Schema({
	"username" : String,
	"password": String
})

module.exports = mongoose.model("Login", loginSchema)