const express = require("express");
const Product = require("../models/productModel.js");

const endpoint = express();

// Endpoint para criar um produto
endpoint.post("/", async (req, res) => {
    const product = new Product({
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        amount: req.body.amount,
        price: req.body.price
    });

    await product.save();
    return res.send(product);
});

// Endpoint para buscar todos os produtos
endpoint.get("/", async (req, res) => {
    const product = await Product.find();
    return res.send(product);
});

// Endpoint para buscar um produto específico
endpoint.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    return res.send(product);
});

// Endpoint para editar um produto específico
endpoint.patch("/:id", async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, {
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        amount: req.body.amount,
        price: req.body.price
    }, {
        new: true
    });

    return res.send(product);
});

// Endpoint para atualizar um produto específico
endpoint.put("/:id", async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, {
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        amount: req.body.amount,
        price: req.body.price
    }, {
        new: true
    });

    return res.send(product);
});

// Endpoint para excluir um produto específico
endpoint.delete("/:id", async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
});

module.exports = endpoint;