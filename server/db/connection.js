const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connect("");
        console.log("Conexão com o MongoDB estabelecida com sucesso!");
    } catch (err) {
        console.error("Erro ao conectar-se com o MongoDB", err.message);
    }
};

module.exports = connectDB;