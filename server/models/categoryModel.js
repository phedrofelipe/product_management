const mongoose = require("mongoose");

const Category = mongoose.model("Category", {
    categoryName: {type: String, require: true, unique: true},
    categoryDescription: {type: String}
});

module.exports = Category;