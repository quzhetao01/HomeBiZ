const mongoose = require('mongoose');
const serviceSchema = require('./service.model').serviceSchema;
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    displayImage: String,
    descriptionImage: String,
    contact: String,
    email: String,
    menu: [{
        type: Schema.Types.ObjectId,
        ref: "Service"
    }]
  });

const Listing = mongoose.model('Listing', listingSchema);

module.exports = {Listing: Listing}