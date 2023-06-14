const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.model.js").Listing;
const Service = require("../models/service.model.js").Service;

const getAllListings = async (req, res, next) => {
    const found = await Listing.find({}).populate("menu");
    res.send(found);
}

const createListing = async (req, res, next) => {
    console.log(req.body);
    const listing = req.body;
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
    const listing = await Listing.findById(req.params.id);
    res.send(listing);
}

const editListing = async (req, res, next) => {
    const updatedListing = req.body;
}

router.route('/')
    .get(getAllListings)
    .post(createListing);

router.route('/:id')
    .get(getListingById);
module.exports = router;