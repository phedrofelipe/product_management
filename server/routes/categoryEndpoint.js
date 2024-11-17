const express = require("express");
const Category = require("../models/categoryModel.js");
const Product = require("../models/productModel.js");
const verifyJWT = require("../middlewares/verifyJWT.js");
const logRequests = require("../middlewares/logRequests.js");

const endpoint = express();


// Endpoint para criar uma categoria
endpoint.post("/", verifyJWT, logRequests, async (req, res) => {
    const { categoryName, categoryDescription, productId } = req.body;
    try{
        // Validar se a categoria já está cadastrada
        const existingCategory = await Category.findOne({ categoryName });
        if (existingCategory) {
            return res.status(400).send({ message: "Categoria já cadastrada!" });
        };

        // Na criação da categoria será possível definir uma lista de produtos vinculados ao cadastro, identificando se o registro dos produtos é um array válido (ou vazio, caso não seja fornecido)
        const validProductId = Array.isArray(productId) ? productId : (productId ? [productId]: []);

        // Validar se os produtos foram vinculadas ao criar a categoria
        for (const prodId of validProductId) {
            const product = await Product.findById(prodId);

            // Caso o produto vinculado não seja encontrado, retornar erro
            if (!product) {
                return res.status(400).send({ message: `Produto id ${prodId} não identificado!` });
            };
        };

        // Criar nova categoria
        const category = new Category({ categoryName, categoryDescription, productId: validProductId });
        await category.save();

        // Ao validar um produto vinculado no cadastro da categoria, será incluso o ID da categoria no cadastro do produto. Será utilizado o "for" no cenário do vínculo do ID da categoria a mais de um produto
        for (const prodId of validProductId) {
            const product = await Product.findById(prodId);

            // Caso haja o vínculo de produto a categoria, o ID da categoria será vinculado ao cadastro do produto
            if (product) {
                product.categoryId.push(category._id);
                await product.save();
            };
        };

        return res.status(201).send({ message: `A categoria ${category.categoryName} foi cadastrada com sucesso!`, category });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao cadastradar categoria.", error: error.message });
    };
});


// Endpoint para buscar todas as categorias
endpoint.get("/", verifyJWT, logRequests, async (req, res) => {
    try {
        const category = await Category.find().populate("productId", "productName");
        return res.status(200).send({ message: "Categorias localizadas com sucesso!", category });
    } catch (error) {
        return res.status(500).send({ message: "Não foi possível localizar as categorias.", error: error.message });
    };
});


// Endpoint para buscar uma categoria específica
endpoint.get("/:id", verifyJWT, logRequests, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate("productId", "productName");

        // Condicional caso a categoria não seja encontrado
        if (!category) {
            return res.status(400).send({ message: "Categoria não encontrada!" });
        };

        return res.status(200).send({ message: "Categoria localizada com sucesso!", category });
    } catch {
        return res.status(500).send({ message: "Não foi possível localizar a categoria.", error: error.message });
    };
});


// Endpoint para editar uma categoria específica
endpoint.patch("/:id", verifyJWT, logRequests, async (req, res) => {
    const { categoryName, categoryDescription, productId } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, {
            categoryName, categoryDescription, productId: productId
        }, {
            new: true
        }).populate("productId", "productName");

        // Condicional caso a categoria não seja encontrada
        if (!category) {
            return res.status(404).send({ message: "Categoria não encontrada!" });
        };

        return res.status(201).send({ message: "Categoria editada com sucesso!", category });
    } catch (error) {
        return res.status(500).send({ message: "Não foi possível editar a categoria", error: error.message });
    };
});


// Endpoint para atualizar uma categoria específica
endpoint.put("/:id", verifyJWT, logRequests, async (req, res) => {
    const { categoryName, categoryDescription, productId } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, {
            categoryName, categoryDescription, productId: productId
        }, {
            new: true
        }).populate("productId", "productName");

        // Condicional caso a categoria não seja encontrada
        if (!category) {
            return res.status(404).send({ message: "Categoria não encontrada!" });
        };

        return res.status(201).send({ message: "Categoria atualizada com sucesso!", category });
    } catch (error) {
        return res.status(500).send({ message: "Não foi possível atualizar a categoria.", error: error.message });
    };
});


// Endpoint para excluir uma categoria específica
endpoint.delete("/:id", verifyJWT, logRequests, async (req, res) => {
    try{
        const category = await Category.findByIdAndDelete(req.params.id).populate("productId", "productName");

        // Condicional caso a categoria não seja encontrada
        if (!category) {
            return res.status(404).send({ message: "Categoria não encontrada!" });
        };

        return res.status(200).send({ message: "Categoria deletada com sucesso!", category });
    } catch (error) {
        return res.status(500).send({ message: "Não foi possível deletar a categoria.", error: error.message });
    };
});


module.exports = endpoint;