require("dotenv").config();require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");

const uri = "mongodb+srv://quzhetao2001:qhtkYYpELIyB1H0A@homebiz.wu3cek0.mongodb.net/?retryWrites=true&w=majority";
try {
    mongoose.connect(uri);
    console.log("Connected to MongoDB Database");
  } catch (error) {
    console.log(error);
  }

app.use(express.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log("Listening on port 5000")
})