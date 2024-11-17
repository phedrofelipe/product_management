const mongoose = require("mongoose");
const Category = require("./categoryModel.js");

const productSchema = new mongoose.Schema({
    productName: {type: String, require: true, unique: true},
    productDescription: {type: String},
    amount: {type: Number, require: true},
    price: {type: Number, require: true},
    categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;