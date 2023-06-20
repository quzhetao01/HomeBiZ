const mongoose = require('mongoose');
const serviceSchema = require('./service.model').serviceSchema;
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    township: String,
    location: String,
    listing: String,
    displayImage: String,
    descriptionImages: Array,
    contact: String,
    contactMethod: String,
    email: String,
    category: String,
    menu: [{
        type: Schema.Types.ObjectId,
        ref: "Service"
    }]
  });

const Listing = mongoose.model('Listing', listingSchema);

module.exports = {Listing: Listing}