//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./server/routes/route');

//connect to DB
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to database')
});

mongoose.connection.on('error',(err)=>{
    if(err)
        console.log('Error in DB Connection ' + err);
});

//port no
const port = 3000;

//adding middleware - cors
app.use(cors());

//body-parse
app.use(bodyParser.json());

//static files
app.use(express.static(path.join(__dirname,'public')));
//route
app.use('/api',route);

//testing server
app.get('/',(req,res)=>{
    res.send("hello");
});

app.listen(port,()=>{
    console.log("url http://localhost:3000");
});