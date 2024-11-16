const express = require("express");
const User = require("../models/userModel.js");

const endpoint = express();

// Endpoint para criar um usuário
endpoint.post("/", async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    await user.save();
    return res.send(user);
});

// Endpoint para listar todos os usuários
endpoint.get("/", async (req, res) => {
    const user = await User.find();
    return res.send(user);
});


// Endpoint para editar usuário
endpoint.patch("/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: req.body.password
    }, {
        new: true
    });

    return res.send(user);
});

// Endpoint para excluir usuário
endpoint.delete("/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.send(user);
});

module.exports = endpoint;