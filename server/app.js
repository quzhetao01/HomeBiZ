require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Listing = require("./models/listing.model.js").Listing;
const User = require("./models/user.model.js").User;
const passport = require("passport");
const session = require("express-session");

app.use(cors({
  origin: ["http://localhost:3000", "https://homebiz.onrender.com"],
  header: ["Content-Type"],
  credentials: true
}))
app.use(express.urlencoded({extended: true, limit:"500mb"}));
app.use(express.json({limit: '500mb'}))
// configuring session middleware
app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize()); // intialising passport
app.use(passport.session()); // configuring passport to make use of session

const uri = process.env.MONGODB_URI;
try {
    mongoose.connect(uri);
    console.log("Connected to MongoDB Database");
  } catch (error) {
    console.log(error);
  }


passport.use(User.createStrategy());


passport.serializeUser(function(user, cb) {
  
  console.log("serailise" + user);
  return cb(null, {id: user.id, username: user.username})
});

// passport.deserializeUser((user, cb) => {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });
passport.deserializeUser(async function(user, cb){

  try {
    // Use Mongoose findById method with async/await to fetch the user by id from the database
    const foundUser = await User.findById(user.id);
    return cb(null, foundUser);
  } catch (err) {
    return cb(err);
  }
})


app.post('/login', passport.authenticate('local', {failureRedirect: '/failureLogin'}), 
(req, res) => {
  res.redirect('/success');
});


app.post('/register', (req, res) => {
  console.log('register');
  console.log(req.body);
  User.register(new User({ username : req.body.username, firstName: req.body.firstName, lastName: req.body.lastName}),
    req.body.password, function(err, user) {
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

app.patch('/addInterest/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  user.category = req.body.category;
  const ans = await user.save();
  res.send(ans);
})

app.get('/failureLogin', (req, res) => {
  console.log("failureLogin");
  res.status(401).send({user: null, error: "Wrong username or password"});
})


app.get('/success', (req, res) => {
  console.log(req.isAuthenticated(), req.user);
  // res.set('Cache-Control', 'no-store');
  if (req.isAuthenticated()) {
      res.send({user: req.user, error: null});
  }
  else {
      res.status(500).send({user: null, error: "Something went wrong"});
  }
})

app.post('/logout', function(req, res, next) {

  if (req.isAuthenticated()) {
    req.logout(function(err) {
      if (err) { res.send("Error logging out") }
        res.send("Sucessfully logged out")
    });
  } else {
    res.status(404).send({ error: "No user is currently logged in" });
  }
});

app.get("/user", async (req, res) => {
  if(req.isAuthenticated()) {
    console.log(req.user);
    const user = await User.findById(req.user.id)
    res.send(user);
  } else {
    console.log(3);
    res.send("No user found");
  }
})

app.get('/test', (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).send("Not authenticated");
  }
})

app.patch('/favourites/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  const listing = await Listing.findById(req.body.id);
  if (user.favourites.includes(listing.id)) {
    return res.status(400).send({ error: "Listing already in favourites"});
  }
  user.favourites.push(listing.id);
  const ans = await user.save();
  res.send(ans);
})


app.patch('/removeFavourites/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  const listing = await Listing.findById(req.body.id);
  if (!user.favourites.includes(listing.id)) {
    return res.status(400).send({ error: "Listing not in favourites"});
  }
  user.favourites.pull( {_id: listing.id} );
  const ans = await user.save();
  res.send(ans);
})

const listingRouter = require("./routes/listings")
const reviewRouter = require("./routes/review");
const serviceRouter = require("./routes/services");
const uploadRouter = require("./routes/googledrive");
app.use("/listing", listingRouter);
app.use("/review", reviewRouter);
app.use("/service", serviceRouter);
app.use("/images", uploadRouter);

module.exports = app;

// app.listen(8000, () => {
//     console.log("Listening on port 8000")
// })