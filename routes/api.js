
//Dependencies
var express = require('express');
var router = express.Router();

//Models
var User = require('../models/user');
var Restroom = require('../models/restroom');
var Achievement = require('../models/achievement');
var userAchievements = require('../models/userAchievements');
var Rating = require('../models/rating');
var restroomBadges = require('../models/restroomBadges');

//Routes
User.methods(['get', 'put', 'post', 'delete']);
User.register(router, '/users');

Restroom.methods(['get', 'put', 'post', 'delete']);
Restroom.register(router, '/restrooms');

Achievement.methods(['get', 'put', 'post', 'delete']);
Achievement.register(router, '/achievements');

userAchievements.methods(['get', 'put', 'post', 'delete']);
userAchievements.register(router, '/userAchievements');

Rating.methods(['get', 'put', 'post', 'delete']);
Rating.register(router, '/ratings');

restroomBadges.methods(['get', 'put', 'post', 'delete']);
restroomBadges.register(router, '/restroomBadges');


//Return router
module.exports = router;