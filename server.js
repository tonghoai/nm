// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

//var server   = require('http').Server(app);

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

//var fs           = require('fs');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.use(express.static('./public'));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'encode69' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
var server = app.listen(port);
var io = require("socket.io").listen(server);

console.log('Used Port ' + port);

// var Schema = mongoose.Schema({
//   user_id: String,
//   username: String,
//   nickname: String,
//   msg    : String,
//   time   : String
// });
//
// var chat = mongoose.model('chat', Schema);
var chat = require("./app/models/chat");

// Bien who de ho tro trong viec hien thi ten nguoi chat
var who;

// Client connected
io.on("connection", function(socket){

  console.log("Had a connection!");

  // Server send messages to client in first connecting
  var sdata = require("./app/models/chat");
  sdata.find({}).sort({time: -1}).limit(30).exec(function(err, data){
    socket.emit("send-msg-to-client", data);
  });

  // Server on client typing and send it to another client
  socket.on("send-typing-to-server", function(data){
    socket.broadcast.emit("send-typing-to-client", data);
  })

  // Server on client send messages
  socket.on("send-msg-to-server", function(data){
    new chat({
      user_id    : data.user_id,
      username   : data.nickname,
      nickname   : data.nickname,
      email      : data.email,
      msg        : data.msg,
      sticker    : data.sticker,
      pic        : data.pic,
      time       : new Date().getTime()
    }).save(function(err, docs){
      if(err) res.json(err);
      else    console.log("Insert Successfully");
    });

    if(who == data.user_id){
      data.true = '1';
    } else {
      data.true = '0';
    }

    socket.broadcast.emit("forward-msg-to-client", data);

    who = data.user_id;

    console.log(data);
  });
});
