const express = require("express");
const User = require("../models/userModel.js");

const endpoint = express();

// Endpoint para criar um usuário
endpoint.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validar se usuário já existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: "Username já existe!" });
        };

        // Criar novo usuário
        const user = new User({ username, password });
        await user.save();

        return res.status(201).send({ message: "Usuário criado com sucesso!", user });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar usuário", error: error.message });
    };
});

// Endpoint para listar todos os usuários
endpoint.get("/", async (req, res) => {
    try {
        // Buscar todos os usuários
        const user = await User.find();
        return res.status(200).send({ message: "Usuários encontrados com sucesso!", user });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar usuários.", error: error.message })
    }
});

// Endpoint para editar usuário
endpoint.patch("/:id", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar e atualizar usuário
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { password },
            { new: true }
        );

        // Condicional caso o usuário não seja encontrado
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado!" });
        };

        return res.status(200).send({ message: "Usuário atualizado com sucesso!", user });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar usuário.", error: error.message });
    }
});


// Endpoint para excluir usuário
endpoint.delete("/:id", async (req, res) => {
    try {
        // Buscar e deletar usuário
        const user = await User.findByIdAndDelete(req.params.id);
        
        // Condicional caso o usuário não seja encontrado
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado!" });
        };

        return res.status(200).send({ message: "Usuário excluído com sucesso!", user });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao excluir usuário", error: error.message });
    };
});

// Endpoint para validar login (Usuário e senha)
endpoint.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validar se o usuário existe
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).send({ message: "Usuário ou senha incorretos, tente novamente!" });
        };

        return res.status(200).send({ message: `Login efetuado com sucesso. Seja bem-vindo ${user.username}!` });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao validar login.", error: error.message });
    };
});

module.exports = endpoint;