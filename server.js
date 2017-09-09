
//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//MongoDB
mongoose.connect('mongodb://192.168.1.49/rest_test', {
	useMongoClient: true,
});

//Express
var app = express();
app.use(express.static(__dirname+'/client'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Routes
app.use('/api', require('./routes/api'));

//Start server
app.listen(3000);
console.log('API listening port 3000');