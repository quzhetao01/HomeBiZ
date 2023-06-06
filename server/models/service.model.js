const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: String,
    price: String,
});

const Service = mongoose.model("ServiceListing", serviceSchema);

module.exports = {serviceSchema: serviceSchema, Service: Service};