//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var userAchievementsSchema = new mongoose.Schema({
	userId: String,
	achievementId: Number,
})

//Return model
module.exports = restful.model('userAchievements', userAchievementsSchema);