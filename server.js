var express=require('express');
var http=require('http');
var path=require('path');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var cors=require(cors);


var config=require('./config');
var userRoute=require('./routes/user.route');

//connect to mongodb

mongoose.connect(config.dbUrl);

mongoose.connection.on("connected",()=>{
    console.log("connected to mongo database");
});

mongoose.connection.on("error",err=>{
    console.log("erroer"+err);
});


var port=3000;

var app=express();

app.use(cors());
//add middleware for bodyParsor.json() to read request body as json
// also set users to define custome route
//add middleware
app.use(bodyParser.json());

//if you want to call register or login api you need to add  /users before that
//when you add middleware it always execute before hit the router methods like reister or login
//app.use('/users',userRoute);
app.use('/users',userRoute);

//set public resource folder

app.use(express.static(__dirname+"/public"));
//create your first route

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/index.html"));
});

/*Create first request

app.get('/',(req,res)=>{
    res.send('Hello world....');
});*/

var server=http.createServer(app);
server.listen(port,()=>{
console.log("Server is starting :"+port)
});
