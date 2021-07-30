const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	Fname: String,
	Lname: String,
	Email: String,
	Phone: Number,
	Username: String,
	Password: String
});
const User = mongoose.model('user',UserSchema);
module.exports = User;