const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    email: {
        type: String,
        required: true, 
    },
    product: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = { Purchase };