//the index file in models is by default always run. 

var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect("mongodb://cleweling:Badmogihouse3@ds131601.mlab.com:31601/todo_prod");

//mongoose.connect('mongodb://localhost/todos-api');

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');