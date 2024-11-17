const mongoose = require("mongoose");
const Product = require("./productModel");

const categorySchema = new mongoose.Schema({
    categoryName: {type: String, require: true, unique: true},
    categoryDescription: {type: String},
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
})

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;