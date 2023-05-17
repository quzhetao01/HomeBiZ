require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const findOrCreate = require("mongoose-findorcreate");

app.use(express.urlencoded({extended: true}));
// configuring session middleware
app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize()); // intialising passport
app.use(passport.session()); // configuring passport to make use of session

const uri = "mongodb+srv://quzhetao2001:qhtkYYpELIyB1H0A@homebiz.wu3cek0.mongodb.net/?retryWrites=true&w=majority";
try {
    mongoose.connect(uri);
    console.log("Connected to MongoDB Database");
  } catch (error) {
    console.log(error);
  }



const accountSchema = new mongoose.Schema({
  username: String,
  password: String
});

accountSchema.plugin(passportLocalMongoose); 
accountSchema.plugin(findOrCreate);

const Account = mongoose.model("Account", accountSchema);
passport.use(Account.createStrategy());

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


app.post('/login', passport.authenticate('local', {failureRedirect: '/failureLogin'}), 
(req, res) => {
  res.redirect('/success');
});


app.post('/register', (req, res) => {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
          console.log(err.message);
          return res.send({user: null, error: err.message});
      }

      passport.authenticate('local')(req, res, function () {
          res.redirect('/success');
      });
  });
});

app.get('/failureLogin', (req, res) => {
  res.status(401).send({user: null, error: "Wrong username or password"});
})


app.get('/success', (req, res) => {
  // console.log(req);
  res.set('Cache-Control', 'no-store');
  if (req.isAuthenticated()) {
      res.send({user: req.user, error: null});
  }
  else {
      res.send({user: null, error: "Something went wrong"});
  }
})

app.listen(5000, () => {
    console.log("Listening on port 5000")
})