//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var ratingSchema = new mongoose.Schema({
	idUser: String,
	idRestroom: String,
	rate: Number,
	badges:{
		clean: Boolean,
		privacy: Boolean,
		confort: Boolean
	},
	comment: String
})

//Return model
module.exports = restful.model('Ratings', ratingSchema);