var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

var todoRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));           // these two lines allow to access the request body in a put or post request
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));              // this would also work without the __dirname, but only of the app is started from the app's main directory and nowhere else from!

app.get("/", function(req, res){
   res.sendFile("index.html");
});

app.use("/api/todos", todoRoutes);

app.listen(port, function(){
    console.log("More work on port " + port);
});
