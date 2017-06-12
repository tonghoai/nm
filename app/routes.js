// app/routes.js
var mongoose = require('mongoose');

var peo      = require('../app/models/user');
// define the schema for our user model
// var userSchema2 = mongoose.Schema({
//   local :{
//     nickname: String,
//     username: String,
//     email: String,
//     password: String
//   }
// });

module.exports = function(app, passport) {
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        if (req.isAuthenticated()){
          res.redirect('/profile')
        } else {
          res.render('index.ejs'); // load the index.ejs file
        }
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // =====================================
    // CHAT ===============================
    // =====================================
    // get chat form chat
    app.get('/chat', isLoggedIn, function(req, res){

      //var peo = mongoose.model('user', userSchema2);
      peo.findOne({_id: req.user._id}).exec(function(err, data){
        //console.log(data.local.email);
        // set session nickname when access
        req.session.nickname = data.local.nickname;
        //console.log(req.session.nickname);
        // render chat page
        res.render('chat', {
            nickname: req.session.nickname,
            user : req.user // get the user out of session and pass to template
        });
      });
    })

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            nickname : req.session.nickname,
            user     : req.user // get the user out of session and pass to template
        });
    });

    // app.get('/ok', function(req, res){
    //   var id = req.session.passport.user;
    //   console.log(id);
    // })

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/chat', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/chat', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
