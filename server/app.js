require("dotenv").config();require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");

app.use(express.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log("Listening on port 5000")
})