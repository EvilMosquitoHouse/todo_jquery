var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({      //defines the schema
    name: {
        type: String,
        required: "name cannot be blank"
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var Todo = mongoose.model("Todo", todoSchema); //compiles the model

module.exports = Todo;                          //exports the model