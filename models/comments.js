//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var commentSchema = new mongoose.Schema({
	idUser: String,
	nameUser: String,
	idRestroom: String,
	commentDescription: String
})

//Return model
module.exports = restful.model('comments', commentSchema);