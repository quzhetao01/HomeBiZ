const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.model.js").Listing;
const Service = require("../models/service.model.js").Service;
const Review = require("../models/review.model.js").Review;

const getReviews = async(req, res, next) => {
    const found = await Review.find({listing: req.params.listing_id});
    console.log(found);
    res.send(found);
}

router.get("/:listing_id", getReviews);

module.exports = router;
