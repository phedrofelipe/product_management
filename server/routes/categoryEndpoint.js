const express = require("express");
const Category = require("../models/categoryModel.js");

const endpoint = express();

// Endpoint para criar uma categoria
endpoint.post("/", async (req, res) => {
    const category = new Category({
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription
    });

    await category.save();
    return res.send(category);
});

// Endpoint para buscar todas as categorias
endpoint.get("/", async (req, res) => {
    const category = await Category.find();
    return res.send(category);
});

// Endpoint para buscar uma categoria específica
endpoint.get("/:id", async (req, res) => {
    const category = await Category.findById(req.params.id);
    return res.send(category);
});

// Endpoint para editar uma categoria específica
endpoint.patch("/:id", async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription 
    }, {
        new: true
    });

    return res.send(category);
});

// Endpoint para atualizar uma categoria específica
endpoint.put("/:id", async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription  
    }, {
        new: true
    });

    return res.send(category);
});

// Endpoint para excluir uma categoria específica
endpoint.delete("/:id", async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    return res.send(category);
})

module.exports = endpoint;