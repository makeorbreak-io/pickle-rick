//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var restroomBadgeSchema = new mongoose.Schema({
	userId: String,
	restroomId: String,
	badge: Number //1- confort, 2- privacy, 3- clean
})

//Return model
module.exports = restful.model('restroomBadgeSchema', restroomBadgeSchema);