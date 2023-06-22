const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: String,
    price: String,
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing"
      },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = {serviceSchema: serviceSchema, Service: Service};