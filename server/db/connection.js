const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connect("mongodb+srv://mongodb:pOtdCdVu7logM2i4@productmanagement.pdgml.mongodb.net/prodManageDB?retryWrites=true&w=majority&appName=productManagement");
        console.log("Conexão com o MongoDB estabelecida com sucesso!");
    } catch (err) {
        console.error("Erro ao conectar-se com o MongoDB", err.message);
    }
};

module.exports = connectDB;