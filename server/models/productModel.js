const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
    productName: {type: String, require: true},
    productDescription: {type: String},
    amount: {type: Number},
    price: {type: Number}
});

module.exports = Product;