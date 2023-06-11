require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const findOrCreate = require("mongoose-findorcreate");

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(express.urlencoded({extended: true}));
app.use(express.json())
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
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});




accountSchema.plugin(passportLocalMongoose); 
accountSchema.plugin(findOrCreate);

const Account = mongoose.model("Account", accountSchema);

passport.use(Account.createStrategy());

// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(function() {
    return cb(null, user);
  });
});


app.post('/login', passport.authenticate('local', {failureRedirect: '/failureLogin'}), 
(req, res) => {
  res.redirect('/success');
});


app.post('/register', (req, res) => {
  console.log('register');
  console.log(req.body);
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
          console.log(err.message);
          return res.send({user: null, error: err.message});
      }
      passport.authenticate('local')(req, res, function () {
        console.log("success");
          res.redirect('/success');
      });
  });
});

app.get('/failureLogin', (req, res) => {
  console.log("failureLogin");
  res.status(401).send({user: null, error: "Wrong username or password"});
})


app.get('/success', (req, res) => {
  console.log(req.isAuthenticated(), req.user);
  res.set('Cache-Control', 'no-store');
  if (req.isAuthenticated()) {
      res.send({user: req.user, error: null});
  }
  else {
      res.send({user: null, error: "Something went wrong"});
  }
})

app.get('/test', (req, res) => {
  console.log(req.user);
  console.log(req.isAuthenticated());
  // res.json(1);
  res.send(req.user);
})

const listingRouter = require("./routes/listings")
app.use("/listing", listingRouter);

app.listen(8000, () => {
    console.log("Listening on port 8000")
})