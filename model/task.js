var mongoose = require('mongoose')
var Schema = mongoose.Schema;
//this is us defining how our data is going to look like in the database
let TaskSchema = new Schema({
	"taskName": String,
	"time": String,
	"description": String,
	"isCompleted": Boolean,
	"reminderTime": String
})

//since we have defined our database structure for task, we need to export it so as to make it available for use in other files in our code

module.exports = mongoose.model('Task', TaskSchema)