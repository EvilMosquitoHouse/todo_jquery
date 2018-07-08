var express = require("express");
var router = express.Router();
var db = require("../models");              //back out one layer, then go into models. the index file will be taken by default
var helpers = require("../helpers/todos");


router.route("/")
    .get(helpers.getTodos)
    .post(helpers.createTodo);

router.route("/:todoId")
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);

module.exports = router;