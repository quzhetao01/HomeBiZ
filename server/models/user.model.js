const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");


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
    },
    favourites: [{
      type: Schema.Types.ObjectId,
      ref: "Listing"
    }]
});

userSchema.plugin(passportLocalMongoose); 
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = {User: User};
