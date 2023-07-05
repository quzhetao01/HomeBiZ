const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = Schema({
    title: String,
    description: String,
    township: String,
    location: String,
    listing: String,
    displayImage: String,
    descriptionImages: Array,
    contact: String,
    whatsapp: Boolean,
    telegram: Boolean,
    email: String,
    category: String,
    menu: [{
        type: Schema.Types.ObjectId,
        ref: "Service"
    }],
    reviews: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Review" 
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

  });

const Listing = mongoose.model('Listing', listingSchema);

module.exports = {Listing: Listing}