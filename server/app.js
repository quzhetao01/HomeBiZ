require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const findOrCreate = require("mongoose-findorcreate");

app.use(cors({
  origin: "http://localhost:3000",
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

const uri = "mongodb+srv://quzhetao2001:qhtkYYpELIyB1H0A@homebiz.wu3cek0.mongodb.net/?retryWrites=true&w=majority";
try {
    mongoose.connect(uri);
    console.log("Connected to MongoDB Database");
  } catch (error) {
    console.log(error);
  }



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing"
  },
  category: {
    type: String,
  }
});




userSchema.plugin(passportLocalMongoose); 
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = {User: User};

passport.use(User.createStrategy());


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
  res.set('Cache-Control', 'no-store');
  if (req.isAuthenticated()) {
      res.send({user: req.user, error: null});
  }
  else {
      res.send({user: null, error: "Something went wrong"});
  }
})

app.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { res.send("Error logging out") }
      res.send("Sucessfully logged out")
  });
});

app.get("/user", async (req, res) => {
  if(req.isAuthenticated()) {
    const user = await User.findById(req.user.id)
    res.send(user);
  } else {
    res.send(null);
  }
})

app.get('/test', (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).send("Not authenticated");
  }
})

const listingRouter = require("./routes/listings")
const reviewRouter = require("./routes/review");
const serviceRouter = require("./routes/services");
const uploadRouter = require("./routes/googledrive");
app.use("/listing", listingRouter);
app.use("/review", reviewRouter);
app.use("/service", serviceRouter);
app.use("/images", uploadRouter);

app.listen(8000, () => {
    console.log("Listening on port 8000")
})