//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var achievementSchema = new mongoose.Schema({
	id: Number,
	name: String,
	img: String,
	description: String
})

//Return model
module.exports = restful.model('Achievement', achievementSchema);