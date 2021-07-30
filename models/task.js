const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	Description: String,
	Completed: Boolean,
	Deadline: Date
});
const Task = mongoose.model('task',TaskSchema);
module.exports = Task;