//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var restroomBadgeSchema = new mongoose.Schema({
	idUser: String,
	idRestroom: String,
	badge: Number //1- privacy, 2- confort, 3- clean
})

//Return model
module.exports = restful.model('restroomBadgeSchema', restroomBadgeSchema);