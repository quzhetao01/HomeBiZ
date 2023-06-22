const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: Number,
    description: String,
    created_by_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing"
    },
    
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = {Review: Review}