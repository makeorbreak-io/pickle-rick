//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var restroomSchema = new mongoose.Schema({
	id: String,
	name: String,
	create_date:{
		type:Date,
		default: Date.now
	},
	totalPoops: Number,
	totalComments: Number,
	totalRates: Number,
	totalFavorites: Number,
	reference: String,
	address: String,
	photoUrl: String,
	rate: Number
})

//Return model
module.exports = restful.model('Restrooms', restroomSchema);