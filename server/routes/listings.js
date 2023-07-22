const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Listing = require("../models/listing.model.js").Listing;
const Service = require("../models/service.model.js").Service;
const Review = require("../models/review.model.js").Review;
const User = require("../app.js").User;

const getAllListings = async (req, res, next) => {
    const found = await Listing.find({}).populate("reviews");
    res.send(found);
}

const createListing = async (req, res, next) => {
    // console.log(req.body);
    const listing = req.body;
    listing.user = req.user.id;
    const creator = await User.findById(req.user.id);
    const menu = [];
    try {

        for (let service in listing.menu) {
            console.log(listing.menu[service]);
            const newService = new Service(listing.menu[service]);
            const saved = await newService.save();
            menu.push(saved._id)
        }
        listing.menu = menu;
        listing.created_on = new Date();

        // const newService = new Service(listing.menu[0]);
        // const ans = await newService.save();
        const newListing = new Listing(listing);
        const ans = await newListing.save();
        creator.listing = ans.id;
        await creator.save();
        res.send(ans);
    } catch (err) {
        console.log(err);
    }
}

const getListingById = async (req, res, next) => {
    if (req.params.id === "self") {
        const listing = await Listing.find({ user: req.user.id}).populate("menu").populate("user").populate({
            path: "reviews",
            populate: {
                path: "created_by_id",
                model: "User",
            }
        });;
        res.send({listing: listing[0], self: true});
    } else {
        const listing = await Listing.findById(req.params.id).populate("menu").populate("user").populate({
            path: "reviews",
            populate: {
                path: "created_by_id",
                model: "User",
            }
        });
        res.send({listing: listing, self: listing.user === req.user.id});
    }
}

const getMultipleListingsById = async (req, res, next) => {
    console.log(req.query.favouritesArray);
    const idArray = req.query.favouritesArray;
    const found = await Listing.find({ _id: {$in: idArray}}).populate("reviews");
    res.send(found);
}

const getListingByCategory = async (req, res, next) => {
    const listing = await Listing.find({category: req.params.category}).populate("reviews");
    res.send(listing);
}

const getListingBySearch = async (req, res, next) => {
    const listing = await Listing.find({
        $or: [
            { title: new RegExp(req.params.searchQuery, 'i') },
            { township: new RegExp(req.params.searchQuery, 'i') },
            { location: new RegExp(req.params.searchQuery, 'i') },
            // { description: new RegExp(req.params.searchQuery, 'i') },
            // { category: new RegExp(req.params.searchQuery, 'i') },
        ]
    });
    res.send(listing);
}

const editListing = async (req, res, next) => {

    console.log("hi", req.query)
    if (req.query.review) {
        console.log("here")
        const listing = await Listing.findById(req.params.id);
        const review = req.body;
        review.created_by_id = req.user.id;
        const newReview = new Review(review);
        const saved = await newReview.save();
        listing.reviews.push(saved._id);
        const ans = await listing.save();
        res.send(ans);
    } else {
        console.log("Editing for reals")
        console.log(req.body)
        const listing = await Listing.findByIdAndUpdate(req.params.id, req.body);
        res.send(listing);
    }
}

const getNewListings = async (req, res, next) => {
    console.log("new", req.user);
    const today = new Date();
    const limit = new Date();
    limit.setDate(today.getDate() - 21);
    try {
        
        const user = await User.findById(req.user.id);
        const ans = await Listing.find({
            created_on: {
                $lt: today,
                $gte: limit,
            },
            category: user.category
        });
        res.send(ans);
    } catch (err) {
        console.log(err);
    }
}

const deleteListing = async (req, res) => {
    try {
        const result = await Listing.deleteOne({_id: req.params.id});
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something wrong happened when deleting listing")
    }
}


router.route('/')
    .get(getAllListings)
    .post(createListing);

router.route('/:id')
    .get(getListingById)
    .patch(editListing)
    .delete(deleteListing);

router.route('/saved/savedListings')
    .get(getMultipleListingsById);

router.route('/category/:category')
    .get(getListingByCategory);

router.route('/search/:searchQuery')
    .get(getListingBySearch);

router.route('/explore/newListings')
    .get(getNewListings)


module.exports = router;