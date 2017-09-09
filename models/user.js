//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var userSchema = new mongoose.Schema({
	id: Number,
	username: String,
	name: String,
	create_date:{
		type:Date,
		default: Date.now
	},
	detailsPoop:{
		totalPoops: Number,
		totalComments: Number,
		totalRates: Number
	}
})

//Return model
module.exports = restful.model('Users', userSchema);