const express = require("express");
const Product = require("../models/productModel.js");
const Category = require("../models/categoryModel.js")
const verifyJWT = require("../middlewares/verifyJWT.js");
const logRequests = require("../middlewares/logRequests.js");

const endpoint = express();


// Endpoint para criar um produto
endpoint.post("/", verifyJWT, logRequests, async (req, res) => {
    const { productName, productDescription, amount, price, categoryId } = req.body;
    try {

        // Validar se produto já está cadastrado
        const existingProduct = await Product.findOne({ productName });
        if (existingProduct) {
            return res.status(400).send({ message: "Produto já cadastrado!" });
        };

        // Validar se a categoria existe
        const category = await Category.findById( categoryId );
        if (!category) {
            return res.status(400).send({ message: "Categoria não identificada!" });
        }

        // Criar novo produto
        const product = new Product({ productName, productDescription, amount, price, categoryId: categoryId });
        await product.save();

        // Ao criar o produto, será vinculado o ID do produto no cadastro da categoria. Será utilizado o "for" no cenário do vínculo de mais de uma categoria ao mesmo produto
        for (const catId of categoryId) {
            const category = await Category.findById(catId);
            // Caso haja o vínculo de categoria ao produto, o ID do produto será vinculado ao cadastro da categoria
            if (category) {
                category.productId.push(product._id);
                await category.save();
            };
        };

        return res.status(201).send({ message: `O produto ${product.productName} foi cadastrado com sucesso!`, product });
    } catch (error) {
        return res.status(500).send({ messsage: "Erro ao cadastrar produto.", error: error.message });
    };
});


// Endpoint para buscar todos os produtos
endpoint.get("/", verifyJWT, logRequests, async (req, res) => {
    try {
        const product = await Product.find().populate("categoryId", "categoryName");
        return res.status(200).send({ message:  "Produtos localizados com sucesso!", product });
    } catch (error) {
        return res.status(500).send({ message: "Não foi possível localizar os produtos.", error: error.message})
    };
});


// Endpoint para buscar um produto específico
endpoint.get("/:id", verifyJWT, logRequests, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("categoryId", "categoryName");
        
        // Condicional caso o produto não seja encontrado
        if (!product) {
            return res.status(404).send({ message: "Produto não encontrado!" });
        };

        return res.status(200).send({ message: "Produto localizado com sucesso!", product });
    } catch (error) {
        return res.status(500).send({ message: "Não foi possível localizar o produto.", error: error.message });
    };
});


// Endpoint para editar um produto específico
endpoint.patch("/:id", verifyJWT, logRequests, async (req, res) => {
    const { productName, productDescription, amount, price, categoryId } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            productName, productDescription, amount, price, categoryId: categoryId
        }, {
            new: true
        }).populate("categoryId", "categoryName");

        // Condicional caso o produto não seja encontrado
        if (!product) {
            return res.status(404).send({ message: "Produto não encontrado!" });
        };

        return res.status(200).send({ message: "Produto editado com sucesso!", product });
    } catch (error) {
        return res.status(500).send({ message: "Não foi possível editar o produto.", error: error.message });
    };
});


// Endpoint para atualizar um produto específico
endpoint.put("/:id", verifyJWT, logRequests, async (req, res) => {
    const { productName, productDescription, amount, price, categoryId } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            productName, productDescription, amount, price, categoryId: categoryId
        }, {
            new: true
        }).populate("categoryId", "categoryName");

        // Condicional caso o produto não seja encontrado
        if (!product) {
            return res.status(404).send({ message: "Produto não encontrado!" });
        };

        return res.status(200).send({ message: "Produto atualizado com sucesso!", product });
    } catch (error) {
        return res.status(500).send({ message: "Não foi possível atualizar o produto.", error: error.message });
    };
});


// Endpoint para excluir um produto específico
endpoint.delete("/:id", verifyJWT, logRequests, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id).populate("categoryId", "categoryName");

        // Condicional caso o produto não seja encontrado
        if (!product) {
            return res.status(404).send({ message: "Produto não encontrado!" });
        };

        return res.status(200).send({ message: "Produto deletado com sucesso!", product });
    } catch (error) {
        return res.status(500).send({ message: "Não foi possível deletar o produto.", error: error.message });
    };
});


module.exports = endpoint;