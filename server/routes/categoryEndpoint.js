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
        // Validar se a categoria já está cadastrado
        const existingCategory = await Category.findOne({ categoryName });
        if (existingCategory) {
            return res.status(400).send({ message: "Categoria já cadastrada!" });
        }

        // Na criação da categoria será possível definir uma lista de produtos vinculados ao cadastro, validando se o registro dos produtos é válido
        let validProductId = [];

        if (productId && Array.isArray(productId)) { // Será verificado se o campo productId foi preenchido
            validProductId = await Promise.all(
                productId.map(async (prodId) => {
                    const product = await Product.findById(prodId);
                    return product ? prodId : null;
                })
            );
            
            // Filtrar IDs inválidos
            validProductId = validProductId.filter(Boolean);

            // Caso algum ID seja inválido, retornará erro
            if (validProductId.length !== productId.length) {
                return res.status(400).send({ message: "Produto inválido!" });
            };
        };

        // Criar nova categoria
        const category = new Category({ categoryName, categoryDescription, productId: validProductId.length > 0 ? validProductId : undefined });
        await category.save();

        // Ao validar um produto no cadastro da categoria, será feita a inclusão do ID da categoria no cadastro do produto
        if (validProductId.length > 0) {
            await Promise.all(
                validProductId.map(async (prodId) => {
                    const product = await Product.findById(prodId);
                    if (product && Array.isArray(product.productId)) {
                        product.productId.push(category._id);
                        await product.save();
                    }
                })
            );
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