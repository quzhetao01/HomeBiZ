const express = require('express');
const router = express.Router();
const Service = require("../models/service.model.js").Service;

const addService = async (req, res, next) => {
    try {
        const service = req.body;
        const newService = new Service(service);
        const saved = await newService.save();
        res.send(saved);

    } catch (err) {
        console.log(err);
        next(err);
    }
}

// const deleteService = async (req, res, next) => {

// }

router.post("/:listing_id", addService);

// router.delete("/:id", deleteService);

module.exports = router;
