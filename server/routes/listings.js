const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.model.js").Listing;
const Service = require("../models/service.model.js").Service;
const Review = require("../models/review.model.js").Review;

const getAllListings = async (req, res, next) => {
    const found = await Listing.find({}).populate("menu");
    res.send(found);
}

const createListing = async (req, res, next) => {
    console.log(req.body);
    const listing = req.body;
    listing.user = req.user.id;
    const menu = [];
    try {

        for (let service in listing.menu) {
            const newService = new Service(listing.menu[service]);
            const saved = await newService.save();
            menu.push(saved._id)
        }
        listing.menu = menu;

        // const newService = new Service(listing.menu[0]);
        // const ans = await newService.save();
        const newListing = new Listing(listing);
        const ans = await newListing.save();
        res.send(ans);
    } catch (err) {
        console.log(err);
    }
}

const getListingById = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id).populate("menu");
    res.send(listing);
}

const editListing = async (req, res, next) => {

    console.log("hi", req.query)
    if (req.query.review) {
        console.log("here")
        const listing = await Listing.findById(req.params.id);
        const review = req.body;
        review.user = req.user.id;
        const newReview = new Review(review);
        const saved = await newReview.save();
        listing.reviews.push(saved._id);
        const ans = await listing.save();
        res.send(ans);
    }
}

router.route('/')
    .get(getAllListings)
    .post(createListing);

router.route('/:id')
    .get(getListingById)
    .patch(editListing);
module.exports = router;